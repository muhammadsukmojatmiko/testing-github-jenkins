import {
  agriakuBlack,
  agriakuFontSize,
  agriakuGreen,
  agriakuRed,
  AgText,
} from "@agriaku/base-ui";
import { ExpandMore } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { AgHookFormContext } from "@src/contexts/form-provider/form-provider";
import React, { ReactNode, useEffect, useState } from "react";
import { DISTANCE_LEVEL, getPricingResponseEnum } from "../pages/fields";
import DistanceSection from "./form-section/distance-section";

import PriceInformationSection from "./form-section/price-information-section";
import RegionSection from "./form-section/regions-section";
import VolumetricSection from "./form-section/volumetric-section";
import WeightSection from "./form-section/weight-section";
type AccordionSectionType = {
  id: string;
  title: string;
  members: string[];
  isError: boolean;
  isShow: boolean;
  children: ReactNode;
};
export const CreateEditPricingForm: React.FC = () => {
  const { formState, watch } = React.useContext(AgHookFormContext);

  const [expanded, setExpanded] = useState<number>(-1);
  const { errors, isSubmitted } = formState;

  const [sections, setSections] = useState<AccordionSectionType[]>([
    {
      id: "priceInformation",
      title: "Informasi Harga",
      members: [
        getPricingResponseEnum.name,
        getPricingResponseEnum.minGmv,
        getPricingResponseEnum.fleetId,
        getPricingResponseEnum.slaId,
      ],
      isError: false,
      isShow: true,
      children: <PriceInformationSection />,
    },
    {
      id: "weightInformation",
      title: "Berat",
      members: [
        getPricingResponseEnum.baseWeightThreshold,
        getPricingResponseEnum.baseWeightPrice,
        getPricingResponseEnum.additionalWeightPrice,
      ],
      isError: false,
      isShow: true,
      children: <WeightSection />,
    },
    {
      id: "volumeInformation",
      title: "Volumetrik",
      members: [
        getPricingResponseEnum.baseVolumeThreshold,
        getPricingResponseEnum.baseVolumePrice,
        getPricingResponseEnum.additionalVolumePrice,
      ],
      isError: false,
      isShow: true,
      children: <VolumetricSection />,
    },
    {
      id: "distanceInformation",
      title: "Jarak",
      members: [
        getPricingResponseEnum.baseDistanceThreshold,
        getPricingResponseEnum.maxDistance,
        getPricingResponseEnum.baseDistancePrice,
        getPricingResponseEnum.additionalDistancePrice,
        getPricingResponseEnum.level,
      ],
      isError: false,
      isShow: true,
      children: <DistanceSection />,
    },
    {
      id: "regionInformation",
      title: "Wilayah",
      members: [getPricingResponseEnum.regions],
      isError: false,
      isShow: false,
      children: <RegionSection />,
    },
  ]);

  const watchLevel = watch(getPricingResponseEnum.level);
  useEffect(() => {
    setSections(
      sections.map((section) => {
        if (section.id === "regionInformation") {
          section.isShow =
            Boolean(watchLevel) && watchLevel !== DISTANCE_LEVEL.NATIONAL;
        }
        return section;
      }),
    );
  }, [watchLevel]);

  useEffect(() => {
    const newSections = sections.map((section) => {
      if (isSubmitted) {
        const isSectionValid = section.members.every(
          (member) => errors?.[member] === undefined,
        );
        section.isError = !isSectionValid;
      }
      return section;
    });
    setSections(newSections);
  }, [formState]);

  return (
    <>
      {sections.map(
        (section, index) =>
          section.isShow && (
            <Accordion
              key={section.title}
              expanded={index === expanded}
              disableGutters
            >
              <AccordionSummary
                onClick={() => {
                  expanded === index ? setExpanded(-1) : setExpanded(index);
                }}
                sx={{
                  borderTop: `1px solid ${agriakuBlack[100]}`,
                  borderBottom: `1px solid ${agriakuBlack[100]}`,
                  padding: "26px 24px",
                  ".MuiAccordionSummary-content": {
                    margin: "0 !important",
                  },
                }}
                expandIcon={<ExpandMore />}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isSubmitted ? (
                    section.isError ? (
                      <ErrorRoundedIcon
                        fontSize="large"
                        sx={{
                          paddingRight: "8px",
                          color: agriakuRed[500],
                        }}
                      />
                    ) : (
                      <CheckCircleIcon
                        fontSize="large"
                        sx={{
                          paddingRight: "8px",
                          color: agriakuGreen[500],
                        }}
                      />
                    )
                  ) : (
                    <></>
                  )}

                  <AgText
                    value={section.title}
                    fontSize={agriakuFontSize[16]}
                    fontWeight={600}
                    color={
                      isSubmitted
                        ? section.isError
                          ? agriakuRed[500]
                          : agriakuGreen[500]
                        : agriakuBlack[500]
                    }
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: "16px",
                }}
              >
                {section.children}
              </AccordionDetails>
            </Accordion>
          ),
      )}
    </>
  );
};
