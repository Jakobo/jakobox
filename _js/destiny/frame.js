import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../styles/overlay"
import typography from "../styles/typography"
import items from "./ticker"

import Logo from "../styles/logo"

import Omnibar from "../lib/omnibar"

/*
from { left: 1796px; opacity: 0; }
to { left: 214px; opacity: 1; }
*/

const animation = {
  omnibarIn: Radium.keyframes({
    "0%":   { left: "1920px", opacity: "0" },
    "100%": { left: "214px", opacity: "1" }
  }),
  omnibarOut: Radium.keyframes({
    "0%":   { left: "214px", opacity: "1" },
    "100%": { left: "1920px", opacity: "0" }
  })
};

const styles = {
  frame: {
    chroma: {
      background: "#0f0"
    },
    pvp: {
      background: "url(https://i.ytimg.com/vi/KiKMW9RrSIY/maxresdefault.jpg) top left no-repeat"
    },
    message: {
      background: "url(https://ibin.co/2yWLfHG6o1ig.jpg) top left no-repeat"
    },
    orbit: {
      background: "url(http://cdn-thumbthrone.s3.amazonaws.com/wp-content/uploads/2014/09/Destiny_20140913173803.jpg) top left no-repeat"
    }
  },
  follow: {
    border: "0",
    width: "682px",
    height: "210px",
    right: "0",
    top: "283px",
    position: "absolute"
  },
  stroke: {
    position: "absolute",
    WebkitTextStroke: "0.2em #000",
    textStroke: "0.2em #000",
    left: "0",
    zIndex: "-1"
  },
  strokeFill: {
    position: "relative",
    background: "transparent",
    color: "#fff",
    textShadow: "2px 2px 0 rgba(0, 0, 0, 0.2)"
  },
  omnibar: {
    base: {
      position: "absolute",
      width: "1920px",
      height: "64px",
      left: "0px",
      top: "1032px",
      background: "rgba(30, 30, 30, 0.5)",
      borderTop: "4px solid rgba(255, 83, 39, 0.7)",
      borderLeft: "0",
      borderRight: "0",
      borderBottom: "0",
      boxShadow: "0px -1px 0 rgba(0, 0, 0, 0.4)",
      overflow: "hidden"
    },
    reset: {
      position: "relative",
      width: "1920px",
      height: "57px",
      borderTop: "2px solid rgba(0, 0, 0, 0.2)",
      borderLeft: "0",
      borderRight: "0",
      borderBottom: "0"
    },
    jakobox: Object.assign({}, typography.base, {
      position: "absolute",
      left: "3px"
      // top: "5px"
    }),
    spacer: Object.assign({}, typography.base, {
      position: "absolute",
      left: "180px"
      // top: "5px"
    }),
    item: {
      top: "5px"
    },
    textOffscreen: {
      position: "absolute",
      left: "1920px",
      visibility: "hidden"
    },
    textIn: {
      position: "absolute",
      animation: "textIn 1s ease-out forwards",
      animationName: animation.omnibarIn
    },
    textOut: {
      position: "absolute",
      animation: "textOut 1s ease-out forwards",
      animationName: animation.omnibarOut
    }
  },
  logo: {
    position: "absolute",
    left: "8px",
    top: "-55px",
    transform: "scale(0.7)"
  },
  cam: {
    base: {
      position: "absolute",
      top: "400px",
      left: "3px",
      width: "480px",
      height: "340px"
    },
    reset: {
      position: "relative"
    },
    frame: {
      boxSizing: "borderBox",
      width: "412px",
      height: "237px",
      border: "6px solid #2a3f56",
      boxShadow: "5px 5px 7px 0px rgba(0,0,0,0.75)",
      left: "0px",
      top: "50px"
    },
    accentTop: {
      position: "absolute",
      boxSizing: "border-box",
      borderBottom: "8px solid #df8926",
      borderLeft: "16px solid transparent",
      height: "0",
      width: "130px",
      left: "294px",
      top: "-7px",
      zIndex: "2"
    },
    accentRight: {
      position: "absolute",
      boxSizing: "border-box",
      borderLeft: "8px solid #df8926",
      borderBottom: "16px solid transparent",
      width: "0",
      height: "150px",
      left: "424px",
      top: "-7px",
      filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.75))",
      transform: "translateZ(0)",
      backfaceVisibility: "hidden",
      perspective: 1000
    }
  }
};

const stroke = (text, style) => {
  return <div style={style}>
    <div style={Object.assign({}, styles.stroke, typography.base, styles.omnibar.item)}>{text}</div><div style={Object.assign({}, styles.strokeFill, typography.base, styles.omnibar.item)}>{text}</div>
  </div>
}

const strokeIn = (text) => {
  return stroke(text, styles.omnibar.textIn)
}

const strokeOut = (text) => {
  return stroke(text, styles.omnibar.textOut)
}

const strokeOffscreen = (text) => {
  return stroke(text, styles.omnibar.textOffscreen)
}

const Frame = (props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    (styles.frame[props.background]) ? styles.frame[props.background] : {}
  )

  const followUrl = (props.fakeFollows) ? "http://u.muxy.io/dashboard/alerts/demo/g9djjNHgai340bmM76i2Fhfe5nyiMKSX" : "http://a.muxy.io/alert/jakobox/srX-UDXTDVsAURa8mWWdPkAVxz0NA94E"

  return <div style={frameStyles}>
    <div style={styles.omnibar.base}>
      <div style={styles.omnibar.reset}>
        <div style={styles.omnibar.jakobox}>{stroke("JAKOBOX.TV")}</div>
        <div style={styles.omnibar.spacer}>{stroke("▪")}</div>
        <Omnibar delay={props.timer} onStyleIn={strokeIn} onStyleOut={strokeOut} onNoStyle={strokeOffscreen} items={items} />
      </div>
    </div>
    <div style={styles.cam.base}>
      <div style={styles.cam.reset}>
        <div style={styles.cam.frame}></div>
        <div style={styles.cam.accentTop}></div>
        <div style={styles.cam.accentRight}></div>

        <div style={styles.logo}><Logo spin={false} infinite={false} spinEvery={13} cubeStroke={10}></Logo></div>
      </div>
    </div>
    <iframe style={styles.follow} src={followUrl} seamless="seamless" />
  </div>
};

export default Radium(Frame);
