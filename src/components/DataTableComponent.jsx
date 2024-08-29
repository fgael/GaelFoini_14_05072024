import PropTypes from "prop-types";
import { useTable, usePagination } from "react-table";
import { useState, useMemo } from "react";

const DataTableComponent = ({ columns, data }) => {
  // State for managing the search input value
  const [searchTerm, setSearchTerm] = useState("");

  // Memoized calculation of filtered data based on the search term
  const filteredData = useMemo(() => {
    // If there's no search term, return the original data
    if (!searchTerm) return data;

    // Filter the data based on the search term
    return data.filter((row) => {
      // Check if any column contains the search term (case insensitive)
      return columns.some((column) => {
        const cellValue = row[column.accessor];
        return (
          cellValue &&
          cellValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    });
  }, [searchTerm, data, columns]); // Dependencies for useMemo: recalculates if any of these change

  // Destructure properties and functions from useTable and usePagination hooks
  const {
    getTableProps, // Function to get table props
    getTableBodyProps, // Function to get table body props
    headerGroups, // Array of header groups for table headers
    page, // Current page of data rows
    prepareRow, // Function to prepare a row for rendering
    canPreviousPage, // Boolean if there is a previous page
    canNextPage, // Boolean if there is a next page
    pageOptions, // Array of available page options
    gotoPage, // Function to navigate to a specific page
    nextPage, // Function to navigate to the next page
    previousPage, // Function to navigate to the previous page
    setPageSize, // Function to set the number of rows per page
    state: { pageIndex, pageSize }, // Destructuring state values for current page index and size
  } = useTable(
    {
      columns,
      data: filteredData, // Use the filtered data in the table
      initialState: {
        pageIndex: 0, // Start on the first page
        pageSize: 10, // Default number of rows per page
      },
    },
    usePagination // Use pagination plugin hook for table
  );

  return (
    <div className="data-table-container">
      {/* Search input for filtering table data */}
      <input
        id="search"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on input change
        className="search-input"
        aria-label="Search"
      />

      {/* Table structure */}
      <table {...getTableProps()} className="data-table" role="table">
        <thead role="rowgroup">
          {/* Render table headers */}
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
          {/* Render rows if there is data on the current page */}
          {page.length > 0 ? (
            page.map((row) => {
              prepareRow(row); // Prepare the row for rendering
              const { key, ...rowProps } = row.getRowProps();
              return (
                <tr key={key} {...rowProps} role="row">
                  {row.cells.map((cell) => {
                    const { key, ...cellProps } = cell.getCellProps();
                    return (
                      <td key={key} {...cellProps} role="cell">
                        {cell.render("Cell")} {/* Render cell content */}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            // Show this row if no data is available
            <tr>
              <td colSpan={columns.length} role="cell">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div
        className="data-table-pagination"
        role="navigation"
        aria-label="Pagination controls"
      >
        <div className="pagination-controls">
          {/* First page button */}
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            aria-label="Go to first page"
            className="pagination-button"
          >
            {"<<"}
          </button>
          {/* Previous page button */}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            aria-label="Go to previous page"
            className="pagination-button"
          >
            {"<"}
          </button>
          {/* Next page button */}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            aria-label="Go to next page"
            className="pagination-button"
          >
            {">"}
          </button>
          {/* Last page button */}
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            aria-label="Go to last page"
            className="pagination-button"
          >
            {">>"}
          </button>
        </div>
        {/* Display current page information */}
        <span className="pagination-info">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        {/* Page size selection dropdown */}
        <div className="show-select">
          <label htmlFor="pageSize">Show</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value)); // Update the page size
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
      // Each column must have a Header string
      Header: PropTypes.string.isRequired,
      // Each column must have an accessor (either a string or a function)
      accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
        .isRequired,
    })
  ).isRequired,
  // Data must be an array of objects
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataTableComponent;
