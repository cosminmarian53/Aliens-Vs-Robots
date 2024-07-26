import { useEffect } from "react";
import { connect } from "react-redux";
import { MOVE_NPC } from "../actions/actionTypes";
const NPCController = ({
  moveNPC,
  isModalOpen,
  attack,
  bossHealth,
  isBoss,
}) => {
  useEffect(() => {
    if (isModalOpen) {
      const attackInterval = setInterval(() => {
        document.querySelector(".modal-content").style.backgroundColor =
          "orange";
        setTimeout(() => {
          document.querySelector(".modal-content").style.backgroundColor =
            "red";
          if (typeof attack === "function") {
            attack();
          }
        }, 250);
      }, Math.random() * 2000 + 1000);

      return () => clearInterval(attackInterval);
    }
  }, [isModalOpen, attack]);

  useEffect(() => {
    if (isModalOpen) return;
    if (isBoss) {
      if (bossHealth === 0) return;
    }
    const getRandomInterval = Math.floor(Math.random() * 2000);
    const interval = setInterval(() => {
      moveNPC();
    }, getRandomInterval);

    return () => clearInterval(interval);
  }, [moveNPC, isModalOpen]);

  return;
};

const mapDispatchToProps = (dispatch) => ({
  moveNPC: () => dispatch({ type: MOVE_NPC }),
});

export default connect(null, mapDispatchToProps)(NPCController);
