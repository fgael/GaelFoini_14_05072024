import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Select from "@fgael/react-select";
import DatePickerComponent from "../components/DatePickerComponent";
import ModalComponent from "../components/ModalComponent";
import { departments } from "../data/departments";
import { states } from "../data/states";
import { addEmployee } from "../store";

const CreateEmployee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const [selectedState, setSelectedState] = useState(
    states[0]?.abbreviation || ""
  );
  const [selectedDepartment, setSelectedDepartment] = useState(
    departments[0] || ""
  );

  const handleDepartmentsChange = (value) => {
    setSelectedDepartment(value);
  };

  const handleStatesChange = (value) => {
    setSelectedState(value);
  };

  const handleZipCodeChange = (e) => {
    // Remove non-digit characters
    const value = e.target.value.replace(/\D/g, "");
    setZipCode(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.toISOString(),
      startDate: startDate.toISOString(),
      street,
      city,
      state: selectedState,
      zipCode,
      department: selectedDepartment,
    };

    dispatch(addEmployee(newEmployee));
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>HRnet</h1>
      <Link to="employee-list">View Current Employees</Link>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth</label>
          <DatePickerComponent date={dateOfBirth} setDate={setDateOfBirth} />
        </div>
        <div>
          <label>Start Date</label>
          <DatePickerComponent date={startDate} setDate={setStartDate} />
        </div>
        <div>
          <label>Street</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>State</label>
          <Select
            options={states}
            valueKey="abbreviation"
            displayKey="name"
            onChange={handleStatesChange}
          />
        </div>
        <div>
          <label>Zip Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={handleZipCodeChange}
            required
            pattern="\d*"
          />
        </div>
        <div>
          <label>Department</label>
          <Select
            options={departments}
            valueKey="value"
            onChange={handleDepartmentsChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        content={<p>Employee created successfully!</p>}
      />
    </div>
  );
};

export default CreateEmployee;
