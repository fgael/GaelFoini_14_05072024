import PropTypes from "prop-types";
import Modal from "react-modal";

const ModalComponent = ({ isOpen, onRequestClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
    >
      <button
        className="modal-close-button"
        onClick={onRequestClose}
        aria-label="Close modal"
      >
        &times;
      </button>
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
