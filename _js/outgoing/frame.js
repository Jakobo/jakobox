import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../styles/overlay"
import typography from "../styles/typography"
import splashStyles from "../styles/splash"
import items from "./ticker"

import Countdown from "../lib/countdown"
import Omnibar from "../lib/omnibar"
import Logo from "../shared/logo"

const styles = {
  frame: {
    chroma: {
      background: "#0f0"
    }
  },
  logo: {
    position: "absolute",
    left: "83px",
    top: "343px",
    transform: "scale(3.8)"
  },
  note: Object.assign({}, typography.base, {
    position: "absolute",
    top: "645px",
    left: "1050px",
    fontSize: "48px"
  })
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
const Frame = (props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    (styles.frame[props.background]) ? styles.frame[props.background] : {}
  )

  return <div style={frameStyles}>
    <Omnibar delay={props.timer} onStyleIn={omniIn} onStyleOut={omniOut} onNoStyle={omniNo} items={items} />
    <div style={styles.logo}><Logo spin={true} infinite={true} bStrokeColor={"#000"} bFillColor={"#151431"} cubeFillColor={"#2A2A5C"} cubeStrokeColor={"#fff"} cubeStroke={6} filter={"drop-shadow(3px 3px 5px rgba(0,0,0,0.75))"} /></div>
    <h1 style={styles.note}>THANKS FOR WATCHING</h1>
  </div>
}

export default Radium(Frame);
