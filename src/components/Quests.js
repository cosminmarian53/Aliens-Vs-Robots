function Quests({ bossHealth, talkCounter, enemyDeathCounter }) {
  const completedStyle = {
    color: "limegreen",
    textDecoration: "line-through",
  };

  const inProgressStyle = {
    color: "red",
  };

  return (
    <div className="quest-container">
      <div className="quest-content">
        <h1>📖Quests</h1>
        <p style={enemyDeathCounter >= 1 ? completedStyle : inProgressStyle}>
          1. Defeat the enemy
        </p>
        <p style={bossHealth <= 0 ? completedStyle : inProgressStyle}>
          2. Defeat the boss
        </p>
        <p style={talkCounter > 0 ? completedStyle : inProgressStyle}>
          3. Talk to the NPC
        </p>
      </div>
    </div>
  );
}

export default Quests;
