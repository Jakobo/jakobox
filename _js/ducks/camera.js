const SET_POSITION = "camera/SET_POSITION";

import { setCameraColor } from "./color"

const initialState = {
  x: 0,
  y: 0
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_POSITION:
      newState.x = action.x;
      newState.y = action.y;
    break;
  }

  return newState;
}

export function setPosition(x, y) {
  return {type: SET_POSITION, x, y};
}

// color of camera is handled in the color domain
export function setColors(color, accent) {
  return setCameraColor(color, accent);
}
