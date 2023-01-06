import { DashboardResource } from "@data/consts/resource";
import { GetFleetsCatalogueResponseModel } from "@data/models/response/fleet/get-fleets-catalogue-response";
import { GetSlasCatalogueResponseModel } from "@data/models/response/sla/get-slas-catalogue-response";
import { AgHookFormContext } from "@src/contexts/form-provider/form-provider";

import { SelectInput } from "@components/input/input-select";
import { TextInput } from "@components/input/input-text";
import { getPricingResponseEnum } from "@domains/master-configuration/pricing/pages/fields";
import { Grid, InputAdornment } from "@mui/material";
import { useSelect } from "@pankod/refine-core";
import React from "react";
const PriceInformationSection: React.FC = () => {
  const {
    control,
    formState: { errors },
    refineCore: { queryResult },
  } = React.useContext(AgHookFormContext);

  const { options: slas } = useSelect<GetSlasCatalogueResponseModel>({
    resource: DashboardResource.getName(DashboardResource.slasCatalogue),
    optionLabel: "name",
    optionValue: "id",
  });
  const { options: fleets } = useSelect<GetFleetsCatalogueResponseModel>({
    resource: DashboardResource.getName(DashboardResource.fleetsCatalogue),
    optionLabel: "name",
    optionValue: "id",
  });

  if (queryResult) {
    return (
      <Grid container direction="row" columnSpacing={{ xs: 0, md: 8 }}>
        <Grid item xs={12} md={6} paddingBottom={4}>
          <TextInput
            textFieldProps={{
              label: "Nama Harga",
              type: "text",
              required: true,
            }}
            controlProps={{
              name: getPricingResponseEnum.name,
              control: control,
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6} paddingBottom={4}>
          <TextInput
            textFieldProps={{
              label: "Batas GMV",
              type: "number",
              required: true,
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">Rp</InputAdornment>
                ),
              },
            }}
            controlProps={{
              name: getPricingResponseEnum.minGmv,
              control: control,
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6} paddingBottom={4}>
          <SelectInput
            data={fleets}
            selectProps={{
              label: "Nama Kendaraan",
              required: true,
            }}
            controlProps={{
              control: control,
              name: getPricingResponseEnum.fleetId,
            }}
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} md={6} paddingBottom={4}>
          <SelectInput
            data={slas}
            selectProps={{
              label: "SLA",
              required: true,
            }}
            controlProps={{
              control: control,
              name: getPricingResponseEnum.slaId,
            }}
            errors={errors}
          />
        </Grid>
      </Grid>
    );
  }

  return null;
};

export default PriceInformationSection;
