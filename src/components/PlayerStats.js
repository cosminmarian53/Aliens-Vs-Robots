import React from "react";
import "./Stats.css";
const PlayerStats = ({ playerHealth, playerStrength }) => {
  return (
    <div className="label">
      <div className="stats-wrapper">
        <div className="stats-content">
          <h2 className="stats-header">👽Player Stats</h2>
          <p>💓HP: {playerHealth}</p>
          <p>⚔️Strength: {playerStrength}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
