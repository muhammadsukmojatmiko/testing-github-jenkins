import { agriakuBlack, agriakuGreen, AgText } from "@agriaku/base-ui";
import { RegionModel } from "@data/models/shared/region-response-model";
import CheckIcon from "@mui/icons-material/Check";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
type RegionSummaryProps = {
  regions: RegionModel;
};

export const RegionSummary = ({ regions }: RegionSummaryProps) => {
  return (
    <Grid container columnSpacing={6}>
      <Grid item md={2}>
        <AgText value="Provinsi" />
      </Grid>
      <Grid item md={4} sx={{ borderLeft: `1px solid ${agriakuBlack[100]}` }}>
        <AgText value="Kota/Kabupaten" />
      </Grid>
      <Grid item md={6} sx={{ borderLeft: `1px solid ${agriakuBlack[100]}` }}>
        <AgText value="Kecamatan" />
      </Grid>
      {Object.keys(regions).map((keyRegion) => {
        const province = regions[keyRegion];
        const cities = province.children;
        if (Object.keys(province).length > 0) {
          return (
            <>
              <Grid item md={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginTop: "16px",
                    color: agriakuGreen[500],
                  }}
                >
                  <CheckIcon
                    sx={{
                      fontSize: "12px",
                    }}
                  />
                  <AgText
                    value={province?.name}
                    sx={{
                      marginLeft: "4px",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                md={4}
                sx={{ borderLeft: `1px solid ${agriakuBlack[100]}` }}
              >
                <Box
                  sx={{
                    color: agriakuGreen[500],
                  }}
                >
                  {cities &&
                    Object.keys(cities).map((keyCity, i) => {
                      const city = cities[keyCity];
                      return (
                        <Box
                          key={keyCity + i}
                          sx={{
                            width: "100%",
                            marginTop: "16px",
                          }}
                        >
                          <CheckIcon
                            sx={{
                              fontSize: "12px",
                            }}
                          />

                          <AgText
                            value={city.name}
                            variant="labelMBold"
                            marginLeft="4px"
                          />
                        </Box>
                      );
                    })}
                </Box>
              </Grid>
              <Grid
                item
                md={6}
                sx={{ borderLeft: `1px solid ${agriakuBlack[100]}` }}
              >
                <Box
                  sx={{
                    color: agriakuGreen[500],
                  }}
                >
                  {cities &&
                    Object.keys(cities).map((keyCity, i) => {
                      const city = cities[keyCity];
                      const districts = city.children;
                      if (districts && Object.keys(districts).length > 0) {
                        return (
                          <Box
                            key={i + keyCity}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "flex-start",
                              flexWrap: "wrap",
                              marginTop: "16px",
                              color: agriakuGreen[500],
                            }}
                          >
                            {Object.keys(districts).map(
                              (keyDistrict: string, i) => {
                                const district = districts[keyDistrict];
                                return (
                                  <Box
                                    key={i + keyDistrict}
                                    sx={{
                                      marginLeft: "16px",
                                    }}
                                  >
                                    <CheckIcon
                                      sx={{
                                        fontSize: "12px",
                                      }}
                                    />

                                    <AgText
                                      value={district.name}
                                      variant="labelMBold"
                                      marginLeft="4px"
                                    />
                                  </Box>
                                );
                              },
                            )}
                          </Box>
                        );
                      }
                      return <></>;
                    })}
                </Box>
              </Grid>
            </>
          );
        }
      })}
    </Grid>
  );
};
