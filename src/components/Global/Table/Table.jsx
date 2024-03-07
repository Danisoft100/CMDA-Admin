import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useRef, useState } from "react";
import icons from "~/assets/js/icons";
import { classNames } from "~/utilities/classNames";
import Loading from "../Loading/Loading";
import emptyFiles from "~/assets/images/empty-files.jpg";

const PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return <input type="checkbox" ref={ref} className={className + " cursor-pointer h-4 w-4 accent-primary"} {...rest} />;
}

const Table = ({
  tableData,
  tableColumns, // Array of objects ({ header: required, accessor: required }) to use as column title, key, and control the display
  emptyDataText = "There are no content to display", // Text to display when tableData is empty
  loading, // shows loading state - mostly used during serverSidePagination
  enableRowSelection, // set as true if you need to select rows, use onRowSelectionChange to handle selectedRows
  onRowSelectionChange = console.log, // function to handle selectedRows - contains selectedRows as a parameter
  searchFilter, // state for your search query,
  setSearchFilter, // function that sets the state of your search query
  serverSidePagination, // set true to control pagination with server
  showPagination = true, // set false to hide pagination row
  currentPage = 1, // current page in pagination
  perPage = 10, // number of items per page
  perPageOptions = PER_PAGE_OPTIONS, // Array of numbers to use as select options to control perPage
  totalPageCount = -1, // total number of pages
  totalItemsCount, // total number of items in the data
  onPaginationChange = console.log, // function to handle pagination change - contains the object {perPage: number, currentPage: number } as parameters
}) => {
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: currentPage - 1,
    pageSize: perPage,
  });

  const pagination = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

  const data = useMemo(() => {
    if (!tableData || !Array.isArray(tableData)) return [];
    else return tableData;
  }, [tableData]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("select", {
      id: "select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
            className: "accent-white",
          }}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
      enableSorting: false,
    }),
    ...tableColumns.map(({ header, accessor, cell: Cell, enableSorting = true }) =>
      columnHelper.accessor(accessor, {
        header,
        cell: (info) => (Cell ? <Cell {...info} /> : info.getValue()),
        enableSorting,
      })
    ),
  ];

  const table = useReactTable({
    data,
    columns: enableRowSelection ? columns : columns.slice(1),
    state: { sorting, rowSelection, pagination, globalFilter: searchFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setSearchFilter,
    enableRowSelection,
    ...(serverSidePagination ? { pageCount: totalPageCount } : { getPaginationRowModel: getPaginationRowModel() }),
    onRowSelectionChange: setRowSelection,
    manualPagination: serverSidePagination,
    onPaginationChange: setPagination,
  });

  useEffect(() => {
    if (serverSidePagination) {
      onPaginationChange({ currentPage: pagination.pageIndex + 1, perPage: pagination.pageSize });
    }
  }, [pagination, onPaginationChange, serverSidePagination]);

  useEffect(() => {
    if (enableRowSelection) {
      const selected = Object.keys(rowSelection).map((idx) => data[idx]);
      onRowSelectionChange(selected);
    }
  }, [data, rowSelection, enableRowSelection, onRowSelectionChange]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full sm:w-full" border={0}>
          <thead className="bg-primary text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} className="first:rounded-tl-md  last:rounded-tr-md">
                    {header.isPlaceholder ? null : (
                      <span
                        {...{
                          className: classNames(
                            header.column.getCanSort() && "cursor-pointer",
                            "h-full w-full inline-flex gap-2 items-center py-3 px-4 select-none",
                            "text-sm font-medium text-capitalize"
                          ),
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort()
                          ? {
                              asc: icons.ascending,
                              desc: icons.descending,
                              false: icons.sort,
                            }[header.column.getIsSorted()]
                          : null}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="relative">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={classNames(
                    "hover:bg-onPrimary border-b last:border-0",
                    row.getIsSelected() && "bg-onPrimary"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 px-4 text-sm min-w-fit">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              // Empty Table Data
              <tr>
                <td colSpan={table.getFlatHeaders().length} className="py-8 px-3 text-center">
                  <img src={emptyFiles} className="w-40 mx-auto mb-2.5 rounded-full" />
                  <p className="text-gray-dark text-sm font-medium">{emptyDataText}</p>
                </td>
              </tr>
            )}
            {loading && (
              <tr className="absolute top-0 h-full w-full bg-onPrimary/60">
                <td className="h-full w-full flex items-center justify-center">
                  <Loading className="text-primary" height={48} width={48} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {table.getRowModel().rows.length && showPagination ? (
        <div className="mt-3 flex flex-col-reverse md:flex-row justify-between md:items-center gap-3 px-3">
          <label className="inline-flex gap-2 items-center text-sm font-semibold text-primary">
            Showing
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className={classNames(
                "bg-onPrimary border border-gray rounded-md block min-w-max text-sm font-normal px-2 py-1.5 cursor-pointer",
                "focus:ring focus:ring-primary/20 focus:outline-none focus:bg-white focus:border-transparent transition-all"
              )}
            >
              {perPageOptions.map((page) => (
                <option key={page} value={page} color="red">
                  {page}
                </option>
              ))}
            </select>
            out of {serverSidePagination ? totalItemsCount : table.getPrePaginationRowModel().rows.length}
          </label>
          {/* pagination buttons */}
          <div className="ml-auto md:ml-0 flex items-center gap-1 text-primary">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className={classNames(
                "inline-flex h-8 w-8 justify-center items-center text-sm font-medium rounded border bg-onPrimary transition-all",
                "hover:bg-primary hover:text-white disabled:hover:bg-onPrimary disabled:hover:text-primary disabled:opacity-40"
              )}
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={classNames(
                "inline-flex h-8 w-8 justify-center items-center text-sm font-medium rounded border bg-onPrimary transition-all",
                "hover:bg-primary hover:text-white disabled:hover:bg-onPrimary disabled:hover:text-primary disabled:opacity-40"
              )}
            >
              {"<"}
            </button>
            <span className="mx-2">
              <b>{table.getState().pagination.pageIndex + 1}</b> of <b>{table.getPageCount()}</b>
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={classNames(
                "inline-flex h-8 w-8 justify-center items-center text-sm font-medium rounded border bg-onPrimary transition-all",
                "hover:bg-primary hover:text-white disabled:hover:bg-onPrimary disabled:hover:text-primary disabled:opacity-40"
              )}
            >
              {">"}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className={classNames(
                "inline-flex h-8 w-8 justify-center items-center text-sm font-medium rounded border bg-onPrimary transition-all",
                "hover:bg-primary hover:text-white disabled:hover:bg-onPrimary disabled:hover:text-primary disabled:opacity-40"
              )}
            >
              {">>"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Table;
