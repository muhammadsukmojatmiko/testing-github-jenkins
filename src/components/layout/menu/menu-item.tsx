import { agriakuBlack, agriakuGreen } from "@agriaku/base-ui";
import { ExpandLess, ExpandMore, ListOutlined } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
} from "@mui/material";
import { CanAccess, ITreeMenu, useRouterContext } from "@pankod/refine-core";
import { FC, ReactNode, useEffect, useState } from "react";

// Currently we only support 1 level of nested menu
type MenuItemProps = {
  menu: ITreeMenu;
  selectedKey?: string;
  children?: ReactNode;
  listItemButtonProps?: ListItemButtonProps;
  onParentClick?: () => void;
  onChildrenClick?: (name: string) => void;
};

export const MenuItem: FC<MenuItemProps> = ({
  menu,
  selectedKey = "",
  listItemButtonProps = {},
  onParentClick,
  onChildrenClick,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isParentSelected, setIsParentSelected] = useState(false);
  const theme = useTheme();
  const { Link } = useRouterContext();
  const { icon, label, route, name, children: menuChildren } = menu;
  const isNested = menuChildren.length > 0;

  useEffect(() => {
    const computedIsParentSelected = !isNested
      ? name === selectedKey
      : Boolean(menuChildren.find((child) => child.name === selectedKey));

    if (computedIsParentSelected !== isParentSelected) {
      setIsParentSelected(computedIsParentSelected);
    }

    if (computedIsParentSelected) {
      setIsCollapsed(true);
    }
  }, [
    selectedKey,
    isNested,
    isParentSelected,
    menuChildren,
    name,
    setIsCollapsed,
  ]);

  return (
    <div key={route}>
      <Tooltip title={label ?? name} placement="right" arrow>
        <div>
          <ListItemButton
            onClick={() => {
              onParentClick?.();
              setIsCollapsed((prev) => !prev);
            }}
            sx={{
              backgroundColor: theme.palette.common.white,
              padding: 0,
            }}
            {...(!isNested && route && { component: Link, to: route })}
            {...listItemButtonProps}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                pt: "20px",
                pl: "24px",
                pr: "20px",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pb: "20px",
                }}
              >
                {isParentSelected && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "14px",
                      height: "60%",
                      width: "4px",
                      backgroundColor: agriakuGreen[500],
                      borderRadius: "0 8px 8px 0",
                    }}
                  />
                )}
                <ListItemIcon
                  sx={{
                    justifyContent: "center",
                    minWidth: 36,
                    color: agriakuGreen[500],
                  }}
                >
                  {icon ?? <ListOutlined />}
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    noWrap: true,
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: agriakuBlack[950],
                    pl: "10px",
                  }}
                />
                {isNested &&
                  (isCollapsed ? (
                    <ExpandLess sx={{ color: agriakuGreen[500] }} />
                  ) : (
                    <ExpandMore sx={{ color: agriakuGreen[500] }} />
                  ))}
              </Box>
              <Divider />
            </Box>
          </ListItemButton>
        </div>
      </Tooltip>

      {isNested && (
        <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
          <List disablePadding component={"div"}>
            {menuChildren.map((submenu, i) => {
              return (
                <Box key={i + submenu.name}>
                  <ListItemButton
                    onClick={() => {
                      onChildrenClick?.(submenu.name);
                    }}
                    key={i + (submenu.name ?? submenu.label)}
                    sx={{
                      pt: "16px",
                      pl: "24px",
                      pr: "40px",
                      pb: 0,
                    }}
                    {...(submenu.route && {
                      component: Link,
                      to: submenu.route,
                    })}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <ListItemText
                        primary={submenu.label}
                        primaryTypographyProps={{
                          noWrap: true,
                          fontSize: "16px",
                          color:
                            selectedKey === submenu.name
                              ? agriakuGreen[500]
                              : agriakuBlack[300],
                          pb: "16px",
                          fontWeight: selectedKey === submenu.name ? 600 : 400,
                        }}
                      />
                      <Divider />
                    </Box>
                  </ListItemButton>
                </Box>
              );
            })}
          </List>
        </Collapse>
      )}
    </div>
  );
};

export type MenuItemWithAccessControlProps = MenuItemProps & {
  resource?: string;
};
export const MenuItemWithAccessControl: FC<MenuItemWithAccessControlProps> = (
  props,
) => {
  const { menu, resource, children } = props;
  const { route, name } = menu;

  return (
    <CanAccess
      key={route}
      resource={resource ?? name.toLowerCase()}
      action="list"
      params={{
        resource: menu,
      }}
    >
      <MenuItem {...props}>{children}</MenuItem>
    </CanAccess>
  );
};
