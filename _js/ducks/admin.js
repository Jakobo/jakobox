export const SET_SCREEN = "local/admin/SET_SCREEN";
export const SET_COMPONENT = "local/admin/SET_COMPONENT";

const initialState = {
  screen: "generic",
  component: "cam"
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_SCREEN:
      newState.screen = action.screen;
    break;
    case SET_COMPONENT:
      newState.component = action.component;
    break;
  }

  return newState;
}

export function setScreen(screen) {
  return {type: SET_SCREEN, screen};
}

export function setComponent(component) {
  return {type: SET_COMPONENT, component};
}
