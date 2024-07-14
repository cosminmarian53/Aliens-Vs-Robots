import React from "react";
import "./Stats.css";
const Stats = () => {
  const hp = 100;
  const strength = 50;

  return (
    <div className="stats-wrapper">
      <div className="stats-content">
        <h2 className="stats-header">Stats</h2>
        <p>💓HP: {hp}</p>
        <p>⚔️Strength: {strength}</p>
      </div>
    </div>
  );
};

export default Stats;
