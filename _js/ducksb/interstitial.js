const SET_BACKGROUND = "interstitial/SET_BACKGROUND"
const SET_LOGO_CUBE_COLORS = "interstitial/SET_LOGO_CUBE_COLORS"
const SET_LOGO_TEXT_COLORS = "interstitial/SET_LOGO_TEXT_COLORS"
const SET_LOGO_B_COLORS = "interstitial/SET_LOGO_B_COLORS"

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
    background: "rgba(0,255,0,0)",
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
    case SET_BACKGROUND:
      newState.background = action.background;
    break;
    case SET_LOGO_CUBE_COLORS:
      newState.logo.cube.stroke = action.stroke || newState.logo.cube.stroke;
      newState.logo.cube.fill = action.fill || newState.logo.cube.fill;
    break;
    case SET_LOGO_B_COLORS:
      newState.logo.b.stroke = action.stroke || newState.logo.b.stroke;
      newState.logo.b.fill = action.fill || newState.logo.b.fill;
    break;
    case SET_LOGO_TEXT_COLORS:
      newState.logo.text.stroke = action.stroke || newState.logo.text.stroke;
      newState.logo.text.fill = action.fill || newState.logo.text.fill;
    break;
  }

  return newState;
}

export function setBackground(background) {
  return {type: SET_BACKGROUND, background};
}

export function setLogoCubeColors(stroke, fill) {
  return {type: SET_LOGO_CUBE_COLORS, stroke, fill}
}

export function setLogoTextColors(stroke, fill) {
  return {type: SET_LOGO_TEXT_COLORS, stroke, fill}
}

export function setLogoBColors(stroke, fill) {
  return {type: SET_LOGO_B_COLORS, stroke, fill}
}

export function setCameraColors(main, accent) {
  return {type: SET_CAMERA_COLORS, main, accent}
}
