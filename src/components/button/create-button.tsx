import { AgFlexRow, AgText } from "@agriaku/base-ui";
import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonProps, SvgIconProps } from "@mui/material";
import {
  useCan,
  useNavigation,
  useResource,
  useRouterContext,
  useTranslate,
} from "@pankod/refine-core";
import React from "react";
import { RefineCreateButtonProps } from "./button-types";

export type AgCreateButtonProps = RefineCreateButtonProps<
  ButtonProps,
  {
    svgIconProps?: SvgIconProps;
  }
>;

/**
 * <CreateButton> uses Material UI {@link https://mui.com/components/buttons/ `<Button> component`}.
 * It uses the {@link https://refine.dev/docs/core/hooks/navigation/useNavigation#create `create`} method from {@link https://refine.dev/docs/core/hooks/navigation/useNavigation `useNavigation`} under the hood.
 * It can be useful to redirect the app to the create page route of resource}.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/buttons/create-button} for more details.
 */
export const AgCreateButton: React.FC<AgCreateButtonProps> = ({
  resourceNameOrRouteName,
  hideText = false,
  ignoreAccessControlProvider = false,
  svgIconProps,
  children,
  onClick,
  ...rest
}) => {
  const { resource, resourceName } = useResource({
    resourceNameOrRouteName,
  });

  const { Link } = useRouterContext();
  const { createUrl: generateCreateUrl } = useNavigation();

  const translate = useTranslate();

  const { data } = useCan({
    resource: resourceName,
    action: "create",
    queryOptions: {
      enabled: !ignoreAccessControlProvider,
    },
    params: {
      resource,
    },
  });

  const disabledTitle = () => {
    if (data?.can) return "";
    else if (data?.reason) return data.reason;
    else
      return translate(
        "buttons.notAccessTitle",
        "You don't have permission to access",
      );
  };

  const createUrl = generateCreateUrl(resource.route!);

  const { sx, ...restProps } = rest;

  return (
    <Link
      to={createUrl}
      replace={false}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      style={{ textDecoration: "none" }}
    >
      <Button
        disabled={data?.can === false}
        title={disabledTitle()}
        variant="contained"
        sx={{ minWidth: 0, textTransform: "none", ...sx }}
        data-testid={"refine-create-button"}
        {...restProps}
      >
        {hideText ? (
          <AddIcon fontSize="small" {...svgIconProps} />
        ) : (
          children ?? (
            <AgFlexRow sx={{ ml: "8px", alignItems: "center" }}>
              <AddIcon fontSize="small" {...svgIconProps} />
              <AgText value="Tambah" sx={{ ml: "8px" }} />
            </AgFlexRow>
          )
        )}
      </Button>
    </Link>
  );
};
