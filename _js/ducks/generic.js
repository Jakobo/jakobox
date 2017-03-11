import { RESET, SYNC } from "./global"
import generateState from "../lib/state"

import * as cameraActions from "./camera"
import * as followsActions from "./follows"
import * as lowerThirdsActions from "./lowerthirds"
import * as logoActions from "./logo"

const SET_POSITIONS = "generic/SET_POSITIONS"

const initialState = generateState({
  logo: 10,
  cam: 4
});

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

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case RESET:
      newState = Object.assign({}, initialState);
    break;
    case SYNC:
      newState = Object.assign({}, action.newState.generic);
    break;
    case SET_POSITIONS:
      newState[action.targetScreen].logo = action.logo;
      newState[action.targetScreen].cam = action.cam;
    break;
  }

  return newState;
}

export function setLayout(camera, logo, textLogo) {
  let logoMode = "logo";
  camera = (camera > 10) ? 10 : (camera < 0) ? 0 : camera;
  logo = (logo > 10) ? 10 : (logo < 0) ? 0 : logo;

  if (camera === logo) {
    logoMode = (textLogo) ? "logoCam" : "boxCam"
  }
  const cameraPosition = {
    x: positions.cam[camera][0],
    y: positions.cam[camera][1]
  };
  const logoPosition = {
    x: positions[logoMode][logo],
    y: positions[logoMode][logo]
  };
  const followPosition = {
    x: positions.follow[camera][0],
    y: positions.follow[camera][1]
  };
  const followUrls = {
    fakeUrl: followData[followData.positions[camera]].demo,
    liveUrl: followData[followData.positions[camera]].actual
  };

  return [
    (camera > 0) ? cameraActions.showCamera() : cameraActions.hideCamera(),
    cameraActions.setXPosition(cameraPosition.x),
    cameraActions.setYPosition(cameraPosition.y),
    (logo > 0) ? logoActions.showLogo() : logoActions.hideLogo(),
    logoActions.setPosition(logoPosition.x, logoPosition.y),
    (textLogo) ? logoActions.showFullLogo() : logoActions.showOnlyBox(),
    followsActions.setUrls(followUrls.fakeUrl, followUrls.liveUrl),
    followsActions.setPosition(followPosition.x, followPosition.y),
    { type: SET_POSITIONS, cam: camera, logo }
  ]
}
