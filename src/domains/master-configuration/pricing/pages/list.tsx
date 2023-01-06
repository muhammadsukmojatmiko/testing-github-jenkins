import { AgFlexRow, AgText, AgTextInput } from "@agriaku/base-ui";
import { AgBulkDeleteButton } from "@components/button/bulk-delete-button";
import { AgEditButton } from "@components/button/edit-button";
import { AgDatagridProps } from "@components/datagrid/base-datagrid";
import { Datagrid } from "@components/datagrid/datagrid";
import {
  DropdownNested,
  DropdownNestedProps,
} from "@components/dropdown-nested/dropdown-nested";
import { DashboardResource } from "@data/consts/resource";
import { GetPricingsResponseModel } from "@data/models/response/pricing/get-pricings-response";
import { RegionModel } from "@data/models/shared/region-response-model";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Card, Divider } from "@mui/material";
import { GridColumns } from "@mui/x-data-grid";
import { useDataGrid, UseDataGridReturnType } from "@src/hooks/use-datagrid";
import debounce from "lodash/debounce";
import React, { ChangeEvent } from "react";
import { getPricingsRequestEnum, getPricingsResponseEnum } from "./fields";

const SEARCH_DEBOUNCE_WAITING_TIME_MS = 500;

export const PricingList: React.FC = () => {
  const {
    dataGridProps,
    tableQueryResult: { isLoading },
  } = useDataGrid({
    resource: DashboardResource.getName(DashboardResource.pricing),
  });

  const transformRegionsObjToArray = (
    regions: RegionModel,
  ): DropdownNestedProps["menus"] => {
    return Object.keys(regions).map((k) => {
      const region = regions[k];
      return {
        id: region.id,
        label: region.name,
        menus: transformRegionsObjToArray(region.children ?? {}),
      };
    });
  };

  const renderColumns = (useDatagridResult: UseDataGridReturnType) => {
    const {
      tableQueryResult: { isLoading },
    } = useDatagridResult;
    const columns: GridColumns<GetPricingsResponseModel> = [
      {
        field: getPricingsResponseEnum.name,
        headerName: "Nama Harga",
      },
      {
        field: getPricingsResponseEnum.fleetName,
        headerName: "Nama Kendaraan",
        minWidth: 125,
      },
      {
        field: getPricingsResponseEnum.slaName,
        headerName: "SLA",
      },
      {
        field: getPricingsResponseEnum.minGmv,
        headerName: "Batas GMV (IDR)",
        minWidth: 130,
      },
      {
        field: getPricingsResponseEnum.baseWeightThreshold,
        headerName: "Batas Berat (Kg)",
        minWidth: 132,
      },
      {
        field: getPricingsResponseEnum.baseWeightPrice,
        headerName: "Harga Berat Dasar (IDR)",
        minWidth: 170,
      },
      {
        field: getPricingsResponseEnum.additionalWeightPrice,
        headerName: "Harga Berat Tambahan (IDR)",
        minWidth: 200,
      },
      {
        field: getPricingsResponseEnum.baseVolumeThreshold,
        renderHeader: () => {
          return (
            <>
              Batas Volumetrik (m<sup>3</sup>)
            </>
          );
        },
        minWidth: 160,
      },
      {
        field: getPricingsResponseEnum.baseVolumePrice,
        renderHeader: () => {
          return (
            <>
              Harga Volumetrik Dasar (m<sup>3</sup>)
            </>
          );
        },
        minWidth: 200,
      },
      {
        field: getPricingsResponseEnum.additionalVolumePrice,
        renderHeader: () => {
          return (
            <>
              Harga Volumetrik Tambahan (m<sup>3</sup>)
            </>
          );
        },
        minWidth: 225,
      },
      {
        field: getPricingsResponseEnum.maxDistance,
        headerName: "Jarak (Km)",
      },
      {
        field: getPricingsResponseEnum.baseDistancePrice,
        headerName: "Harga Jarak Dasar (IDR)",
        minWidth: 170,
      },
      {
        field: getPricingsResponseEnum.additionalDistancePrice,
        headerName: "Harga Jarak Tambahan (IDR)",
        minWidth: 200,
      },
      {
        field: getPricingsResponseEnum.level,
        headerName: "Tingkatan",
        renderCell: ({ row }) => {
          return <>{row.level === "NATIONAL" ? "National" : "Regional"}</>;
        },
      },
      {
        field: getPricingsResponseEnum.regions,
        headerName: "Wilayah",
        minWidth: 300,
        renderCell: ({ row }) => {
          return (
            <AgFlexRow
              sx={{
                flexWrap: "wrap",
                gap: "4px",
              }}
            >
              {Object.keys(row.regions ?? {}).map((k, i) => {
                return (
                  <DropdownNested
                    key={i + k}
                    menus={transformRegionsObjToArray(
                      row.regions?.[k].children ?? {},
                    )}
                    id={row.id}
                    label={row.regions?.[k].name ?? ""}
                  />
                );
              })}
            </AgFlexRow>
          );
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "",
        renderCell: ({ row }) => {
          return (
            <AgFlexRow sx={{ alignItems: "center" }}>
              <AgEditButton
                hideText
                recordItemId={row.id}
                resourceNameOrRouteName={DashboardResource.getName(
                  DashboardResource.pricing,
                )}
              />
              <AgBulkDeleteButton
                resource={DashboardResource.getName(DashboardResource.pricing)}
                ids={[row.id]}
                hideText
              />
            </AgFlexRow>
          );
        },
      },
    ];

    return columns;
  };

  const renderAction: AgDatagridProps["renderAction"] = (
    useDatagridResult,
    components,
  ) => {
    return (
      <AgFlexRow
        sx={{
          justifyContent: {
            xs: "start",
            md: "flex-end",
          },
          alignItems: "center",
          marginTop: {
            xs: "8px",
            md: 0,
          },
          marginLeft: {
            xs: "-8px",
            md: 0,
          },
        }}
      >
        {components.DeleteButton}
        {components.CreateButton}
      </AgFlexRow>
    );
  };

  const renderFilter: AgDatagridProps["renderFilter"] = (useDataGridResult) => {
    const { setFilters } = useDataGridResult;
    const handleFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      setFilters([
        {
          field: getPricingsRequestEnum.query,
          operator: "contains",
          value: val,
        },
      ]);
    };
    const handleFilterChangeDebounced = debounce(
      handleFilterChange,
      SEARCH_DEBOUNCE_WAITING_TIME_MS,
    );

    return (
      <Box>
        <AgTextInput
          onChange={handleFilterChangeDebounced}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: "4px" }} />,
          }}
          placeholder="Cari"
        />
      </Box>
    );
  };

  return (
    <Box>
      <AgText
        value={DashboardResource.getLabel(
          DashboardResource.masterConfiguration,
        )}
        variant="h5"
        fontWeight={"bold"}
        mb={"24px"}
      />
      <Box sx={{ mt: "16px" }}>
        <Card sx={{ padding: "24px" }}>
          <AgText
            value={DashboardResource.getLabel(DashboardResource.pricing)}
            variant="h5"
            fontWeight={"bold"}
          />
          <Divider sx={{ mt: "10px", mb: "16px" }} />
          <Datagrid
            resource={DashboardResource.getName(DashboardResource.pricing)}
            renderColumns={renderColumns}
            renderAction={renderAction}
            renderFilter={renderFilter}
            checkboxSelection
            getRowHeight={() => "auto"}
            headerHeight={72}
            autoHeight
            dynamicRowHeight
            sx={{
              "& .MuiDataGrid-virtualScroller": {
                overflowY: "auto !important",
              },
            }}
          />
        </Card>
      </Box>
    </Box>
  );
};
