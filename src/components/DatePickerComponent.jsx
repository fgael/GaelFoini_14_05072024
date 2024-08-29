import PropTypes from "prop-types";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const DatePickerComponent = ({ date, setDate }) => {
  return <DatePicker onChange={setDate} value={date} />;
};

DatePickerComponent.propTypes = {
  // 'date' should be a Date object and is required
  date: PropTypes.instanceOf(Date).isRequired,
  // 'setDate' should be a function to set the selected date and is required
  setDate: PropTypes.func.isRequired,
};

export default DatePickerComponent;
