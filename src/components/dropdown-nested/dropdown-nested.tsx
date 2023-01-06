import { agriakuBlack, AgText, AgTextInput } from "@agriaku/base-ui";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Chip,
  useTheme,
} from "@mui/material";
import {
  ChangeEvent,
  FC,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

export type Row = { id: string | number; label: string; menus?: Row[] };
export type Coordinate = {
  left: number;
  top: number;
};
export type DropdownNestedProps = {
  label: string;
  menus: Row[];
  id?: string | number;
};

export const DropdownNested: FC<DropdownNestedProps> = ({
  label,
  menus,
  id,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [coords, setCoords] = useState<Coordinate | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  const renderMenu = (menus: Row[]) => {
    if (menus.length === 0) {
      return null;
    }

    return (
      <>
        {menus.map((menu, i) => {
          return (
            <Box key={i + menu.label + id}>
              <MenuRow menu={menu}>{renderMenu(menu.menus ?? [])}</MenuRow>
            </Box>
          );
        })}
      </>
    );
  };

  // // assume it only has 2 level of menus
  const filterMenu = useCallback((menus: Row[], query: string): Row[] => {
    const filteredMenus = menus.filter((upperLevelMenu) => {
      return (
        upperLevelMenu.label.toLowerCase().includes(query.toLowerCase()) ||
        (upperLevelMenu.menus ?? []).some((lowerLevelMenu) =>
          lowerLevelMenu.label.toLowerCase().includes(query.toLowerCase()),
        )
      );
    });

    filteredMenus.forEach((filteredMenu) => {
      filteredMenu.menus = filteredMenu.label
        .toLowerCase()
        .includes(query.toLowerCase())
        ? filteredMenu.menus
        : (filteredMenu.menus ?? []).filter((lowerLevelMenu) =>
            lowerLevelMenu.label.toLowerCase().includes(query.toLowerCase()),
          );
    });

    return filteredMenus;
  }, []);

  const filteredMenus = useMemo(
    () => filterMenu(JSON.parse(JSON.stringify(menus)), searchQuery),
    [menus, searchQuery],
  );

  const handleChipClick = (evt: MouseEvent<HTMLDivElement>) => {
    setShow(true);

    const node = evt.target as HTMLDivElement;
    const rect = node.getBoundingClientRect();
    setCoords({
      left: rect.x,
      top: rect.y + 30, // TODO
    });
  };

  const handleTextInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(evt.target.value);
  };

  const handleOnBlur = (event: FocusEvent<HTMLDivElement>) => {
    // if the blur was because of outside focus
    // currentTarget is the parent element, relatedTarget is the clicked element
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShow(false);
    }
  };

  return (
    <Box sx={{ position: "relative" }} ref={containerRef}>
      <Chip
        label={label}
        onClick={handleChipClick}
        color="primary"
        sx={{ fontWeight: 600 }}
        deleteIcon={<KeyboardArrowDownIcon />}
        onDelete={handleChipClick}
      />

      {show && coords && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            top: 36,
            zIndex: 10,
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Card onBlur={handleOnBlur} sx={{ minWidth: "200px" }}>
            <AgTextInput
              variant="outlined"
              onChange={handleTextInputChange}
              value={searchQuery}
              size="small"
              autoFocus
              sx={{ padding: "16px 8px" }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: "4px" }} />,
              }}
              placeholder="Cari Kota"
            />
            {renderMenu(filteredMenus)}
          </Card>
        </Box>
      )}
    </Box>
  );
};

export type MenuRowProps = {
  menu: Row;
  onClick?: (id: Row["id"]) => void;
  children?: ReactNode;
};
export const MenuRow: FC<MenuRowProps> = ({
  menu: { id, label, menus },
  onClick,
  children,
}) => {
  return (
    <Box onClick={() => onClick?.(id)} tabIndex={0}>
      {(menus ?? []).length === 0 ? (
        <>
          <Box sx={{ padding: "2px 0" }}>
            <AgText value={label} variant="body1" />
          </Box>
          {children}
        </>
      ) : null}

      {(menus ?? []).length > 0 ? (
        <Box>
          <Accordion
            square
            disableGutters
            sx={{
              "& .Mui-expanded": {
                backgroundColor: agriakuBlack[100],
              },
              borderBottom: `1px solid ${agriakuBlack[100]}`,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box>
                <AgText value={label} variant="body1" />
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: "0px 16px" }}>
              {children}
            </AccordionDetails>
          </Accordion>
        </Box>
      ) : null}
    </Box>
  );
};
