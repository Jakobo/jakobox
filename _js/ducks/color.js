import { RESET } from "./global"

const SET_CUBE = "color/SET_CUBE";
const SET_B = "color/SET_B";
const SET_TEXT = "color/SET_TEXT";
const SET_CAMERA = "color/SET_CAMERA";

const initialState = {
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
  },
  camera: {
    main: "#fff",
    accent: "#fff"
  }
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SET_CUBE:
      newState.cube.stroke = action.stroke;
      newState.cube.fill = action.fill;
    break;
    case SET_B:
      newState.b.stroke = action.stroke;
      newState.b.fill = action.fill;
    break;
    case SET_TEXT:
      newState.text.stroke = action.stroke;
      newState.text.fill = action.fill;
    break;
    case SET_CAMERA:
      newState.camera.main = action.main;
      newState.camera.accent = action.accent;
    break;
  }

  return newState;
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

export function setCameraColor(main, accent) {
  return {type: SET_CAMERA, main, accent};
}
