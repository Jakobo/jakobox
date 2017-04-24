const SET_BACKGROUND = "genscreen/SET_BACKGROUND"
const ENABLE_FAKE_FOLLOWS = "genscreen/ENABLE_FAKE_FOLLOWS"
const ENABLE_LIVE_FOLLOWS = "genscreen/ENABLE_LIVE_FOLLOWS"
const SET_LOWERTHIRDS_VISIBILITY = "genscreen/SET_LOWERTHIRDS_VISIBILITY"
const SET_LOWERTHIRDS_PLAYLIST = "genscreen/SET_LOWERTHIRDS_PLAYLIST"
const SET_CAMERA_COLORS = "genscreen/SET_CAMERA_COLORS"
const SET_LOGO_CUBE_COLORS = "genscreen/SET_LOGO_CUBE_COLORS"
const SET_LOGO_TEXT_COLORS = "genscreen/SET_LOGO_TEXT_COLORS"
const SET_LOGO_B_COLORS = "genscreen/SET_LOGO_B_COLORS"
const SET_CONFIGURATION = "genscreen/SET_CONFIGURATION"

const positions = {
  logo: {
    0: false,
    1:  [0, 0],
    2:  [730, 0],
    3:  [1470, 0],
    4:  false,
    5:  false,
    6:  [0, 847],
    7:  [1470, 847],
    8:  [0, 979],
    9:  [730, 979],
    10: [1470, 979]
  },
  box: {
    0: false,
    1:  [10, 0],
    2:  [916, 0],
    3:  [1833, 0],
    4:  false,
    5:  false,
    6:  false,
    7:  false,
    8:  [10, 976],
    9:  [916, 976],
    10: [1833, 976]
  },
  cam: { /* 442 x 268 */
    0: false,
    1:  [0, 0],
    2:  [753, 0],
    3:  [1493, 0],
    4:  [0, 240],
    5:  [1493, 240],
    6:  [0, 520],
    7:  [1493, 520],
    8:  [0, 828],
    9:  [753, 828],
    10: [1493, 828]
  },
  logoCam: {
    0: false,
    1:  [8, 230],
    2:  false,
    3:  [1543, 230],
    4:  false,
    5:  false,
    6:  false,
    7:  false,
    8:  [8, 747],
    9:  false,
    10: [1543, 747]
  },
  boxCam: {
    0: false,
    1:  [331, 140],
    2:  [904, 140],
    3:  [1824, 140],
    4:  [331, 379],
    5:  [1824, 379],
    6:  [331, 659],
    7:  [1824, 659],
    8:  [331, 967],
    9:  [904, 967],
    10: [1824, 967],
    also: {
      opacity: "0.4"
    }
  },
  follow: {
    0: false,
    1:  [425, 0],
    2:  [1175, 0],
    3:  [1090, 0],
    4:  [425, 456],
    5:  [1090, 456],
    6:  [425, 737],
    7:  [1090, 737],
    8:  [425, 1044],
    9:  [350, 1044],
    10: [1090, 1044]
  }
}

const followData = {
  positions: {
    1:  "leftTop",
    2:  "leftTop",
    3:  "rightTop",
    4:  "leftBottom",
    5:  "rightBottom",
    6:  "leftBottom",
    7:  "rightBottom",
    8:  "leftBottom",
    9:  "rightBottom",
    10: "rightBottom"
  },
  leftTop: {
    demo: "http://u.muxy.io/dashboard/alerts/demo/_ivbIhS6wtUryeSWwStye-V3td-UcihR",
    actual: "http://a.muxy.io/alert/jakobox/Hp5__2JcmNnT-IUGbMuABxhzymGMyRJ_"
  },
  leftBottom: {
    demo: "http://u.muxy.io/dashboard/alerts/demo/8UHzd1WBsL9KzrZR0SROyuxQxSamCdJG",
    actual: "http://a.muxy.io/alert/jakobox/jBPhN9c41U4PzUQTxe1sVhy8dKg1J0-9"
  },
  rightTop: {
    demo: "http://u.muxy.io/dashboard/alerts/demo/u63HJH2IRdvX6jZgylkOdh4BkQZhbOIA",
    actual: "http://a.muxy.io/alert/jakobox/XBIsxnQjoZwYKcqkzXZ1Xd_7Q9x5lCK8"
  },
  rightBottom: {
    demo: "http://u.muxy.io/dashboard/alerts/demo/f0Py8FO3adoYs8q6dS6KF9TvgFgs5IgH",
    actual: "http://a.muxy.io/alert/jakobox/DFN18EsYcVKcKam_i22EPMP8PAKhdwYt"
  }
}

const initialState = {
  background: "rgba(0,255,0,0)",
  cameraPosition: 1,
  logoPosition: 1,
  camera: {
    visible: true,
    x: positions.cam[1][0],
    y: positions.cam[1][1],
    color: {
      main: "#fff",
      accent: "#fff"
    }
  },
  follows: {
    visible: true,
    fakeFollows: false,
    x: positions.follow[1][0],
    y: positions.follow[1][1],
    width: 682,
    height: 210,
    fakeUrl: followData[followData.positions[1]].demo,
    liveUrl: followData[followData.positions[1]].actual
  },
  logo: {
    textLogo: true,
    x: positions.logoCam[1][0],
    y: positions.logoCam[1][1],
    scale: 1,
    visible: true,
    cube: { stroke: "#000", fill: "#fff" },
    b: { stroke: "#000", fill: "#fff" },
    text: { stroke: "#000", fill: "#fff" }
  },
  lowerthirds: {
    visible: true,
    currentPlaylist: "normal",
    availablePlaylists: ["normal"],
    components: {
      text: { stroke: "#000", fill: "#fff" },
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
    case SET_LOWERTHIRDS_VISIBILITY:
      newState.lowerthirds.visible = action.visible;
    break;
    case SET_LOWERTHIRDS_PLAYLIST:
      newState.lowerthirds.currentPlaylist = action.currentPlaylist;
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
    case SET_CONFIGURATION:
      action.textLogo = (typeof action.textLogo == "undefined") ? newState.logo.textLogo : action.textLogo;
      let camera = action.cam || newState.cam;
      let logo = action.logo || newState.logo;
      let logoMode = (action.textLogo) ? "logo" : "box";
      camera = (camera > 10) ? 10 : (camera < 0) ? 0 : camera;
      logo = (logo > 10) ? 10 : (logo < 0) ? 0 : logo;
      if (camera === logo) {
        logoMode = (action.textLogo) ? "logoCam" : "boxCam"
      }

      newState.cameraPosition = camera;
      newState.logoPosition = logo;
      newState.camera.x = positions.cam[camera][0];
      newState.camera.y = positions.cam[camera][1];
      newState.logo.textLogo = action.textLogo;
      newState.logo.x = positions[logoMode][logo][0];
      newState.logo.y = positions[logoMode][logo][1];
      newState.follows.x = positions.follow[camera][0];
      newState.follows.y = positions.follow[camera][1];
      newState.follows.fakeUrl = followData[followData.positions[camera]].demo;
      newState.follows.liveUrl = followData[followData.positions[camera]].actual;
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

export function setConfiguration(camera, logo, textLogo) {
  return {type: SET_CONFIGURATION, camera, logo, textLogo}
}

export function showLowerThirds() {
  return {type: SET_LOWERTHIRDS_VISIBILITY, visible: true}
}

export function hideLowerThirds() {
  return {type: SET_LOWERTHIRDS_VISIBILITY, visible: false}
}
