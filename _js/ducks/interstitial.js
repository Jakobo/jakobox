const SET_BRB_BACKGROUND = "interstitial/SET_BRB_BACKGROUND"
const SET_BRB_LOGO_CUBE_COLORS = "interstitial/SET_BRB_LOGO_CUBE_COLORS"
const SET_BRB_LOGO_TEXT_COLORS = "interstitial/SET_BRB_LOGO_TEXT_COLORS"
const SET_BRB_LOGO_B_COLORS = "interstitial/SET_BRB_LOGO_B_COLORS"
const SET_INOUT_BACKGROUND = "interstitial/SET_INOUT_BACKGROUND"
const SET_INOUT_LOGO_CUBE_COLORS = "interstitial/SET_INOUT_LOGO_CUBE_COLORS"
const SET_INOUT_LOGO_TEXT_COLORS = "interstitial/SET_INOUT_LOGO_TEXT_COLORS"
const SET_INOUT_LOGO_B_COLORS = "interstitial/SET_INOUT_LOGO_B_COLORS"

const initialState = {
  brb: {
    background: "rgba(0,255,0,0)",
    logo: {
      visible: true,
      x: 83,
      y: 343,
      scale: 3.8,
      textLogo: true,
      cube: { stroke: "#fff", fill: "#45548e" },
      b: { stroke: "rgba(255, 255, 255, 0.8)", fill: "#45548e" },
      text: { stroke: "#000", fill: "#fff" }
    }
  },
  startStop: {
    background: "rgba(255,255,255,1)",
    logo: {
      visible: true,
      x: 83,
      y: 343,
      scale: 3.8,
      textLogo: true,
      cube: { stroke: "#fff", fill: "#2A2A5C" },
      b: { stroke: "#000", fill: "#151431" },
      text: { stroke: "#000", fill: "#fff" }
    }
  }
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_BRB_BACKGROUND:
      newState.brb.background = action.background;
    break;
    case SET_INOUT_BACKGROUND:
      newState.startStop.background = action.background;
    break;
    case SET_BRB_LOGO_CUBE_COLORS:
      newState.brb.logo.cube.stroke = action.stroke || newState.brb.logo.cube.stroke;
      newState.brb.logo.cube.fill = action.fill || newState.brb.logo.cube.fill;
    break;
    case SET_INOUT_LOGO_CUBE_COLORS:
      newState.startStop.logo.cube.stroke = action.stroke || newState.startStop.logo.cube.stroke;
      newState.startStop.logo.cube.fill = action.fill || newState.startStop.logo.cube.fill;
    break;
    case SET_BRB_LOGO_B_COLORS:
      newState.brb.logo.b.stroke = action.stroke || newState.brb.logo.b.stroke;
      newState.brb.logo.b.fill = action.fill || newState.brb.logo.b.fill;
    break;
    case SET_INOUT_LOGO_B_COLORS:
      newState.startStop.logo.b.stroke = action.stroke || newState.startStop.logo.b.stroke;
      newState.startStop.logo.b.fill = action.fill || newState.startStop.logo.b.fill;
    break;
    case SET_BRB_LOGO_TEXT_COLORS:
      newState.brb.logo.text.stroke = action.stroke || newState.brb.logo.text.stroke;
      newState.brb.logo.text.fill = action.fill || newState.brb.logo.text.fill;
    break;
    case SET_INOUT_LOGO_TEXT_COLORS:
      newState.startStop.logo.text.stroke = action.stroke || newState.startStop.logo.text.stroke;
      newState.startStop.logo.text.fill = action.fill || newState.startStop.logo.text.fill;
    break;
  }

  return newState;
}

export function setBrbBackground(background) {
  return {type: SET_BRB_BACKGROUND, background};
}

export function setBrbLogoCubeColors(stroke, fill) {
  return {type: SET_BRB_LOGO_CUBE_COLORS, stroke, fill}
}

export function setBrbLogoTextColors(stroke, fill) {
  return {type: SET_BRB_LOGO_TEXT_COLORS, stroke, fill}
}

export function setBrbLogoBColors(stroke, fill) {
  return {type: SET_BRB_LOGO_B_COLORS, stroke, fill}
}

export function setInOutBackground(background) {
  return {type: SET_INOUT_BACKGROUND, background};
}

export function setInOutLogoCubeColors(stroke, fill) {
  return {type: SET_INOUT_LOGO_CUBE_COLORS, stroke, fill}
}

export function setInOutLogoTextColors(stroke, fill) {
  return {type: SET_INOUT_LOGO_TEXT_COLORS, stroke, fill}
}

export function setInOutLogoBColors(stroke, fill) {
  return {type: SET_INOUT_LOGO_B_COLORS, stroke, fill}
}
