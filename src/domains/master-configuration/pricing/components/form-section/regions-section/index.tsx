import { agriakuBlack, agriakuRed, AgText } from "@agriaku/base-ui";
import { BaseErrorModel } from "@data/models/response/base-error";
import { BaseResponseModel } from "@data/models/response/base-response";
import { GetLocationsResponseModel } from "@data/models/response/location/get-locations-response";
import { Location } from "@data/models/shared/location-response-model";
import { RegionModel } from "@data/models/shared/region-response-model";
import { useGetLocations } from "@domains/master-configuration/pricing/hooks/use-get-locations";
import { getPricingResponseEnum } from "@domains/master-configuration/pricing/pages/fields";
import { Box, FormLabel, Grid } from "@mui/material";
import { CustomResponse, HttpError } from "@pankod/refine-core";
import { AgHookFormContext } from "@src/contexts/form-provider/form-provider";
import { UseQueryResult } from "@tanstack/react-query";
import { isEqual } from "lodash";
import cloneDeep from "lodash.clonedeep";
import React, { useEffect, useState } from "react";
import { RegionSummary } from "./region-summary";
import { AreaSelector } from "./region-toggler";

const RegionSection: React.FC = () => {
  const {
    setValue,
    clearErrors,
    setError,
    watch,
    register,
    unregister,
    formState: { errors, isSubmitted },
    refineCore: { queryResult },
  } = React.useContext(AgHookFormContext);

  const [regions, setRegions] = useState<RegionModel>(
    queryResult?.data?.data.regions ?? {},
  );

  const [selectedProvinceId, setSelectedProvinceId] = useState<string>("");
  const [selectedCityId, setSelectedCityId] = useState<string>("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [showDistrictData, setShowDistrictData] = useState<boolean>(true);

  const watchRegion = watch(getPricingResponseEnum.regions);

  const validateRegions = (): string | undefined => {
    const watchLevel = watch(getPricingResponseEnum.level);
    if (watchLevel === "REGIONAL") {
      if (watchRegion?.length > 0) {
        clearErrors(getPricingResponseEnum.regions);
        return undefined;
      }
    }
    if (isSubmitted) {
      setError(getPricingResponseEnum.regions, {
        type: "required",
        message: "Kecamatan wajib diisi",
      });
    }
    return "Kecamatan wajib diisi";
  };

  useEffect(() => {
    validateRegions();
  }, [watchRegion]);

  const provincesFetchedResult = useGetLocations(
    "",
    {
      enabled: false,
    },
    { provinceId: selectedProvinceId }, // As a identifier to make different query keys
  );

  const citiesFetchedResult = useGetLocations(
    selectedProvinceId,
    {
      enabled: false,
    },
    { cityId: selectedCityId },
  );

  const districtsFetchedResult = useGetLocations(
    selectedCityId,
    {
      enabled: false,
    },
    { districtIds: selectedDistricts },
  );

  useEffect(() => {
    register(getPricingResponseEnum.regions);
    regionToSelectedDistrict(regions);
    provincesFetchedResult.refetch();
    return () => unregister(getPricingResponseEnum.regions);
  }, []);

  useEffect(() => {
    if (selectedProvinceId !== "") {
      citiesFetchedResult.refetch();
      setShowDistrictData(false);
    }
  }, [selectedProvinceId]);

  useEffect(() => {
    if (selectedCityId !== "") {
      districtsFetchedResult.refetch();
      setShowDistrictData(true);
    }
  }, [selectedCityId]);

  useEffect(() => {
    setValue("regions", selectedDistricts, {
      shouldDirty: !isEqual(regions, queryResult?.data?.data.regions),
    });
  }, [selectedDistricts]);

  const transformToProps = (
    fetchedResult: UseQueryResult<
      CustomResponse<BaseResponseModel<GetLocationsResponseModel>>,
      BaseErrorModel | HttpError
    >,
  ): Location[] => {
    return fetchedResult.data?.data?.data?.results ?? [];
  };

  const onProvinceSelected = (locationIds: string | string[]) => {
    if (typeof locationIds === "string") {
      setSelectedProvinceId(locationIds);
    }
  };

  const onCitySelected = (locationIds: string | string[]) => {
    if (typeof locationIds === "string") {
      setSelectedCityId(locationIds);
    }
  };

  const onRegionSelected = ({
    provinceId,
    cityId,
    locationIds,
  }: {
    provinceId: string;
    cityId: string;
    locationIds: string | string[];
  }) => {
    if (Array.isArray(locationIds) && provinceId && cityId) {
      let deepCopiedRegions: RegionModel = cloneDeep<RegionModel>(regions);

      try {
        const _province = transformToProps(provincesFetchedResult).find(
          (p: { id: string }) => p.id === provinceId,
        );

        if (_province) {
          deepCopiedRegions[provinceId] = {
            ..._province,
            children: { ...(deepCopiedRegions[provinceId]?.children ?? {}) },
          };
        }

        const citiesRegion = deepCopiedRegions?.[provinceId]?.children;
        if (citiesRegion) {
          const _city = transformToProps(citiesFetchedResult).find(
            (c: { id: string }) => c.id === cityId,
          );
          if (_city) {
            citiesRegion[cityId] = {
              ..._city,
              children: {},
            };
          }
        }

        const districtsRegion = citiesRegion?.[cityId].children ?? null;

        if (districtsRegion) {
          locationIds.forEach((districtId) => {
            const _district = transformToProps(districtsFetchedResult).find(
              (d) => d.id === districtId,
            );
            if (_district) {
              districtsRegion[districtId] = {
                ..._district,
              };
            }
          });
        }

        if (locationIds.length < 1 && citiesRegion) {
          delete citiesRegion[cityId];
        }

        const isProvinceHasCities = Object.keys(citiesRegion ?? {}).some(
          (cityId) => Object.keys(citiesRegion?.[cityId] ?? {}).length > 0,
        );

        !isProvinceHasCities && delete deepCopiedRegions[provinceId];

        setRegions(deepCopiedRegions);

        regionToSelectedDistrict(deepCopiedRegions);
      } catch (error) {
        console.error("ERROR in district changes", error);
      }
    }
  };

  const regionToSelectedDistrict = (regions: RegionModel) => {
    const keyDistricts: string[] = [];
    Object.values(regions).map((province) => {
      if (province.children) {
        Object.values(province.children).map((city) => {
          if (city.children) {
            Object.keys(city.children).map((key) => {
              keyDistricts.push(key);
            });
          }
        });
      }
    });
    setSelectedDistricts(keyDistricts);
  };
  const getSelectedDistrictIds = (): string[] => {
    let ids: string[] = [];
    try {
      ids = Object.keys(
        regions[selectedProvinceId]?.children?.[selectedCityId]?.children ?? {},
      );
    } catch (error) {}
    return ids;
  };

  return (
    <>
      <Grid
        container
        sx={{
          border: `1px solid ${agriakuBlack[100]}`,
          borderRadius: "4px",
          padding: "16px 16px 16px 0px",
        }}
      >
        <Grid item xs={12} md={4}>
          <Box sx={{ paddingLeft: "16px" }}>
            <AgText
              value="Provinsi"
              sx={{
                fontSize: "16px",
                fontWeight: "600",
              }}
            />
            <Box
              sx={{
                border: `1px solid ${agriakuBlack[100]}`,
                borderRadius: "4px",
                marginTop: "10px",
                height: "466px",
              }}
            >
              <AreaSelector
                selected={selectedProvinceId}
                locations={transformToProps(provincesFetchedResult) ?? []}
                isLoading={provincesFetchedResult.isFetching}
                handleSelection={(value) => onProvinceSelected(value)}
                search={{
                  placeholder: "Provinsi",
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ paddingLeft: "16px" }}>
            <AgText value="Kota/Kabupaten" fontSize={16} fontWeight={600} />
            <Box
              sx={{
                border: `1px solid ${agriakuBlack[100]}`,
                borderRadius: "4px",
                marginTop: "10px",
                height: "466px",
              }}
            >
              <AreaSelector
                selected={selectedCityId}
                locations={transformToProps(citiesFetchedResult) ?? []}
                handleSelection={(value) => onCitySelected(value)}
                isLoading={citiesFetchedResult.isFetching}
                search={{
                  placeholder: "Kota/Kabupaten",
                }}
                textEmpty="Silahkan pilih Provinsi terlebih dahulu untuk menampilkan data Kota/Kabupaten"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ paddingLeft: "16px" }}>
            <FormLabel
              required={true}
              sx={{
                fontWeight: 600,
              }}
              error={errors?.[getPricingResponseEnum.regions] !== undefined}
            >
              Kecamatan
            </FormLabel>
            <Box
              sx={{
                border: `${
                  errors?.[getPricingResponseEnum.regions]
                    ? `2px solid ${agriakuRed[500]}`
                    : `1px solid ${agriakuBlack[100]}`
                } `,
                borderRadius: "4px",
                marginTop: "10px",
                height: "466px",
              }}
            >
              <AreaSelector
                selected={getSelectedDistrictIds()}
                locations={
                  showDistrictData
                    ? transformToProps(districtsFetchedResult) ?? []
                    : []
                }
                isLoading={districtsFetchedResult.isFetching}
                isEnableBulkAdd
                handleSelection={(value) =>
                  onRegionSelected({
                    provinceId: selectedProvinceId,
                    cityId: selectedCityId,
                    locationIds: value,
                  })
                }
                search={{
                  placeholder: "Kecamatan",
                }}
                textEmpty="Silahkan pilih Kota/Kabupaten terlebih dahulu untuk menampilkan data Kecamatan"
              />

              {/* needs to be added to bind regions to elements for error validation */}

              <input
                type="hidden"
                value={selectedDistricts}
                {...register(getPricingResponseEnum.regions, {
                  validate: () => {
                    return validateRegions();
                  },
                })}
              />
            </Box>
            <AgText
              value={
                errors?.[getPricingResponseEnum.regions]?.message?.toString() ??
                ""
              }
              sx={{ fontSize: "12px", color: agriakuRed[500] }}
            />
          </Box>
        </Grid>
      </Grid>

      <AgText
        value="Ringkasan"
        sx={{
          fontSize: "16px",
          fontWeight: "600",
          marginTop: "3",
        }}
      />
      <Grid
        container
        sx={{
          border: `1px solid ${agriakuBlack[100]}`,
          borderRadius: "4px",
          padding: "16px 24px",
        }}
      >
        <RegionSummary regions={regions} />
      </Grid>
    </>
  );
};

export default RegionSection;
