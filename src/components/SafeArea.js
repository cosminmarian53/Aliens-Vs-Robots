import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./MapBase.css";
import Typewriter from "./Typewritter";

const SafeArea = ({
  player,
  isUp,
  isDown,
  isLeft,
  isRight,
  isModalOpen,
  talkCounter,
  setTalkCounter,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const dialogues = [
    "Welcome to the safe area, soldier!Thank you for saving me! I was able to run and hide from the robot invaders. This is my sanctuary, you can rest here and prepare for your next mission. Remember, the fate of the galaxy is in your hands!",
    "You can rest here and prepare for your next mission. Remember, the fate of the galaxy is in your hands!",
    "Also, don't forget to finish your quests in order to get rewards!",
  ];

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
    // Player
    matrix[player.y][player.x] = 2;
    // solid blocks-safe area-npc and tower
    matrix[1][3] = 4;
    matrix[2][3] = 13;
    matrix[2][6] = 13;
    matrix[1][6] = 4;
    matrix[1][4] = 14;
    matrix[1][5] = 15;
    matrix[6][6] = 13;
    matrix[5][6] = 4;
    matrix[6][3] = 13;
    matrix[5][3] = 4;
    // water decoration-first column
    matrix[1][1] = 16;
    matrix[2][1] = 16;
    matrix[3][1] = 16;
    matrix[4][1] = 16;
    matrix[5][1] = 16;
    matrix[6][1] = 16;
    matrix[7][1] = 16;
    matrix[8][1] = 16;
    // water decoration-last column
    matrix[1][8] = 16;
    matrix[2][8] = 16;
    matrix[3][8] = 16;
    matrix[4][8] = 16;
    matrix[5][8] = 16;
    matrix[6][8] = 16;
    matrix[7][8] = 16;
    matrix[8][8] = 16;
    // water decoration-last row
    matrix[8][2] = 16;
    matrix[8][3] = 16;
    matrix[8][4] = 16;
    matrix[8][5] = 16;
    matrix[8][6] = 16;
    matrix[8][7] = 16;
    matrix[8][8] = 16;
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
          } else if (cell === 4) {
            className = "tower-upper";
          } else if (cell === 13) {
            className = "tower-lower";
          } else if (cell === 14) {
            className = "xeno-npc";
          } else if (cell === 15) {
            className = "egg-decoration";
          } else if (cell === 16) {
            className = "water-decoration";
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === " " && player.x === 4 && player.y === 2) {
        setModalOpen(true);
        setTalkCounter((prevCounter) => prevCounter + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [player]);

  return (
    <div className="map-base-container">
      <div className="map-base-table">{renderTable(matrix)}</div>
      {modalOpen && (
        <div className="modal-safe-area">
          <div className="modal-content-safe-area">
            <div className="alien-npc-box">
              <div className="alien-npc-wrapper">
                <h2 className="alien-npc-name">Alien General X.E.N.O</h2>
                <div className="alien-npc-image"></div>
                <div className="alien-npc-dialogue">
                  <Typewriter
                    text={
                      talkCounter >= 3
                        ? dialogues[2]
                        : talkCounter >= 2
                        ? dialogues[1]
                        : dialogues[0]
                    }
                    speed={50}
                    wordsPerLine={20}
                  />
                </div>
              </div>
              <button
                className="close-modal-btn"
                onClick={() => {
                  setModalOpen(!modalOpen);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  player: state.player.player,
  safeAreaBlocks: state.player.safeAreaBlocks,
  isSafeArea: state.player.isSafeArea,
});

export default connect(mapStateToProps)(SafeArea);
