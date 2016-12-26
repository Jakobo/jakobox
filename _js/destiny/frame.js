import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../styles/overlay"
import typography from "../styles/typography"
import items from "./ticker"

import Logo from "../shared/logo"
import LowerThird from "../shared/lowerthird"

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

const Frame = (props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    (styles.frame[props.background]) ? styles.frame[props.background] : {}
  )

  const followUrl = (props.fakeFollows) ? "http://u.muxy.io/dashboard/alerts/demo/g9djjNHgai340bmM76i2Fhfe5nyiMKSX" : "http://a.muxy.io/alert/jakobox/srX-UDXTDVsAURa8mWWdPkAVxz0NA94E"

  return <div style={frameStyles}>
    <div style={styles.cam.base}>
      <div style={styles.cam.reset}>
        <div style={styles.cam.frame}></div>
        <div style={styles.cam.accentTop}></div>
        <div style={styles.cam.accentRight}></div>
      </div>
    </div>
    <iframe style={styles.follow} src={followUrl} seamless="seamless" />
    <LowerThird playlist={"destiny"}></LowerThird>
  </div>
};

export default Radium(Frame);
