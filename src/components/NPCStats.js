import React from "react";
import "./Stats.css";
const Stats = ({
  enemyHealth,
  enemyStrength,
  isBoss,
  currentEnemy,
  bossHealth,
  bossStrength,
}) => {
  return (
    <div className="enemy-stats">
      <div className="enemy-stats-wrapper">
        {bossHealth === 0 ? (
          <div className="enemy-stats-content">
            <h2 className="enemy-stats-header">🏆Victory!🏆</h2>
            <p>
              🎉Congratulations! <br></br>You've defeated<br></br> the Robot
              General!🎊
            </p>
          </div>
        ) : (
          <div className="enemy-stats-content">
            <h2 className="enemy-stats-header">
              {isBoss ? "💀Robot General" : "🤖Robot Soldier"}
            </h2>
            <p>🖤HP: {currentEnemy === 1 ? enemyHealth : bossHealth}</p>
            <p>
              ⚔️Strength: {currentEnemy === 1 ? enemyStrength : bossStrength}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
