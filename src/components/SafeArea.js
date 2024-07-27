import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./MapBase.css";
const SafeArea = ({
  player,
  npc,
  safeAreaSolidBlocks,
  isUp,
  isDown,
  isLeft,
  isRight,
  isModalOpen,
}) => {
  const size = 10;
  const createMapMatrix = () => {
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    for (let i = 0; i < size; i++) {
      // First and last column
      matrix[i][0] = 1;
      matrix[i][size - 1] = 9;
    }
    for (let j = 0; j < size; j++) {
      // First and last row
      matrix[0][j] = 8;
      matrix[size - 1][j] = 7;
    }
    // define corners of border
    matrix[0][0] = 11;
    matrix[0][size - 1] = 12;
    matrix[size - 1][0] = 10;
    matrix[size - 1][size - 1] = 6;
    // PLayer
    matrix[player.y][player.x] = 2;
    // // solid blocks
    // safeAreaSolidBlocks.forEach((block) => {
    //   matrix[block.y][block.x] = 4;
    // });
    return matrix;
  };

  const matrix = createMapMatrix();

  const renderTable = (matrix) => {
    return matrix.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => {
          let className = "";

          if (cell === 1) {
            className = "safe-zone-border-pipeline";
          } else if (cell === 2) {
            className = `${
              (isUp ? "player-up" : "") ||
              (isDown ? "player-down" : "") ||
              (isLeft ? "player-left" : "") ||
              (isRight ? "player-right" : "") ||
              "player"
            }`;
          } else if (cell === 4) {
            className = "solid-block";
          } else if (cell === 11) {
            className = "safe-zone-border-pipeline-left-up";
          } else if (cell === 7) {
            className = "safe-zone-border-pipeline-bottom";
          } else if (cell === 8) {
            className = "safe-zone-border-pipeline-top";
          } else if (cell === 9) {
            className = "safe-zone-border-pipeline-right";
          } else if (cell === 12) {
            className = "safe-zone-border-pipeline-right-up";
          } else if (cell === 10) {
            className = "safe-zone-border-pipeline-left-bottom";
          } else if (cell === 6) {
            className = "safe-zone-border-pipeline-right-bottom";
          }

          return (
            <div
              key={colIndex}
              className={`cell safe-zone-tile ${className}`}
            ></div>
          );
        })}
      </div>
    ));
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isModalOpen]);

  return (
    <div className="map-base-container">
      <div className="map-base-table">{renderTable(matrix)}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  player: state.player.player,
  npc: state.player.npc,
});

export default connect(mapStateToProps)(SafeArea);
