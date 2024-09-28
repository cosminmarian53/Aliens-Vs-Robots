import React, { useState } from "react";
import "../index.css";
function StarterScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="starter-screen">
      <h1>Welcome to Aliens vs. Robots</h1>
      <p>❗❗NOW IN WEB3❗❗</p>
      <button
        className="instructions-btn"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Instructions
      </button>
      {isModalOpen && (
        <div className="modal">
          <div className="starter-modal-content">
            <div className="starter-modal-wrapper">
              <h2 className="starter-modal-header">Instructions:</h2>
              <p>
                Welcome to Aliens vs. Robots! <br></br>Your goal is to defeat
                the boss and save the Alien General to win the game!
              </p>
              <p>Combat:</p>
              <p>I</p>
              <p>
                - If the player's health reaches 0, the game is over. <br></br>-
                If the enemy's health reaches 0, the enemy is defeated.
              </p>
              <p>II</p>
              <p>
                -You can only attack in the given timeframe window(3 seconds)
              </p>
              <p>-You can only parry in a certain time window(0.3s)</p>
              <p>
                -Upon successfully parrying an enemy's attack you will <br></br>
                <b>recover</b> a small percentage of your health ,<br></br> and
                deal a percentage of the enemy's health as damage
              </p>
              <p>Press ENTER in order to start the game❗</p>
              <button
                className="btn"
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <p>Defeat the boss to win the game(and get amazing rewards!)</p>
      <p>
        Press the
        <button className="btn">
          {" "}
          <b>ENTER</b>
        </button>{" "}
        key in order to start the game❗
      </p>
    </div>
  );
}

export default StarterScreen;
