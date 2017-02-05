const SET_BACKGROUND = 'testdata/SET_BACKGROUND';
const SET_FAKE_FOLLOWS = 'testdata/FAKE_FOLLOWS';

const initialState = {
  background: null,
  fakeFollows: false
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_BACKGROUND:
      newState.background = action.background;
    break;
    case SET_FAKE_FOLLOWS:
      newState.fakeFollows = action.enabled;
    break;
  }

  return newState;
}

export function setBackground(background) {
  return {type: SET_BACKGROUND, background};
}

export function enableFakeFollows() {
  return {type: SET_FAKE_FOLLOWS, true};
}

export function disableFakeFollows() {
  return {type: SET_FAKE_FOLLOWS, false};
}
