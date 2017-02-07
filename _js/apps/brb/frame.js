/**
 * Incoming Stream Render Frame
 */

import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../../styles/overlay"
import typography from "../../styles/typography"
import splashStyles from "../../styles/splash"

import Logo from "../../components/logo"

const styles = {
  frame: {
    chroma: {
      background: "#0f0"
    },
    local: {
      background: "url(/_assets/screens/destiny.jpg) top left no-repeat"
    }
  },
  background: {
    background: "rgba(0, 0, 0, 0.5)"
  },
  note: Object.assign({}, typography.base, {
    position: "absolute",
    top: "645px",
    left: "1287px",
    fontSize: "48px",
    color: "rgba(255, 255, 255, 0.8)"
  }),
  logo: {
    position: "absolute",
    left: "83px",
    top: "343px",
    transform: "scale(3.8)",
    opacity: 0.8
  }
};

// layout
const Frame = Radium((props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    (styles.frame[props.background]) ? styles.frame[props.background] : {},
    (props.done) ? styles.frame.toCubecolor : {}
  )

  const brbStyles = Object.assign({}, frameStyles, styles.background)

  return <div style={frameStyles}>
    <div style={brbStyles}>
      <div style={Object.assign({}, styles.logo, (props.done) ? styles.fadeOut : {})}><Logo spin={true} infinite={true} bStrokeColor={"rgba(255, 255, 255, 0.8)"} bFillColor={"#45548e"} cubeFillColor={"#45548e"} cubeStrokeColor={"#fff"} cubeStroke={6} filter={"drop-shadow(3px 3px 5px rgba(0,0,0,0.75))"} /></div>
      <h1 style={Object.assign({}, styles.note, (props.done) ? styles.fadeOut : {})}>BE RIGHT BACK...</h1>
    </div>
  </div>
})

export default Radium(Frame);
