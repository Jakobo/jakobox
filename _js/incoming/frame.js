/**
 * Incoming Stream Render Frame
 */

import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../styles/overlay"
import typography from "../styles/typography"
import splashStyles from "../styles/splash"
import items from "./ticker"

import Omnibar from "../lib/omnibar"
import Logo from "../shared/logo"

const animation = {
  fadeOut: Radium.keyframes({
    "0%":   { opacity: 1 },
    "30%": { opacity: 0 },
    "100%": { opacity: 0 }
  }),
  bgColor: Radium.keyframes({
    "0%":   {  },
    "30%": { background: "#2A2A5C" },
    "100%": { background: "#000" }
  })
}

const styles = {
  frame: {
    chroma: {
      background: "#0f0"
    },
    toCubecolor: {
      animation: "bgColor 3s ease-in forwards",
      animationName: animation.bgColor
    }
  },
  note: Object.assign({}, typography.base, {
    position: "absolute",
    top: "645px",
    left: "1050px",
    fontSize: "48px"
  }),
  logo: {
    position: "absolute",
    left: "83px",
    top: "343px",
    transform: "scale(3.8)"
  },
  fadeOut: {
    animation: "fadeOut 3s ease-in forwards",
    animationName: animation.fadeOut
  }
};

const omniIn = (str) => {
  return <span style={Object.assign({}, typography.base, splashStyles.omnibar.placement, splashStyles.omnibar.fadeIn)}>{str}</span>
}

const omniOut = (str) => {
  return <span style={Object.assign({}, typography.base, splashStyles.omnibar.placement, splashStyles.omnibar.fadeOut)}>{str}</span>
}

const omniNo = (str) => {
  return <span style={Object.assign({}, typography.base, splashStyles.omnibar.placement, splashStyles.omnibar.noShow)}>{str}</span>
}

// layout
const Frame = Radium((props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    (styles.frame[props.background]) ? styles.frame[props.background] : {},
    (props.done) ? styles.frame.toCubecolor : {}
  )

  return <div style={frameStyles}>
    <div style={Object.assign({}, (props.done) ? styles.fadeOut : {})}><Omnibar delay={props.timer} onStyleIn={omniIn} onStyleOut={omniOut} onNoStyle={omniNo} items={items} /></div>
    <div style={Object.assign({}, styles.logo, (props.done) ? styles.fadeOut : {})}><Logo spin={true} infinite={true} bStrokeColor={"#000"} bFillColor={"#151431"} cubeFillColor={"#2A2A5C"} cubeStrokeColor={"#fff"} cubeStroke={6} filter={"drop-shadow(3px 3px 5px rgba(0,0,0,0.75))"} /></div>
    <h1 style={Object.assign({}, styles.note, (props.done) ? styles.fadeOut : {})}>STREAM IS STARTING SOON</h1>
  </div>
})

export default Radium(Frame);
