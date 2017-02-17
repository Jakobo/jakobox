import { RESET } from "./global"

const SET_DEMO_PL = 'testdata/SET_DEMO_PL';

const initialState = {
  demoPlaylist: false
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SET_DEMO_PL:
      newState.demoPlaylist = action.enabled;
    break;
  }

  return newState;
}

export function enableDemoPlaylist() {
  return {type: SET_DEMO_PL, enabled: true};
}

export function disableDemoPlaylist() {
  return {type: SET_DEMO_PL, enabled: false};
}
