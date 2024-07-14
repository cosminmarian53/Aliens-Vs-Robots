import {
  INCREMENT_X,
  DECREMENT_X,
  INCREMENT_Y,
  DECREMENT_Y,
  MOVE_NPC,
} from "../actions/actionTypes";

const initialState = {
  player: { x: 4, y: 4 },
  npc: { x: 5, y: 5 },
};

const size = 10;

const getRandomMove = (position) => {
  const moves = [-1, 1];
  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  return position + randomMove;
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_X:
      return {
        ...state,
        player: {
          ...state.player,
          x: state.player.x < size - 2 ? state.player.x + 1 : state.player.x,
        },
      };
    case DECREMENT_X:
      return {
        ...state,
        player: {
          ...state.player,
          x: state.player.x > 1 ? state.player.x - 1 : state.player.x,
        },
      };
    case INCREMENT_Y:
      return {
        ...state,
        player: {
          ...state.player,
          y: state.player.y < size - 2 ? state.player.y + 1 : state.player.y,
        },
      };
    case DECREMENT_Y:
      return {
        ...state,
        player: {
          ...state.player,
          y: state.player.y > 1 ? state.player.y - 1 : state.player.y,
        },
      };
    case MOVE_NPC:
      const newX = getRandomMove(state.npc.x);
      const newY = getRandomMove(state.npc.y);
      return {
        ...state,
        npc: {
          x: newX > 0 && newX < size - 1 ? newX : state.npc.x,
          y: newY > 0 && newY < size - 1 ? newY : state.npc.y,
        },
      };
    default:
      return state;
  }
};

export default playerReducer;
