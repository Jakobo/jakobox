const USE_BOX = "logo/USE_BOX";
const USE_FULL_LOGO = "logo/USE_FULL_LOGO";
const SET_POSITION = "logo/SET_POSITION";

const initialState = {
  onlyBox: false,
  x: 0,
  y: 0
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_POSITION:
      newState.x = action.x;
      newState.y = action.y;
    break;
    case USE_BOX:
      newState.onlyBox = true;
    break;
    case USE_FULL_LOGO:
      newState.onlyBox = false;
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
