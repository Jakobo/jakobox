import { RESET } from "./global"

const SET_URLS = "follows/SET_URLS";
const SET_FAKE_FOLLOWS = "follows/SET_FAKE_FOLLOWS";
const SET_SIZE = "follows/SET_SIZE";
const SET_POSITION = "follows/SET_POSITION";

const initialState = {
  fakeFollows: false,
  fakeUrl: "",
  liveURl: "",
  width: 0,
  height: 0,
  x: 0,
  y: 0
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SET_FAKE_FOLLOWS:
      newState.fakeFollows = action.enabled;
    break;
    case SET_URLS:
      newState.fakeUrl = action.fake;
      newState.liveUrl = action.live;
    break;
    case SET_SIZE:
      newState.width = action.width;
      newState.height = action.height;
    break;
    case SET_POSITION:
      newState.x = action.x;
      newState.y = action.y;
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

export function setUrls(fake, live) {
  return {type: SET_URLS, fake, live};
}

export function setSize(width, height) {
  return {type: SET_SIZE, width, height};
}

export function setPosition(x, y) {
  return {type: SET_POSITION, x, y};
}
