const SET_POSITION = "camera/SET_POSITION";
const SET_COLORS = "camera/SET_COLORS";

const initialState = {
  x: 0,
  y: 0,
  color: "#fff",
  accent: "#fff"
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_POSITION:
      newState.x = action.x;
      newState.y = action.y;
    break;
    case SET_COLORS:
      newState.color = action.color;
      newState.accent = action.accent;
    break;
  }

  return newState;
}

export function setPosition(x, y) {
  return {type: SET_POSITION, x, y};
}

export function setColors(color, accent) {
  return {type: SET_COLORS, color, accent};
}
