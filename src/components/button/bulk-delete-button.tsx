import { ButtonProps, SvgIconProps } from "@mui/material";
import { useDeleteMany } from "@pankod/refine-core";
import { FC } from "react";
import { AgBaseDeleteButton } from "./base-delete-button";

export type AgBulkDeleteButtonProps = ButtonProps & {
  ids: (string | number)[];
  resource: string;
  svgIconProps?: SvgIconProps;
  mutationVariables?: any;
  mutationOptions?: any;
  hideText?: boolean;
};

export const AgBulkDeleteButton: FC<AgBulkDeleteButtonProps> = ({
  ids,
  resource,
  mutationVariables = {},
  mutationOptions = {},
  ...rest
}) => {
  const { mutate, isLoading } = useDeleteMany();

  const handleDelete = () => {
    mutate(
      {
        ids,
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
      disabled={ids.length == 0 || isLoading}
      {...rest}
    />
  );
};
