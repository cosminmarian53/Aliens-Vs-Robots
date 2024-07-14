import {
  INCREMENT_X,
  DECREMENT_X,
  INCREMENT_Y,
  DECREMENT_Y,
} from "../actions/actionTypes";

const initialState = {
  x: 4,
  y: 4,
};

const size = 10;

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_X:
      return state.x < size - 2 ? { ...state, x: state.x + 1 } : state;
    case DECREMENT_X:
      return state.x > 1 ? { ...state, x: state.x - 1 } : state;
    case INCREMENT_Y:
      return state.y < size - 2 ? { ...state, y: state.y + 1 } : state;
    case DECREMENT_Y:
      return state.y > 1 ? { ...state, y: state.y - 1 } : state;
    default:
      return state;
  }
};

export default playerReducer;
