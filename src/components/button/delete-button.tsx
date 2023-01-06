import { SvgIconProps } from "@mui/material";
import { useDelete } from "@pankod/refine-core";
import { FC } from "react";
import {
  AgBaseDeleteButton,
  AgBaseDeleteButtonProps,
} from "./base-delete-button";

export type AgDeleteButtonProps = AgBaseDeleteButtonProps & {
  id: string | number;
  resource: string;
  svgIconProps?: SvgIconProps;
  mutationVariables?: any;
  mutationOptions?: any;
};

export const AgDeleteButton: FC<AgDeleteButtonProps> = ({
  id,
  resource,
  mutationVariables = {},
  mutationOptions = {},
  ...rest
}) => {
  const { mutate, isLoading } = useDelete();

  const handleDelete = () => {
    mutate(
      {
        id,
        resource,
        ...mutationVariables,
      },
      {
        ...mutationOptions,
      },
    );
  };

  return (
    <AgBaseDeleteButton
      onDelete={handleDelete}
      isLoading={isLoading}
      disabled={(typeof id !== "string" && typeof id !== "number") || isLoading}
      {...rest}
    />
  );
};
