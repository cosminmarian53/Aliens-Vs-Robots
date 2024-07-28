// actions.js
import {
  SET_SAFE_AREA,
  SET_SOLID_BLOCKS,
  SET_SAFE_AREA_BLOCKS,
} from "./actionTypes";

export const setSafeArea = (isSafeArea) => ({
  type: SET_SAFE_AREA,
  payload: isSafeArea,
});

export const setSolidBlocks = (blocks) => ({
  type: SET_SOLID_BLOCKS,
  payload: blocks,
});

export const setSafeAreaBlocks = (blocks) => ({
  type: SET_SAFE_AREA_BLOCKS,
  payload: blocks,
});
