import {
  INCREMENT_X,
  DECREMENT_X,
  INCREMENT_Y,
  DECREMENT_Y,
  MOVE_NPC,
} from "../actions/actionTypes";

const initialState = {
  player: { x: 2, y: 1 },
  npc: { x: 7, y: 8 },
  solidBlocks: [
    { x: 4, y: 6 },
    // add more random located blocks
    { x: 1, y: 3 },
    { x: 5, y: 5 },
    { x: 8, y: 2 },
    { x: 8, y: 6 },
    { x: 3, y: 8 },
    { x: 6, y: 1 },
    { x: 2, y: 4 },
    { x: 7, y: 7 },
    { x: 4, y: 2 },
  ],
};
const isSolidBlock = (x, y, solidBlocks) => {
  return solidBlocks.some((block) => block.x === x && block.y === y);
};

const size = 10;

const getRandomMove = (position) => {
  const moves = [-1, 1];
  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  return position + randomMove;
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_X: {
      const newX =
        state.player.x < size - 2 ? state.player.x + 1 : state.player.x;
      if (isSolidBlock(newX, state.player.y, state.solidBlocks)) {
        return state; // No movement if there's a solid block
      }
      return {
        ...state,
        player: {
          ...state.player,
          x: newX,
        },
      };
    }
    case DECREMENT_X: {
      const newX = state.player.x > 1 ? state.player.x - 1 : state.player.x;
      if (isSolidBlock(newX, state.player.y, state.solidBlocks)) {
        return state; // No movement if there's a solid block
      }
      return {
        ...state,
        player: {
          ...state.player,
          x: newX,
        },
      };
    }
    case INCREMENT_Y: {
      const newY =
        state.player.y < size - 2 ? state.player.y + 1 : state.player.y;
      if (isSolidBlock(state.player.x, newY, state.solidBlocks)) {
        return state; // No movement if there's a solid block
      }
      return {
        ...state,
        player: {
          ...state.player,
          y: newY,
        },
      };
    }
    case DECREMENT_Y: {
      const newY = state.player.y > 1 ? state.player.y - 1 : state.player.y;
      if (isSolidBlock(state.player.x, newY, state.solidBlocks)) {
        return state; // No movement if there's a solid block
      }
      return {
        ...state,
        player: {
          ...state.player,
          y: newY,
        },
      };
    }
    case MOVE_NPC: {
      const newX = getRandomMove(state.npc.x);
      const newY = getRandomMove(state.npc.y);

      // Check if the new position is within bounds, not a solid block, and not the door
      const isValidMove =
        newX > 0 &&
        newX < size - 1 &&
        newY > 0 &&
        newY < size - 1 &&
        !isSolidBlock(newX, newY, state.solidBlocks) &&
        !(newX === 8 && newY === 5); // Exclude the door position

      if (!isValidMove) {
        return state; // No movement if the new position is invalid, there's a solid block, or it's the door
      }

      return {
        ...state,
        npc: {
          x: newX,
          y: newY,
        },
      };
    }
    default:
      return state;
  }
};
export default playerReducer;
