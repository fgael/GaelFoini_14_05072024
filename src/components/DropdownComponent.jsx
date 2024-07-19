import PropTypes from "prop-types";

const DropdownComponent = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select...</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

DropdownComponent.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DropdownComponent;
