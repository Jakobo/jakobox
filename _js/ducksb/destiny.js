import {ticker as destinyTicker} from "../ducks/lowerthirds/destiny"

const SET_BACKGROUND = "destiny/SET_BACKGROUND"
const ENABLE_FAKE_FOLLOWS = "destiny/ENABLE_FAKE_FOLLOWS"
const ENABLE_LIVE_FOLLOWS = "destiny/ENABLE_LIVE_FOLLOWS"
const SET_LOWERTHIRDS_PLAYLIST = "destiny/SET_LOWERTHIRDS_PLAYLIST"
const SET_LOWERTHIRDS_TICKER_SIZE = "destiny/SET_LOWERTHIRDS_TICKER_SIZE"
const SET_LOWERTHIRDS_TICKER_ITEMS = "destiny/SET_LOWERTHIRDS_TICKER_ITEMS"
const SET_CAMERA_COLORS = "destiny/SET_CAMERA_COLORS"
const SET_LOGO_CUBE_COLORS = "destiny/SET_LOGO_CUBE_COLORS"
const SET_LOGO_TEXT_COLORS = "destiny/SET_LOGO_TEXT_COLORS"
const SET_LOGO_B_COLORS = "destiny/SET_LOGO_B_COLORS"

const initialState = {
  background: "rgba(0,255,0,0)",
  camera: {
    visible: true,
    x: 3,
    y: 460,
    color: {
      main: "#2a3f56",
      accent: "#df8926"
    }
  },
  follows: {
    visible: true,
    fakeFollows: false,
    x: 1238,
    y: 283,
    width: 682,
    height: 210,
    fakeUrl: "http://u.muxy.io/dashboard/alerts/demo/g9djjNHgai340bmM76i2Fhfe5nyiMKSX",
    liveUrl: "http://a.muxy.io/alert/jakobox/srX-UDXTDVsAURa8mWWdPkAVxz0NA94E"
  },
  logo: {
    textLogo: false,
    spin: false,
    infinite: false,
    x: 0,
    y: 0,
    scale: 1,
    visible: true,
    cube: { stroke: "#000", fill: "#fff" },
    b: { stroke: "#000", fill: "#fff" },
    text: { stroke: "#000", fill: "#fff" }
  },
  lowerthirds: {
    visible: true,
    currentPlaylist: "demo",
    availablePlaylists: ["normal", "demo"],
    components: {
      text: { stroke: "#000", fill: "#fff" },
      announcements: {
        size: 1,
        shuffle: true,
        items: destinyTicker
      },
      logo: {
        cube: { stroke: "#000", fill: "#fff" },
        b: { stroke: "#000", fill: "#fff" },
        text: { stroke: "#000", fill: "#fff" }
      }
    }
  }
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_BACKGROUND:
      newState.background = action.background;
    break;
    case ENABLE_FAKE_FOLLOWS:
      newState.follows.fakeFollows = true;
    break;
    case ENABLE_LIVE_FOLLOWS:
      newState.follows.fakeFollows = false;
    break;
    case SET_LOWERTHIRDS_PLAYLIST:
      newState.lowerthirds.currentPlaylist = action.currentPlaylist;
    break;
    case SET_LOWERTHIRDS_TICKER_SIZE:
      newState.lowerthirds.ticker.subset = action.size;
    break;
    case SET_LOWERTHIRDS_TICKER_ITEMS:
      newState.lowerthirds.ticker.items = action.items;
    break;
    case SET_CAMERA_COLORS:
      newState.camera.color.main = action.main;
      newState.camera.color.accent = action.accent;
    break;
    case SET_LOGO_CUBE_COLORS:
      newState.logo.cube.stroke = action.stroke || newState.logo.cube.stroke;
      newState.logo.cube.fill = action.fill || newState.logo.cube.fill;
      newState.lowerthirds.components.logo.cube.stroke = newState.logo.cube.stroke;
      newState.lowerthirds.components.logo.cube.fill = newState.logo.cube.fill;
    break;
    case SET_LOGO_B_COLORS:
      newState.logo.b.stroke = action.stroke || newState.logo.b.stroke;
      newState.logo.b.fill = action.fill || newState.logo.b.fill;
      newState.lowerthirds.components.logo.b.stroke = newState.logo.b.stroke;
      newState.lowerthirds.components.logo.b.fill = newState.logo.b.fill;
    break;
    case SET_LOGO_TEXT_COLORS:
      newState.logo.text.stroke = action.stroke || newState.logo.text.stroke;
      newState.logo.text.fill = action.fill || newState.logo.text.fill;
      newState.lowerthirds.components.logo.text.stroke = newState.logo.text.stroke;
      newState.lowerthirds.components.logo.text.fill = newState.logo.text.fill;
    break;
  }

  return newState;
}

export function setBackground(background) {
  return {type: SET_BACKGROUND, background};
}

export function useFakeFollows() {
  return {type: ENABLE_FAKE_FOLLOWS};
}

export function useLiveFollows() {
  return {type: ENABLE_LIVE_FOLLOWS};
}

export function setPlaylist(currentPlaylist) {
  return {type: SET_CURRENT_PLAYLIST, currentPlaylist};
}

export function setTickerItems(items) {
  return {type: SET_LOWERTHIRDS_TICKER_ITEMS, items}
}

export function setTickerSize(size) {
  return {type: SET_LOWERTHIRDS_TICKER_SIZE, size}
}

export function setLogoCubeColors(stroke, fill) {
  return {type: SET_LOGO_CUBE_COLORS, stroke, fill}
}

export function setLogoTextColors(stroke, fill) {
  return {type: SET_LOGO_TEXT_COLORS, stroke, fill}
}

export function setLogoBColors(stroke, fill) {
  return {type: SET_LOGO_B_COLORS, stroke, fill}
}

export function setCameraColors(main, accent) {
  return {type: SET_CAMERA_COLORS, main, accent}
}
