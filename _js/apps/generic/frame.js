/**
 * Generic twitch stream frame that does all the heavy lifting.
 * This frame is built such that it can handle a variety of different
 * logo, cam, and follow positions in addition to turning on/off the
 * standard LowerThirds option.
 *
 * This is a good candidate to refactor later, making a Generic (abstract)
 * that is used by the Destiny frame, and a Generic (concrete) that is used
 * by the majority of this code to create the basic frame
 */

import React, { PropTypes } from "react"
import { render } from "react-dom"
import Radium from "radium"

import LowerThirds from "../../components/lowerthird"

import overlay from "../../styles/overlay"
import typography from "../../styles/typography"

import Logo from "../../components/logo"
import Cam from "../../components/cam"

const styles = {
  frame: {
    chroma: {
      background: "#0f0"
    },
    code: {
      background: "url(https://ibin.co/33Uam0QIrYAu.png) top left no-repeat",
      backgroundSize: "cover"
    },
    destiny: {
      background: "url(https://i.ytimg.com/vi/KiKMW9RrSIY/maxresdefault.jpg) top left no-repeat"
    },
    destiny2: {
      background: "url(http://cdn-thumbthrone.s3.amazonaws.com/wp-content/uploads/2014/09/Destiny_20140913173803.jpg) top left no-repeat"
    },
    ki: {
      background: "url(https://i.ytimg.com/vi/qInozta1EzM/maxresdefault.jpg) top left no-repeat"
    },
    local: {
      background: "url(/_assets/screens/destiny.jpg) top left no-repeat"
    }
  },
  logo: {
    position: "absolute"
  },
  cam: {
    position: "absolute"
  },
  follows: {
    position: "absolute",
    border: "0px solid transparent",
    width: "405px",
    height: "35px",
    filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.75))",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    perspective: 1000
  }
};

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

const follows = {
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

const getFollowsUrl = (pos, demo) => {
  return follows[follows.positions[pos || 10]][(demo) ? "demo" : "actual"]
}

const getXY = (obj, camPos, logoPos, boxOnly) => {
  const fmt = (xy, pos) => {
    if (!xy[pos]) {
      pos = 1;
    }

    return Object.assign({},
      {
        left: `${xy[pos][0]}px`,
        top: `${xy[pos][1]}px`
      },
      xy.also || {}
    );
  }

  if (obj == "follow") {
    return fmt(positions.follow, camPos);
  }

  if (obj == "cam") {
    return fmt(positions.cam, camPos);
  }

  if (camPos === logoPos) {
    if (boxOnly) {
      return fmt(positions.boxCam, logoPos);
    }
    else {
      return fmt(positions.logoCam, logoPos);
    }
  }
  else {
    if (boxOnly) {
      return fmt(positions.box, logoPos);
    }
    else {
      return fmt(positions.logo, logoPos);
    }
  }


  let ret = (obj == "cam") ? positions.cam : positions.logo;

  if (boxOnly && obj == "logo") {
    ret = positions.box;
  }
}

const Frame = (props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    (styles.frame[props.background]) ? styles.frame[props.background] : {}
  )

  const camOverrides = getXY("cam", props.cam, props.logo, props.useBox);
  const logoOverrides = getXY("logo", props.cam, props.logo, props.useBox);
  const followOverrides = getXY("follow", props.cam, props.logo, props.useBox);

  return <div style={frameStyles}>
    <iframe style={Object.assign({}, styles.follows, followOverrides)} src={getFollowsUrl(props.cam, props.fakeFollows)} seamless="seamless" />
    {(props.cam === 0) ? null : <div style={Object.assign({}, styles.cam, camOverrides)}><Cam></Cam></div> }
    {(props.noThirds) ? null : <LowerThirds></LowerThirds> }
  </div>
};

Frame.propTypes = {
  cam: PropTypes.number,
  logo: PropTypes.number,
  useBox: PropTypes.bool,
  fakeFollows: PropTypes.bool,
  background: PropTypes.string
};

Frame.defaultProps = {
  cam: 1,
  logo: 1,
  useBox: false,
  fakeFollows: false,
  background: ""
};

export default Radium(Frame);
