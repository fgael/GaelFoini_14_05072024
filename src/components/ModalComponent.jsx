import PropTypes from "prop-types";
import Modal from "react-modal";

const ModalComponent = ({ isOpen, onRequestClose, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content"
    >
      {/* Close button for the modal */}
      <button
        className="modal-close-button"
        onClick={onRequestClose}
        aria-label="Close modal"
      >
        &times; {/* '×' symbol to represent the close action */}
      </button>
      {/* Content to be displayed inside the modal */}
      {content}
    </Modal>
  );
};

ModalComponent.propTypes = {
  // 'isOpen' should be a boolean and is required to control modal visibility
  isOpen: PropTypes.bool.isRequired,
  // 'onRequestClose' should be a function to handle modal close and is required
  onRequestClose: PropTypes.func.isRequired,
  // 'content' can be any renderable React node (e.g., string, element, etc.) and is required
  content: PropTypes.node.isRequired,
};

export default ModalComponent;
