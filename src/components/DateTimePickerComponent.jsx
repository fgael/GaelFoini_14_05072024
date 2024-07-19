import PropTypes from "prop-types";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";

const DateTimePickerComponent = ({ date, setDate }) => {
  return <DateTimePicker onChange={setDate} value={date} />;
};

DateTimePickerComponent.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
};

export default DateTimePickerComponent;
