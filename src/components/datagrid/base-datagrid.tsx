// TODO: move it to refine-ui package

import { agriakuBlack, AgText } from "@agriaku/base-ui";
import {
  AgBulkDeleteButton,
  AgBulkDeleteButtonProps,
} from "@components/button/bulk-delete-button";
import {
  AgCreateButton,
  AgCreateButtonProps,
} from "@components/button/create-button";
import { EmptyList, EmptyListProps } from "@components/empty-list/empty-list";
import { BaseErrorModel } from "@data/models/response/base-error";
import { DataProviderGetListResponseModel } from "@data/models/response/data-provider-get-list-response";
import { Box, Grid, useTheme } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridCallbackDetails,
  GridColumns,
  GridRowId,
} from "@mui/x-data-grid";
import {
  useDataGrid,
  UseDataGridProps,
  UseDataGridReturnType,
} from "@src/hooks/use-datagrid";
import { QueryObserverResult } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";

export type AgDatagridProps<TData = any> = Omit<
  DataGridProps,
  "columns" | "rows"
> &
  Partial<Pick<DataGridProps, "columns" | "rows">> & {
    resource: string;
    useDatagridProps?: UseDataGridProps<TData, BaseErrorModel, any>;
    filterLabel?: string;
    emptyListProps?: EmptyListProps;
    dynamicRowHeight?: boolean;
    renderColumns?: (useDataGridResult: UseDataGridReturnType) => GridColumns;
    renderFilter?: (useDataGridResult: UseDataGridReturnType) => ReactNode;
    renderAction?: (
      useDataGridResult: UseDataGridReturnType,
      components: { DeleteButton: ReactNode; CreateButton: ReactNode },
    ) => ReactNode;
    onPageSizeChange?: (page: number, details: GridCallbackDetails) => void;
    tableQueryResultCallback?: (
      tableQueryResult: QueryObserverResult<
        DataProviderGetListResponseModel<TData>
      >,
    ) => void;
    renderEmpty?: () => ReactNode;
  };
export function AgDatagrid<T>({
  resource,
  useDatagridProps = {},
  filterLabel = "",
  dynamicRowHeight = true,
  emptyListProps = {
    title: "Daftar kosong",
    subtitle: "Mohon maaf, data kosong",
  },
  renderColumns,
  renderFilter,
  renderAction,
  onPageSizeChange,
  columns: columnsFromProps,
  onSelectionModelChange,
  tableQueryResultCallback,
  renderEmpty,
  sx,
  ...props
}: AgDatagridProps<T>) {
  if (!Boolean(columnsFromProps) && !Boolean(renderColumns)) {
    throw "Error: at least columns or renderColumns must be provided";
  }

  // @ts-expect-error
  const useDataGridResult = useDataGrid({
    resource,
    ...useDatagridProps,
  });
  const theme = useTheme();

  const { setPageSize, current, setCurrent, dataGridProps, tableQueryResult } =
    useDataGridResult;
  const { rows } = dataGridProps;

  useEffect(() => {
    // @ts-expect-error
    tableQueryResultCallback?.(tableQueryResult);
  }, [tableQueryResult]);

  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]);

  const columns = columnsFromProps
    ? transformColumns(columnsFromProps)
    : transformColumns(renderColumns?.(useDataGridResult) ?? []);

  const handlePageChange = (page: number, details: GridCallbackDetails) => {
    setCurrent(page + 1);
  };

  const handlePageSizeChange = (
    pageSize: number,
    details: GridCallbackDetails,
  ) => {
    setPageSize(pageSize);
    onPageSizeChange?.(pageSize, details);
  };

  const DeleteButton = (
    props: Omit<AgBulkDeleteButtonProps, "resource" | "ids">,
  ) => {
    return (
      <AgBulkDeleteButton {...props} resource={resource} ids={selectedIds} />
    );
  };

  const CreateButton = (props: AgCreateButtonProps) => {
    return <AgCreateButton {...props} resource={resource} />;
  };

  return (
    <Box>
      {filterLabel.length > 0 && (
        <Box sx={{ mb: "4px" }}>
          <AgText value={filterLabel} variant="body1" fontWeight={500} />
        </Box>
      )}
      {(Boolean(renderFilter) || Boolean(renderAction)) && (
        <Grid container sx={{ mb: "8px" }}>
          <Grid item xs={12} md={6}>
            {renderFilter?.(useDataGridResult)}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderAction?.(useDataGridResult, {
              DeleteButton: <DeleteButton />,
              CreateButton: <CreateButton />,
            })}
          </Grid>
        </Grid>
      )}
      {rows.length === 0 &&
        (renderEmpty ? renderEmpty() : <EmptyList {...emptyListProps} />)}
      {rows.length > 0 && (
        <DataGrid
          {...dataGridProps}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              background: theme.palette.background.paper,
              borderBottom: `1px solid ${agriakuBlack[100]}`,
              borderTop: `1px solid ${agriakuBlack[100]}`,
              wordWrap: "break-word",
            },
            "& .MuiDataGrid-columnHeaderTitle, .MuiDataGrid-columnHeaderTitleContainerContent":
              {
                fontWeight: 600,
                wordWrap: "break-word",
              },
            "& .MuiDataGrid-columnSeparator": {
              opacity: "0 !important",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${agriakuBlack[100]}`,
              wordWrap: "break-word",
            },

            "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within":
              {
                outline: "none",
              },

            // https://mui.com/x/react-data-grid/row-height/#dynamic-row-height
            ...(dynamicRowHeight
              ? {
                  "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                    py: "8px",
                  },
                  "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                    py: "15px",
                  },
                  "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                    py: "22px",
                  },
                }
              : {}),

            "& .MuiDataGrid-main ::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
              cursor: "pointer",
            },
            /* Track */
            "& .MuiDataGrid-main ::-webkit-scrollbar-track": {
              backgroundColor: agriakuBlack[100],
              borderRadius: "100px",
            },
            /* Handle */
            "& .MuiDataGrid-main ::-webkit-scrollbar-thumb": {
              background: agriakuBlack[200],
              borderRadius: "100px",
            },
            ...sx,
          }}
          columns={columns}
          autoHeight
          hideFooterSelectedRowCount
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSelectionModelChange={(ids, details) => {
            setSelectedIds(ids);
            onSelectionModelChange?.(ids, details);
          }}
          page={current}
          rows={rows}
          {...props}
        />
      )}
    </Box>
  );
}

function transformColumns(columns: GridColumns): GridColumns {
  return columns.map((col) => ({
    ...col,
    sortable: col.sortable ?? false,
    disableColumnMenu: col.disableColumnMenu ?? true,
  }));
}
