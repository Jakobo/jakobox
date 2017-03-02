import { RESET, SYNC } from "./global"
import generateState from "../lib/state"

const SET_POSITION = "camera/SET_POSITION";
const SET_VISIBILITY = "camera/SET_VISIBILITY";
const SET_COLOR = "camera/SET_COLOR";

const initialState = generateState({
  x: 0,
  y: 0,
  visible: true,
  color: {
    main: "#fff",
    accent: "#fff"
  }
}, {
  destiny: {
    x: 3,
    y: 460,
    color: {
      main: "#2a3f56",
      accent: "#df8926"
    }
  }
});

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SYNC:
      newState = Object.assign({}, action.newState.camera);
    break;
    case SET_VISIBILITY:
      newState[action.targetScreen].visible = action.show;
    break;
    case SET_POSITION:
      newState[action.targetScreen].x = action.x;
      newState[action.targetScreen].y = action.y;
    break;
    case SET_COLOR:
      newState[action.targetScreen].color.main = action.main;
      newState[action.targetScreen].color.accent = action.accent;
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

export function setColor(main, accent) {
  return {type: SET_CAMERA, main, accent};
}
