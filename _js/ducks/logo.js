import { RESET, SYNC } from "./global"
import generateState from "../lib/state"

const USE_BOX = "logo/USE_BOX";
const USE_FULL_LOGO = "logo/USE_FULL_LOGO";
const SET_POSITION = "logo/SET_POSITION";
const SET_SPIN = "logo/SET_SPIN";
const SET_INFINITE = "logo/SET_INFINITE";
const SET_SCALE = "logo/SET_SCALE";
const SET_VISIBILITY = "logo/SET_VISIBILITY";
const SET_CUBE = "logo/SET_CUBE";
const SET_B = "logo/SET_B";
const SET_TEXT = "logo/SET_TEXT";

const initialState = generateState({
  textLogo: false,
  spin: false,
  infinite: false,
  x: 0,
  y: 0,
  scale: 1,
  visible: true,
  cube: {
    stroke: "#000",
    fill: "#fff"
  },
  b: {
    stroke: "#000",
    fill: "#fff"
  },
  text: {
    stroke: "#000",
    fill: "#fff"
  }
},{
  brb: {
    x: 83,
    y: 343,
    scale: 3.8,
    textLogo: true,
    cube: {
      stroke: "#fff",
      fill: "#45548e"
    },
    b: {
      stroke: "rgba(255, 255, 255, 0.8)",
      fill: "#45548e"
    }
  },
  destiny: {
  },
  generic: {
    x: 8,
    y: 230,
    spin: true,
    infinite: true
  },
  incoming: {
    x: 83,
    y: 343,
    scale: 3.8,
    textLogo: true,
    cube: {
      stroke: "#fff",
      fill: "#2A2A5C"
    },
    b: {
      stroke: "#000",
      fill: "#151431"
    }
  },
  outgoing: {
    x: 83,
    y: 343,
    scale: 3.8,
    textLogo: true,
    cube: {
      stroke: "#fff",
      fill: "#2A2A5C"
    },
    b: {
      stroke: "#000",
      fill: "#151431"
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
      newState = Object.assign({}, action.newState.logo);
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
    case SET_CUBE:
      if (action.stroke) {
        newState[action.targetScreen].cube.stroke = action.stroke;
      }
      if (action.fill) {
        newState[action.targetScreen].cube.fill = action.fill;
      }
    break;
    case SET_B:
      if (action.stroke) {
        newState[action.targetScreen].b.stroke = action.stroke;
      }
      if (action.fill) {
        newState[action.targetScreen].b.fill = action.fill;
      }
    break;
    case SET_TEXT:
      if (action.stroke) {
        newState[action.targetScreen].text.stroke = action.stroke;
      }
      if (action.fill) {
        newState[action.targetScreen].text.fill = action.fill;
      }
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

export function stopSpin() {
  return {type: SET_SPIN, spin: false};
}

export function setCubeColor(stroke, fill) {
  return {type: SET_CUBE, stroke, fill};
}

export function setBColor(stroke, fill) {
  return {type: SET_B, stroke, fill};
}

export function setTextColor(stroke, fill) {
  return {type: SET_TEXT, stroke, fill};
}
