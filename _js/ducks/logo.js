import { RESET } from "./global"
import generateState from "../lib/state"

const USE_BOX = "logo/USE_BOX";
const USE_FULL_LOGO = "logo/USE_FULL_LOGO";
const SET_POSITION = "logo/SET_POSITION";
const SET_SPIN = "logo/SET_SPIN";
const SET_INFINITE = "logo/SET_INFINITE";
const SET_SCALE = "logo/SET_SCALE";
const SET_VISIBILITY = "logo/SET_VISIBILITY";

const initialState = generateState({
  textLogo: false,
  spin: false,
  x: 0,
  y: 0,
  scale: 1,
  visible: true
});

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SET_POSITION:
      newState[action.targetScreen].x = action.x;
      newState[action.targetScreen].y = action.y;
    break;
    case SET_SCALE:
      newState[action.targetScreen].scale = action.scale;
    break;
    case SET_VISIBILITY:
      newState[action.targetScreen].visible = action.visible;
    break;
    case SET_SPIN:
      newState[action.targetScreen].spin = action.spin;
    break;
    case SET_INFINITE:
      newState[action.targetScreen].infinite = action.infinite;
      newState[action.targetScreen].spin = action.infinite;
    break;
    case USE_BOX:
      newState[action.targetScreen].textLogo = false;
    break;
    case USE_FULL_LOGO:
      newState[action.targetScreen].textLogo = true;
    break;
  }

  return newState;
}

export function showFullLogo() {
  return {type: USE_FULL_LOGO};
}

export function showOnlyBox() {
  return {type: USE_BOX};
}

export function setPosition(x, y) {
  return {type: SET_POSITION, x, y};
}

export function showLogo() {
  return {type: SET_VISIBILITY, visible: true}
}

export function hideLogo() {
  return {type: SET_VISIBILITY, visible: false}
}

export function setScale(scale) {
  return {type: SET_SCALE, scale};
}

export function startInfiniteSpin() {
  return { type: SET_INFINITE, infinite: true };
}

export function stopInfiniteSpin() {
  return { type: SET_INFINITE, infinite: false };
}

export function spin() {
  return {type: SET_SPIN, spin: true};
}
