import PropTypes from "prop-types";
import { useTable, usePagination } from "react-table";
import { useState, useMemo } from "react";

const DataTableComponent = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter((row) => {
      return columns.some((column) => {
        const cellValue = row[column.accessor];
        return (
          cellValue &&
          cellValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    });
  }, [searchTerm, data, columns]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    usePagination
  );

  return (
    <div className="data-table-container">
      <input
        id="search"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        aria-label="Search"
      />
      <table {...getTableProps()} className="data-table" role="table">
        <thead role="rowgroup">
          {headerGroups.map((headerGroup) => {
            const { key, ...headerGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...headerGroupProps} role="row">
                {headerGroup.headers.map((column) => {
                  const { key, ...columnProps } = column.getHeaderProps();
                  return (
                    <th key={key} {...columnProps} role="columnheader">
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody {...getTableBodyProps()} role="rowgroup">
          {page.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              const { key, ...rowProps } = row.getRowProps();
              return (
                <tr key={key} {...rowProps} role="row">
                  {row.cells.map((cell) => {
                    const { key, ...cellProps } = cell.getCellProps();
                    return (
                      <td key={key} {...cellProps} role="cell">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length} role="cell">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        className="data-table-pagination"
        role="navigation"
        aria-label="Pagination controls"
      >
        <div className="pagination-controls">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            aria-label="Go to first page"
            className="pagination-button"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            aria-label="Go to previous page"
            className="pagination-button"
          >
            {"<"}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            aria-label="Go to next page"
            className="pagination-button"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            aria-label="Go to last page"
            className="pagination-button"
          >
            {">>"}
          </button>
        </div>
        <span className="pagination-info">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <div className="show-select">
          <label htmlFor="pageSize">Show</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            aria-label="Number of items per page"
            className="page-size-select"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

DataTableComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
        .isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTableComponent;
