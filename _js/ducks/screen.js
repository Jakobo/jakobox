import { RESET } from "./global"

const SET_SCREEN = 'screen/SET_SCREEN';

const initialState = {
  current: null
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      // screen does not reset on global reset
      // newState = Object.assign({}, initialState);
    break;
    case SET_SCREEN:
      newState.current = action.screen;
    break;
  }

  return newState;
}

export function setScreen(screen) {
  return {type: SET_SCREEN, screen};
}
