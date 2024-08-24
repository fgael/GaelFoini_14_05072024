import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DataTableComponent from "../components/DataTableComponent";

const EmployeeList = () => {
  const data = useSelector((state) => state.employees.employees);

  const formatDateToUS = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

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
    []
  );

  return (
    <div>
      <h1>Employee List</h1>
      <Link to="/" className="home-link">
        Home
      </Link>
      <DataTableComponent columns={columns} data={data} />
    </div>
  );
};

export default EmployeeList;
