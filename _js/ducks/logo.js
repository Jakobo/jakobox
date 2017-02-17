import { RESET } from "./global"

const USE_BOX = "logo/USE_BOX";
const USE_FULL_LOGO = "logo/USE_FULL_LOGO";
const SET_POSITION = "logo/SET_POSITION";
const SET_SPIN = "logo/SET_SPIN";
const SET_INFINITE = "logo/SET_INFINITE";
const SET_SCALE = "logo/SET_SCALE";
const SET_VISIBILITY = "logo/SET_VISIBILITY";

const initialState = {
  textLogo: false,
  spin: false,
  x: 0,
  y: 0,
  scale: 1,
  visible: true
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SET_POSITION:
      newState.x = action.x;
      newState.y = action.y;
    break;
    case SET_SCALE:
      newState.scale = action.scale;
    break;
    case SET_VISIBILITY:
      newState.visible = action.visible;
    break;
    case SET_SPIN:
      newState.spin = action.spin;
    break;
    case SET_INFINITE:
      newState.infinite = action.infinite;
      newState.spin = action.infinite;
    break;
    case USE_BOX:
      newState.textLogo = false;
    break;
    case USE_FULL_LOGO:
      newState.textLogo = true;
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
