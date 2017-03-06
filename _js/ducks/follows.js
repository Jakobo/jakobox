import { RESET, SYNC } from "./global"
import generateState from "../lib/state"

const SET_URLS = "follows/SET_URLS";
const SET_LIVE_URL = "follows/SET_LIVE_URL";
const SET_FAKE_URL = "follows/SET_FAKE_URL";
const SET_FAKE_FOLLOWS = "follows/SET_FAKE_FOLLOWS";
const SET_SIZE = "follows/SET_SIZE";
const SET_WIDTH = "follows/SET_WIDTH";
const SET_HEIGHT = "follows/SET_HEIGHT";
const SET_POSITION = "follows/SET_POSITION";
const SET_X_POSITION = "follows/SET_X_POSITION";
const SET_Y_POSITION = "follows/SET_Y_POSITION";
const HIDE_FOLLOWS = "follows/HIDE_FOLLOWS";
const SHOW_FOLLOWS = "follows/SHOW_FOLLOWS";

const initialState = generateState({
  visible: true,
  fakeFollows: false,
  fakeUrl: "",
  liveURl: "",
  width: 0,
  height: 0,
  x: 0,
  y: 0
}, {
  destiny: {
    x: 1238,
    y: 283,
    width: 682,
    height: 210,
    fakeUrl: "http://u.muxy.io/dashboard/alerts/demo/g9djjNHgai340bmM76i2Fhfe5nyiMKSX",
    liveUrl: "http://a.muxy.io/alert/jakobox/srX-UDXTDVsAURa8mWWdPkAVxz0NA94E"
  }
});

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SYNC:
      newState = Object.assign({}, action.newState.follows);
    break;
    case SET_FAKE_FOLLOWS:
      newState[action.targetScreen].fakeFollows = action.enabled;
    break;
    case SET_URLS:
      newState[action.targetScreen].fakeUrl = action.fake;
      newState[action.targetScreen].liveUrl = action.live;
    break;
    case SET_LIVE_URL:
      newState[action.targetScreen].liveUrl = action.live;
    break;
    case SET_FAKE_URL:
      newState[action.targetScreen].fakeUrl = action.fake;
    break;
    case SET_SIZE:
      newState[action.targetScreen].width = action.width;
      newState[action.targetScreen].height = action.height;
    break;
    case SET_WIDTH:
      newState[action.targetScreen].width = action.width;
    break;
    case SET_HEIGHT:
      newState[action.targetScreen].height = action.height;
    break;
    case SET_POSITION:
      newState[action.targetScreen].x = action.x;
      newState[action.targetScreen].y = action.y;
    break;
    case SET_X_POSITION:
      newState[action.targetScreen].x = action.x;
    break;
    case SET_Y_POSITION:
      newState[action.targetScreen].y = action.y;
    break;
    case HIDE_FOLLOWS:
      newState[action.targetScreen].visible = false;
    break;
    case SHOW_FOLLOWS:
      newState[action.targetScreen].visible = true;
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

export function setLiveUrl(live) {
  return {type: SET_LIVE_URL, live};
}

export function setFakeUrl(fake) {
  return {type: SET_FAKE_URL, fake};
}

export function setSize(width, height) {
  return {type: SET_SIZE, width, height};
}

export function setWidth(width) {
  return {type: SET_WIDTH, width};
}

export function setHeight(height) {
  return {type: SET_HEIGHT, height};
}

export function setPosition(x, y) {
  return {type: SET_POSITION, x, y};
}

export function setXPosition(x) {
  return {type: SET_X_POSITION, x};
}

export function setYPosition(y) {
  return {type: SET_Y_POSITION, y};
}

export function showFollows() {
  return {type: SHOW_FOLLOWS};
}

export function hideFollows() {
  return {type: HIDE_FOLLOWS};
}
