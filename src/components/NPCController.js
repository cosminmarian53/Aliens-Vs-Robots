import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MOVE_NPC } from "../actions/actionTypes";

const NPCController = ({ moveNPC }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      moveNPC();
    }, 1000); // Move NPC every second

    return () => clearInterval(interval);
  }, [moveNPC]);

  return null;
};

const mapDispatchToProps = (dispatch) => ({
  moveNPC: () => dispatch({ type: MOVE_NPC }),
});

export default connect(null, mapDispatchToProps)(NPCController);
