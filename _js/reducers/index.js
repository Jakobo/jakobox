import {
  REQUEST_COLORS, RECEIVE_COLORS
  } from "../actions";

const LOGO_STYLE_BOX = 0;
const LOGO_STYLE_TEXT = 1;

const initialState = {
  colors: {
    isFetching: false,
    isComplete: false,
    data: {
      cubeStrokeColor: "#000",
      cubeFillColor: "#fff",
      bStrokeColor: "#000",
      bFillColor: "#fff",
      textStrokeColor: "#000",
      textFillColor: "#fff"
    }
  },
  testing: {
    background: null,
    fakeFollows: false
  },
  camPosition: {
    x: 0,
    y: 0
  },
  logoPosition: {
    x: 0,
    y: 0
  },
  logoStyle: LOGO_STYLE_BOX,
  hasLowerThirds: false
};

function getColors(state, action) {
  if (action.type === REQUEST_COLORS) {
    return Object.assign({}, state, {
      isFetching: true
    });
  }
  else if (action.type === RECEIVE_COLORS) {
    return Object.assign({}, state, {
      isFetching: false,
      isComplete: true,
      data: action.data
    });
  }
  else {
    return state;
  }
}

export default function rootReducer(state = initialState, action) {
  return {
    colors: getColors(state.colors, action)
  };
}
