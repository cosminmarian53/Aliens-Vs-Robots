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

  const createMapMatrix = () => {
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      // First and last column
      matrix[i][0] = 1;
      matrix[i][size - 1] = 1;
    }
    for (let j = 0; j < size; j++) {
      // First and last row
      matrix[0][j] = 1;
      matrix[size - 1][j] = 1;
    }

    matrix[player.y][player.x] = 2;
    matrix[npc.y][npc.x] = 3;

    return matrix;
  };
  const matrix = createMapMatrix();

  const renderTable = (matrix) => {
    return matrix.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => {
          let className = "";

          if (cell === 1) {
            className = "map-border";
          } else if (cell === 2) {
            className = `${
              (isUp ? "player-up" : "") ||
              (isDown ? "player-down" : "") ||
              (isLeft ? "player-left" : "") ||
              (isRight ? "player-right" : "") ||
              "player"
            }`;
          } else if (cell === 3) {
            className = "npc";
          }

          return <div key={colIndex} className={`cell ${className}`}></div>;
        })}
      </div>
    ));
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
    const randomX = Math.floor(Math.random() * size - 1);
    const randomY = Math.floor(Math.random() * size - 1);
    npc.x = randomX;
    npc.y = randomY;
  };

  const respawnEnemy = () => {
    const randomX = Math.floor(Math.random() * size - 1);
    const randomY = Math.floor(Math.random() * size - 1);
    npc.x = randomX;
    npc.y = randomY;
    setEnemyHealth(100); // Reset enemy health to 100
    closeModal();
  };

  return (
    <div className="map-base-container">
      <div className="map-base-table">{renderTable(matrix)}</div>
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
