import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./MapBase.css";
import Modal from "./Modal";

const MapBase = ({
  player,
  npc,
  isUp,
  isDown,
  isLeft,
  isRight,
  isModalOpen,
  setIsModalOpen,
  playerHealth,
  setPlayerHealth,
  enemyHealth,
  setEnemyHealth,
  playerStrength,
  setPlayerStrength,
  enemyStrength,
  setEnemyStrength,
}) => {
  const size = 10;
  const rows = Array(size).fill(null);
  const cols = Array(size).fill(null);

  const getBorderClass = (rowIndex, colIndex) => {
    if (rowIndex === 0) return "border border-top";
    if (rowIndex === size - 1) return "border border-bottom";
    if (colIndex === 0) return "border border-left";
    if (colIndex === size - 1) return "border border-right";
    return "";
  };

  useEffect(() => {
    if (player.x === npc.x && player.y === npc.y) {
      setIsModalOpen(true);
    }
  }, [player, npc, setIsModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isModalOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const respawnEnemy = () => {
    const randomX = Math.floor(Math.random() * size);
    const randomY = Math.floor(Math.random() * size);
    npc.x = randomX;
    npc.y = randomY;
    setEnemyHealth(100); // Reset enemy health to 100
    closeModal();
  };
  return (
    <div className="map-base-container">
      <div className="map-base-table">
        {rows.map((_, rowIndex) => (
          <div key={rowIndex} className="row">
            {cols.map((_, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  player.x === colIndex && player.y === rowIndex
                    ? `${
                        (isUp ? "player-up" : "") ||
                        (isDown ? "player-down" : "") ||
                        (isLeft ? "player-left" : "") ||
                        (isRight ? "player-right" : "") ||
                        "player"
                      }`
                    : ""
                } ${npc.x === colIndex && npc.y === rowIndex ? "npc" : ""}
                ${getBorderClass(rowIndex, colIndex)}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <Modal
          playerHealth={playerHealth}
          setPlayerHealth={setPlayerHealth}
          enemyHealth={enemyHealth}
          setEnemyHealth={setEnemyHealth}
          playerStrength={playerStrength}
          enemyStrength={enemyStrength}
          closeModal={closeModal}
          respawnEnemy={respawnEnemy}
          setPlayerStrength={setPlayerStrength}
          setEnemyStrength={setEnemyStrength}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  player: state.player.player,
  npc: state.player.npc,
});

export default connect(mapStateToProps)(MapBase);
