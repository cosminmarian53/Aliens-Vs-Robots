import React from "react";
import attackSound from "../sounds/attack-sound.mp3";
import defendSound from "../sounds/defend.wav";
const Modal = ({ closeModal }) => {
  const attack = new Audio(attackSound);
  const defend = new Audio(defendSound);
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p>Player and NPC are on the same tile!</p>
        <div className="button-wrapper">
          <button onClick={() => attack.play()} className="attack-modal-btn">
            ⚔️Attack
          </button>
          <button onClick={() => defend.play()} className="defend-modal-btn">
            🛡️Defend
          </button>
          <button className="close-modal-btn" onClick={closeModal}>
            🏃‍♂️Run
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
