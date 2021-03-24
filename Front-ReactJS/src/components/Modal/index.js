import React from "react";
import PropTypes from "prop-types";
import StyleModal from "./StyleModal";

const Modal = ({ isShowing, hide, title, ...props }) => {

  if (isShowing) 
    return (
    <StyleModal>
      <div id="myModal" className="modal-overlay">
        <div className="modal-wrapper">
          <div className="modale">
            <div className="modal-header">
              <h4>{title}</h4>
              <button
                type="button"
                className="modal-close-button"
                onClick={hide}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">{props.children}</div>
          </div>
        </div>
      </div>
      </StyleModal>
    );
  else return null;
};

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
export default Modal;
