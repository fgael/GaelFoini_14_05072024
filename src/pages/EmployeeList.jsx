import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DataTableComponent from "../components/DataTableComponent";

const EmployeeList = () => {
  // Retrieve the list of employees from the Redux store
  const data = useSelector((state) => state.employees.employees);

  // Function to format dates to the US date format (e.g., January 1, 2024)
  const formatDateToUS = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  // Define the columns for the data table, using React's useMemo to memoize the columns array
  const columns = React.useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      {
        Header: "Start Date",
        accessor: "startDate",
        Cell: ({ value }) => formatDateToUS(value),
      },
      { Header: "Department", accessor: "department" },
      {
        Header: "Date of Birth",
        accessor: "dateOfBirth",
        Cell: ({ value }) => formatDateToUS(value),
      },
      { Header: "Street", accessor: "street" },
      { Header: "City", accessor: "city" },
      { Header: "State", accessor: "state" },
      { Header: "Zip Code", accessor: "zipCode" },
    ],
    [] // Dependencies array, empty means this useMemo will only run once
  );

  return (
    <div>
      <h1>Employee List</h1>
      {/* Link to navigate back to the home page */}
      <Link to="/" className="home-link">
        Home
      </Link>
      {/* DataTableComponent renders the employee data in a table format using the defined columns */}
      <DataTableComponent columns={columns} data={data} />
    </div>
  );
};

export default EmployeeList;
