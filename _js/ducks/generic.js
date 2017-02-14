import { batchActions } from 'redux-batched-actions';

import * as cameraActions from "./camera"
import * as followsActions from "./follows"
import * as logoActions from "./logo"

const initialState = {};

const positions = {
  logo: {
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
  switch(action.type) {}

  return newState;
}

export function setLayout(camera, logo, box) {
  let logoMode = "logo";
  if (camera === logo) {
    logoMode = (box) ? "boxCam" : "logoCam"
  }
  const cameraPosition = {
    x: positions.cam[camera][0],
    y: positions.cam[camera][1]
  };
  const logoPosition = {
    x: positions[logoMode][logo][0],
    y: positions[logoMode][logo][1]
  };
  const followPosition = {
    x: positions.follow[camera][0],
    y: positions.follow[camera][1]
  };
  const followUrls = {
    fakeUrl: followData[followData.positions[camera]].demo,
    liveUrl: followData[followData.positions[camera]].actual
  };

  return batchActions([
    cameraActions.setPosition(cameraPosition.x, cameraPosition.y),
    logoActions.setPosition(logoPosition.x, logoPosition.y),
    followsActions.setUrls(followUrls.fakeUrl, followUrls.liveUrl),
    followsActions.setPosition(followPosition.x, followPosition.y)
  ])
}
