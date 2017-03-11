import { RESET, SYNC } from "./global"
import generateState from "../lib/state"

import {ticker as destinyTicker} from "./lowerthirds/destiny"

const SHOW_LOWER_THIRDS = "lowerthirds/SHOW_LOWER_THIRDS";
const HIDE_LOWER_THIRDS = "lowerthirds/HIDE_LOWER_THIRDS";
const SET_CURRENT_PLAYLIST = "lowerthirds/SET_CURRENT_PLAYLIST";
const SET_TICKER_ITEMS = "lowerthirds/SET_TICKER_ITEMS";
const SET_TICKER_SIZE = "lowerthirds/SET_TICKER_SIZE";
const SET_TICKER_SHUFFLE = "lowerthirds/SET_TICKER_SHUFFLE";

const initialState = generateState({
  visible: false,
  currentPlaylist: "normal",
  availablePlaylists: ["normal"],
  ticker: {
    items: [],
    subset: 1,
    shuffle: true
  }
}, {
  destiny: {
    visible: true,
    currentPlaylist: "normal",
    availablePlaylists: ["normal", "demo"],
    ticker: {
      subset: 3,
      shuffle: true,
      items: destinyTicker
    }
  }
});

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SYNC:
      newState = Object.assign({}, action.newState.lowerthirds);
    break;
    case SHOW_LOWER_THIRDS:
      newState[action.targetScreen].visible = true;
    break;
    case HIDE_LOWER_THIRDS:
      newState[action.targetScreen].visible = false;
    break;
    case SET_CURRENT_PLAYLIST:
      newState[action.targetScreen].currentPlaylist = action.name;
    break;
    case SET_TICKER_ITEMS:
      newState[action.targetScreen].ticker.items = action.items;
    break;
    case SET_TICKER_SIZE:
      newState[action.targetScreen].ticker.subset = action.size;
    break;
    case SET_TICKER_SHUFFLE:
      newState[action.targetScreen].ticker.shuffle = action.shuffle;
    break;
  }

  return newState;
}

export function showLowerThirds() {
  return {type: SHOW_LOWER_THIRDS};
}

export function hideLowerThirds() {
  return {type: HIDE_LOWER_THIRDS};
}

export function setCurrentPlaylist(name) {
  return {type: SET_CURRENT_PLAYLIST, name}
}

export function setTickerItems(items) {
  return {type: SET_TICKER_ITEMS, items}
}

export function setTickerSize(size) {
  return {type: SET_TICKER_SIZE, size}
}

export function enableTickerShuffle() {
  return {type: SET_TICKER_SHUFFLE, shuffle: true}
}

export function disableTickerShuffle() {
  return {type: SET_TICKER_SHUFFLE, shuffle: false}
}
