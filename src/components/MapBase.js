import React from "react";
import { connect } from "react-redux";
import "./MapBase.css";

const MapBase = ({ player, npc, isUp, isDown, isLeft, isRight }) => {
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
                        (isRight ? "player-right" : "")
                      }`
                    : ""
                } ${npc.x === colIndex && npc.y === rowIndex ? "npc" : ""}
                ${getBorderClass(rowIndex, colIndex)}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  player: state.player.player,
  npc: state.player.npc,
});

export default connect(mapStateToProps)(MapBase);
