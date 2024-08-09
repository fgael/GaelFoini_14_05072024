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
    // Pagination props
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
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "200px" }}
      />
      <table {...getTableProps()} className="data-table">
        <thead>
          {headerGroups.map((headerGroup) => {
            const headerGroupProps = headerGroup.getHeaderGroupProps();
            return (
              <tr key={headerGroupProps.key} {...headerGroupProps}>
                {headerGroup.headers.map((column) => {
                  const columnProps = column.getHeaderProps();
                  return (
                    <th key={columnProps.key} {...columnProps}>
                      {column.render("Header")}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return (
                <tr key={rowProps.key} {...rowProps}>
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <td key={key} {...restCellProps}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageOptions.length - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
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
