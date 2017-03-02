import { RESET } from "./global"

export const SET_SCREEN = "local/screen/SET_SCREEN";

const initialState = {
  current: null
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_SCREEN:
      newState.current = action.screen;
    break;
  }

  return newState;
}

export function setScreen(screen) {
  return {type: SET_SCREEN, screen, targetScreen: screen};
}
