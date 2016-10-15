import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../styles/overlay"
import typography from "../styles/typography"
import items from "./ticker"

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
  testFollow: {
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
      border: "4px solid rgba(255, 83, 39, 0.7)",
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
      border: "2px solid rgba(0, 0, 0, 0.2)",
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
    base: {
      display: "block",
      overflow: "visible",
      position: "absolute"
    },
    text: {
      fontSize: "55px",
      fontFamily: "HelveticaNeue-CondensedBlack",
      fontWeight: 600,
      fontStretch: "condensed",
      color: "#fff"
    },
    stroke: {
      fill: "#fff",
      stroke: "#000",
      strokeWidth: "2"
    },
    mediumStroke: {
      strokeWidth: "6"
    },
    heavyStroke: {
      strokeWidth: "8"
    },
    jako: {
      top: "-43px",
      left: "6px"
    },
    box: {
      height: "85px",
      left: "36px",
      top: "-62px"
    },
    ox: {
      top: "-43px",
      left: "198px"
    }
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

  let follows = null;
  if (props.showFollows) {
    follows = <iframe style={styles.testFollow} src="https://u.muxy.io/dashboard/alerts/demo/g9djjNHgai340bmM76i2Fhfe5nyiMKSX" border="0" seamless="seamless" />
  }

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

        <svg style={Object.assign({}, styles.logo.base, styles.logo.text, styles.logo.stroke, styles.logo.jako)} xmlns="http://www.w3.org/2000/svg" width="150" height="42" viewBox="0 0 150 42">
          <text x="0" y="42">JAKO</text>
        </svg>
        <svg style={Object.assign({}, styles.logo.base, styles.logo.box)}  xmlns="http://www.w3.org/2000/svg" width="250" height="289" viewBox="0 0 250 289">
          <path id="Inside" style={Object.assign({}, styles.logo.stroke, styles.logo.mediumStroke)} d="M168,122.01v49.957L126.025,197,82.982,171.967V122.01l43.043-26.038Z"/>
          <path id="Outside" style={Object.assign({}, styles.logo.stroke, styles.logo.heavyStroke)} d="M124.433,231.815l73.559-42.841V103.317L126.025,61,82.982,86V36.04L126.025,9.991,239.95,78.049V213.007L126.025,278.955l-43.043-23L51.972,237.991l0.639-.365-0.639.342L10.028,214.025V78.049L51.972,54.007V188.974Z"/>
        </svg>
        <svg style={Object.assign({}, styles.logo.base, styles.logo.text, styles.logo.stroke, styles.logo.ox)}  xmlns="http://www.w3.org/2000/svg" width="75" height="42" viewBox="0 0 75 42">
          <text x="0" y="42">OX</text>
        </svg>
      </div>
    </div>
    {follows}
  </div>
};

export default Radium(Frame);
