import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import DropdownComponent from "../components/DropdownComponent";
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
  const [selectedState, setSelectedState] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.toISOString().split("T")[0],
      startDate: startDate.toISOString().split("T")[0],
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
          <DateTimePickerComponent
            date={dateOfBirth}
            setDate={setDateOfBirth}
          />
        </div>
        <div>
          <label>Start Date</label>
          <DateTimePickerComponent date={startDate} setDate={setStartDate} />
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
          <DropdownComponent
            options={states.map((state) => ({
              value: state.abbreviation,
              label: state.name,
            }))}
            value={selectedState}
            onChange={setSelectedState}
          />
        </div>
        <div>
          <label>Zip Code</label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Department</label>
          <DropdownComponent
            options={departments}
            value={selectedDepartment}
            onChange={setSelectedDepartment}
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
