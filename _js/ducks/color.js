const SET_CUBE = 'color/SET_CUBE';
const SET_B = 'color/SET_CUBE';
const SET_TEXT = 'color/SET_CUBE';

const initialState = {
  cubeStrokeColor: "#000",
  cubeFillColor: "#fff",
  bStrokeColor: "#000",
  bFillColor: "#fff",
  textStrokeColor: "#000",
  textFillColor: "#fff"
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_CUBE:
      newState.cubeStrokeColor = action.stroke;
      newState.cubeFillColor = action.fill;
    break;
    case SET_B:
      newState.bStrokeColor = action.stroke;
      newState.bFillColor = action.fill;
    break;
    case SET_TEXT:
      newState.textStrokeColor = action.stroke;
      newState.textFillColor = action.fill;
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
