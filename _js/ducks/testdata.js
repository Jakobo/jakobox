const SET_FAKE_FOLLOWS = 'testdata/FAKE_FOLLOWS';
const SET_DEMO_PL = 'testdata/SET_DEMO_PL';

const initialState = {
  fakeFollows: false,
  demoPlaylist: false
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_FAKE_FOLLOWS:
      newState.fakeFollows = action.enabled;
    break;
    case SET_DEMO_PL:
      newState.demoPlaylist = action.enabled;
    break;
  }

  return newState;
}

export function enableFakeFollows() {
  return {type: SET_FAKE_FOLLOWS, enabled: true};
}

export function disableFakeFollows() {
  return {type: SET_FAKE_FOLLOWS, enabled: false};
}

export function enableDemoPlaylist() {
  return {type: SET_DEMO_PL, enabled: true};
}

export function disableDemoPlaylist() {
  return {type: SET_DEMO_PL, enabled: false};
}
