import { RESET, SYNC } from "./global"
import generateState from "../lib/state"

const SET_POSITION = "camera/SET_POSITION";
const SET_X_POSITION = "camera/SET_X_POSITION";
const SET_Y_POSITION = "camera/SET_Y_POSITION";
const SET_VISIBILITY = "camera/SET_VISIBILITY";
const SET_COLOR = "camera/SET_COLOR";
const SET_MAIN_COLOR = "camera/SET_MAIN_COLOR";
const SET_ACCENT_COLOR = "camera/SET_ACCENT_COLOR";

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
      newState[action.targetScreen].x = parseInt(action.x, 10);
      newState[action.targetScreen].y = parseInt(action.y, 10);
    break;
    case SET_X_POSITION:
      newState[action.targetScreen].x = parseInt(action.x, 10);
    break;
    case SET_Y_POSITION:
      newState[action.targetScreen].y = parseInt(action.y, 10);
    break;
    case SET_COLOR:
      newState[action.targetScreen].color.main = action.main;
      newState[action.targetScreen].color.accent = action.accent;
    break;
    case SET_MAIN_COLOR:
      newState[action.targetScreen].color.main = action.color;
    break;
    case SET_ACCENT_COLOR:
      newState[action.targetScreen].color.accent = action.color;
    break;
  }

  return newState;
}

export function setXPosition(x) {
  return {type: SET_X_POSITION, x};
}

export function setYPosition(y) {
  return {type: SET_Y_POSITION, y};
}

export function showCamera() {
  return {type: SET_VISIBILITY, show: true}
}

export function hideCamera() {
  return {type: SET_VISIBILITY, show: false}
}

export function setColor(main, accent) {
  return {type: SET_COLOR, main, accent};
}

export function setMainColor(color) {
  return {type: SET_MAIN_COLOR, color};
}

export function setAccentColor(color) {
  return {type: SET_ACCENT_COLOR, color};
}
