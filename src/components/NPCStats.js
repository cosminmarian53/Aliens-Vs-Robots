import React from "react";
import "./Stats.css";
const Stats = ({ enemyHealth, enemyStrength }) => {
  return (
    <div className="enemy-stats">
      <div className="enemy-stats-wrapper">
        <div className="stats-content">
          <h2 className="stats-header">🤖Enemy Stats</h2>
          <p>🖤HP: {enemyHealth}</p>
          <p>⚔️Strength: {enemyStrength}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
