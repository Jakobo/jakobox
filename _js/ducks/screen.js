import { RESET } from "./global"

export const SET_SCREEN = "screen/SET_SCREEN";
export const SET_ADMIN_TARGET = "screen/SET_ADMIN_TARGET";

const initialState = {
  current: null,
  adminTarget: "generic",
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_SCREEN:
      newState.current = action.screen;
    break;
    case SET_ADMIN_TARGET:
      newState.adminTarget = action.screen;
    break;
  }

  return newState;
}

export function setScreen(screen) {
  return {type: SET_SCREEN, screen, targetScreen: screen};
}

export function setAdminTarget(screen) {
  return {type: SET_ADMIN_TARGET, screen};
}
