import React from "react";
import "./Stats.css";
const PlayerStats = () => {
  const hp = 100;
  const strength = 50;

  return (
    <div className="label">
      <div className="stats-wrapper">
        <div className="stats-content">
          <h2 className="stats-header">👽Player Stats</h2>
          <p>💓HP: {hp}</p>
          <p>⚔️Strength: {strength}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
