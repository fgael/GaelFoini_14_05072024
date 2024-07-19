import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<CreateEmployee />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
