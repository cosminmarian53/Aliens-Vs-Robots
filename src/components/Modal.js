import React from "react";

const Modal = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p>Player and NPC are on the same tile!</p>
        <div className="button-wrapper">
          <button className="attack-modal-btn">⚔️Attack</button>
          <button className="defend-modal-btn">🛡️Defend</button>
          <button className="close-modal-btn" onClick={closeModal}>
            ❌Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
