import { RESET } from "./global"
import generateState from "../lib/state"

const SET_BACKGROUND = "background/SET_BACKGROUND";

const initialState = generateState({
  background: "rgba(0,255,0,0)"
});

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SET_BACKGROUND:
      newState[action.targetScreen].background = action.background;
    break;
  }

  return newState;
}

export function setBackground(bg) {
  return {type: SET_BACKGROUND, background: bg};
}
