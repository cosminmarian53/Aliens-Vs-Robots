import React from "react";
import "../index.css";
const GameOver = () => {
  return (
    <div className="game-over">
      <h1 className="game-over-header">Game Over</h1>
      <p>Please, refresh the page in order to try again!</p>
      <p>
        💡Tip: Attacking or defending at the wrong time will result in damage❗
      </p>
      <button className="refresh-btn" onClick={() => window.location.reload()}>
        Refresh
      </button>
    </div>
  );
};

export default GameOver;
