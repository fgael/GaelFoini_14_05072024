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
  // State hooks for managing form input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // State hooks for managing selected options in dropdowns
  const [selectedState, setSelectedState] = useState(
    states[0]?.abbreviation || ""
  );
  const [selectedDepartment, setSelectedDepartment] = useState(
    departments[0] || ""
  );

  // Handler for department dropdown change
  const handleDepartmentsChange = (value) => {
    setSelectedDepartment(value);
  };

  // Handler for state dropdown change
  const handleStatesChange = (value) => {
    setSelectedState(value);
  };

  // Handler to manage changes in the zip code input
  const handleZipCodeChange = (e) => {
    // Remove non-digit characters
    const value = e.target.value.replace(/\D/g, "");
    setZipCode(value);
  };

  const handleSubmit = (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    // Create a new employee object with current form state values
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

    // Dispatch the action to add a new employee to the store
    dispatch(addEmployee(newEmployee));
    // Open the modal to confirm employee creation
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>HRnet</h1>
      {/* Link to view current employees */}
      <Link to="employee-list">View Current Employees</Link>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for employee information */}
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date of Birth</label>
          {/* Date picker component for date of birth */}
          <DatePickerComponent
            id="dateOfBirth"
            date={dateOfBirth}
            setDate={setDateOfBirth}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          {/* Date picker component for start date */}
          <DatePickerComponent
            id="startDate"
            date={startDate}
            setDate={setStartDate}
          />
        </div>
        <div className="address-container">
          <legend>Address</legend>
          <div>
            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            {/* Select component for choosing a state */}
            <Select
              options={states}
              valueKey="abbreviation"
              displayKey="name"
              onChange={handleStatesChange}
            />
          </div>
          <div>
            <label htmlFor="zipCode">Zip Code</label>
            <input
              id="zipCode"
              type="text"
              value={zipCode}
              onChange={handleZipCodeChange}
              required
              pattern="\d*"
            />
          </div>
        </div>
        <div>
          <label htmlFor="department">Department</label>
          {/* Select component for choosing a department */}
          <Select
            options={departments}
            valueKey="value"
            onChange={handleDepartmentsChange}
          />
        </div>
        {/* Button to submit the form */}
        <button type="submit" aria-label="Save employee details">
          Save
        </button>
      </form>
      {/* Modal component to confirm employee creation */}
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        content={<p>Employee created successfully!</p>}
      />
    </div>
  );
};

export default CreateEmployee;
