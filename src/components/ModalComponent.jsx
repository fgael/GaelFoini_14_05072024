import PropTypes from "prop-types";
import Modal from "react-modal";

const ModalComponent = ({ isOpen, onRequestClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById("root")} // Set app element directly
    >
      {content}
    </Modal>
  );
};

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  content: PropTypes.node.isRequired,
};

export default ModalComponent;
