import { setCameraColor } from "./color"
import { RESET } from "./global"

const SET_POSITION = "camera/SET_POSITION";
const SET_VISIBILITY = "camera/SET_VISIBILITY";

const initialState = {
  x: 0,
  y: 0,
  visible: true
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SET_VISIBILITY:
      newState.visible = action.show;
    break;
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

export function showCamera() {
  return {type: SET_VISIBILITY, show: true}
}

export function hideCamera() {
  return {type: SET_VISIBILITY, show: false}
}

// color of camera is handled in the color domain
export function setColors(color, accent) {
  return setCameraColor(color, accent);
}
