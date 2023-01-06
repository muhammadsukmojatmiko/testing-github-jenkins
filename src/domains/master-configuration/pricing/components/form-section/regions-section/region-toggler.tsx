import { agriakuBlack, AgText } from "@agriaku/base-ui";
import { Location } from "@data/models/shared/location-response-model";
import MapIcon from "@mui/icons-material/Map";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import PinPointIcon from "@public/icons/pin-point.svg";
import cloneDeep from "lodash.clonedeep";
import Image from "next/image";

import { ChangeEvent, useEffect, useState } from "react";

type AreaSelectorProps = {
  selected: string | string[];
  locations: Location[] | undefined;
  isEnableBulkAdd?: boolean;
  isLoading: boolean;
  search: {
    placeholder: string;
  };
  handleSelection: (value: string | string[]) => void;
  textEmpty?: string;
};

const ToggleSelector: React.FC<{
  handleSelection: (value: string | string[]) => void;
  selected: string | string[];
  locations: Location[] | undefined;
}> = ({ handleSelection, selected, locations }) => {
  return (
    <ToggleButtonGroup
      orientation="vertical"
      onChange={(_, value) => {
        handleSelection(value);
      }}
      value={selected}
      fullWidth
      exclusive
    >
      {locations?.map((location) => (
        <ToggleButton
          key={location.id}
          value={location.id}
          sx={{
            border: "none",
            fontSize: "16px",
            color: agriakuBlack[950],
            textTransform: "none",
            lineHeight: "20px",
            padding: "16px",
            justifyContent: "flex-start",
          }}
          fullWidth
        >
          {location.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

const BulkSelector: React.FC<{
  handleSelection: (value: string | string[]) => void;
  selected: string[];
  locations: Location[] | undefined;
}> = ({ handleSelection, selected, locations }) => {
  const [checkedLocations, setCheckedLocations] = useState<string[]>(
    selected ?? [],
  );

  useEffect(() => {
    setCheckedLocations(selected);
  }, [locations]);

  const handleSingleCheck = (
    event: ChangeEvent<HTMLInputElement>,
    check: boolean,
  ) => {
    const { id } = event.target;

    const copiedCheckLocations = cloneDeep(checkedLocations);

    if (check) {
      copiedCheckLocations.push(id);
    } else {
      const index = copiedCheckLocations.indexOf(id);
      if (index !== -1) {
        copiedCheckLocations.splice(index, 1);
      }
    }
    setCheckedLocations(copiedCheckLocations);

    handleSelection(copiedCheckLocations);
  };

  const isAllChecked = (): boolean => {
    return (
      locations?.every(({ id }) => {
        return selected.indexOf(id) === -1 ? false : true;
      }) ?? false
    );
  };

  const isIndeterminateChecked = (): boolean => {
    const flag =
      locations?.some(({ id }) => {
        return selected.indexOf(id) !== -1;
      }) ?? false;

    return isAllChecked() ? false : flag;
  };

  const handelMultipleCheck = (check: boolean) => {
    if (check) {
      const all =
        locations?.map(({ id }) => {
          return id;
        }) ?? [];
      setCheckedLocations(all);
      handleSelection(all);
    } else {
      setCheckedLocations([]);
      handleSelection([]);
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        labelPlacement="start"
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "16px",
          justifyContent: "space-between",
        }}
        control={
          <Checkbox
            indeterminate={isIndeterminateChecked()}
            checked={isAllChecked()}
            onChange={(_, value) => handelMultipleCheck(value)}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
          />
        }
        label="Semua Kecamatan"
      />
      {locations?.map(({ id, name }) => (
        <FormControlLabel
          key={id}
          labelPlacement="start"
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "16px",
            justifyContent: "space-between",
          }}
          control={
            <Checkbox
              id={id}
              checked={selected?.includes(id)}
              onChange={handleSingleCheck}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
            />
          }
          label={name}
        />
      ))}
    </FormGroup>
  );
};
export const AreaSelector = (props: AreaSelectorProps) => {
  const {
    selected,
    search: { placeholder },
    handleSelection,
    isEnableBulkAdd = false,
    locations,
    isLoading,
    textEmpty,
  } = props;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locationsQueried, setLocationsQueried] = useState<Location[]>([]);

  useEffect(() => {
    if (locations) {
      setLocationsQueried(
        locations?.filter((location) => {
          return location.name.toLowerCase().includes(searchQuery);
        }),
      );
    }
  }, [searchQuery, locations]);

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event?.target.value.toLowerCase());
  };

  return (
    <Grid sx={{ position: "relative" }}>
      {isLoading && (
        <Box
          zIndex="tooltip"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              width: "259px",
              textAlign: "center",
              padding: "16px",
            }}
            elevation={0}
          >
            <CircularProgress color="primary" />
            <AgText marginTop={2} color={"#464646"} value="Load Data ..." />
          </Paper>
        </Box>
      )}
      <TextField
        sx={{ padding: "16px 16px 8px 16px" }}
        onChange={onSearch}
        placeholder={`Cari ${placeholder}`}
        fullWidth
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      <Box sx={{ height: "384px", maxHeight: "384px", overflowY: "scroll" }}>
        {locations && locations?.length < 1 ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "16px",
            }}
          >
            <Image src={PinPointIcon} height={52} width={111} />
            <AgText
              textAlign="center"
              value={textEmpty ?? ""}
              marginTop={3}
              fontSize={14}
            />
          </Box>
        ) : locationsQueried.length < 1 ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "16px",
            }}
          >
            <MapIcon fontSize="medium" color="disabled" />
            <AgText
              textAlign="center"
              value={`Pencarian ${placeholder} tidak ditemukan.`}
              marginTop={3}
              fontSize={14}
            />
          </Box>
        ) : isEnableBulkAdd && Array.isArray(selected) ? (
          <BulkSelector
            handleSelection={handleSelection}
            locations={locationsQueried}
            selected={selected}
          />
        ) : (
          <ToggleSelector
            handleSelection={handleSelection}
            locations={locationsQueried}
            selected={selected}
          />
        )}
      </Box>
    </Grid>
  );
};
