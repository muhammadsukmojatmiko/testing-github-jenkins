import { DataProviderGetListResponseModel } from "@data/models/response/data-provider-get-list-response";
import { parseTableParams, useRouterContext } from "@pankod/refine-core";
import { QueryObserverResult } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { AgDatagrid, AgDatagridProps } from "./base-datagrid";

export type DatagridProps<TData> = AgDatagridProps<TData> & {
  initialCurrent?: number;
  initialPageSize?: number;
};
export function Datagrid<TData>({
  onPageChange: onPageChangeFromProps,
  initialCurrent = 0,
  initialPageSize = 10,
  useDatagridProps = {},
  filterLabel = "Filter:",
  ...props
}: DatagridProps<TData>) {
  const { useLocation } = useRouterContext();
  const { search } = useLocation();

  const [page, setPage] = useState<number>(() => {
    const { parsedCurrent } = parseTableParams(search);
    return parsedCurrent || initialCurrent;
  });

  const [pageSize, setPageSize] = useState<number>(() => {
    const { parsedPageSize } = parseTableParams(search);
    return parsedPageSize || initialPageSize;
  });

  const [pageIndex, setPageIndex] = useState<string>("");

  const tableQueryResultRef = useRef<QueryObserverResult<
    DataProviderGetListResponseModel<TData>
  > | null>(null);

  const tableQueryResultCallback: AgDatagridProps["tableQueryResultCallback"] =
    (result) => {
      tableQueryResultRef.current = result;
    };

  const onPageChange: AgDatagridProps["onPageChange"] = (newPage, details) => {
    setPage(newPage);
    onPageChangeFromProps?.(page, details);

    if (tableQueryResultRef.current?.data?.data) {
      const _pageIndex =
        newPage > page
          ? tableQueryResultRef.current.data.next
          : tableQueryResultRef.current.data.previous;
      setPageIndex(_pageIndex);
    }
  };

  const onPageSizeChange = (pageSize: number) => {
    setPageSize(pageSize);
    setPageIndex("");
    setPage(0);
  };

  return (
    <AgDatagrid
      tableQueryResultCallback={tableQueryResultCallback}
      page={page}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      useDatagridProps={{
        metaData: {
          pageIndex,
          pageCurrent: page,
          pageSize,
        },
        ...useDatagridProps,
      }}
      filterLabel={filterLabel}
      {...props}
    />
  );
}
