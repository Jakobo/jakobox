import { RESET } from "./global"

const SHOW_LOWER_THIRDS = "lowerthirds/SHOW_LOWER_THIRDS";
const HIDE_LOWER_THIRDS = "lowerthirds/HIDE_LOWER_THIRDS";
const SET_CURRENT_PLAYLIST = "lowerthirds/SET_CURRENT_PLAYLIST";
const SET_TICKER_ITEMS = "lowerthirds/SET_TICKER_ITEMS";
const SET_TICKER_SIZE = "lowerthirds/SET_TICKER_SIZE";
const SET_TICKER_SHUFFLE = "lowerthirds/SET_TICKER_SHUFFLE";

const initialState = {
  visible: false,
  currentPlaylist: "",
  ticker: {
    items: [],
    subset: 1,
    shuffle: true
  }
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SHOW_LOWER_THIRDS:
      newState.visible = true;
    break;
    case HIDE_LOWER_THIRDS:
      newState.visible = false;
    break;
    case SET_CURRENT_PLAYLIST:
      newState.currentPlaylist = action.name;
    break;
    case SET_TICKER_ITEMS:
      newState.ticker.items = action.items;
    break;
    case SET_TICKER_SIZE:
      newState.ticker.subset = action.size;
    break;
    case SET_TICKER_SHUFFLE:
      newState.ticker.shuffle = action.shuffle;
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
