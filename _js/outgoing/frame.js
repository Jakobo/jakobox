/**
 * Outgoing Stream Render Frame
 */

import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../styles/overlay"
import typography from "../styles/typography"
import splashStyles from "../styles/splash"

import {timeline} from "../shared/animation"

import Omnibar from "../shared/omnibar"
import items from "./ticker"

import Logo from "../shared/logo"


const omnibarOptions = {
  width: 1920,
  height: 30,
  textStyle: {
    display: "block",
    overflow: "visible",
    fontSize: "30px",
    fontFamily: "HelveticaNeue",
    fontWeight: 200,
    color: "#333",
    fill: "#333",
    stroke: "#000",
    strokeWidth: "0",
    textAnchor: "middle",
    filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.4))",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    perspective: 1000
  },
  animation: timeline()
    .from(0,   { opacity: 0 })
    .to(0.7,   { opacity: 1 })
    .from(6.3, { opacity: 1 })
    .to(7,     { opacity: 0 })
    .from(0,   { transform: "translateX(960px)" })
    .to(7,     { transform: "translateX(0)" }, "cubic-bezier(.25, .99, .75, .01)")
}

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
  omnibar: {
    position: "absolute",
    left: "480px",
    top: "810px",
    width: "1920px"
  },
  note: Object.assign({}, typography.base, {
    position: "absolute",
    top: "645px",
    left: "1050px",
    fontSize: "48px"
  })
};

// layout
const Frame = (props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    (styles.frame[props.background]) ? styles.frame[props.background] : {}
  )

  return <div style={frameStyles}>
    <div style={Object.assign({}, styles.omnibar)}>
      <Omnibar
        loop={true}
        items={items}
        width={omnibarOptions.width}
        height={omnibarOptions.height}
        animation={omnibarOptions.animation}
        textStyle={omnibarOptions.textStyle}>
      </Omnibar>
    </div>
    <div style={styles.logo}><Logo spin={true} infinite={true} bStrokeColor={"#000"} bFillColor={"#151431"} cubeFillColor={"#2A2A5C"} cubeStrokeColor={"#fff"} cubeStroke={6} filter={"drop-shadow(3px 3px 5px rgba(0,0,0,0.75))"} /></div>
    <h1 style={styles.note}>THANKS FOR WATCHING</h1>
  </div>
}

export default Radium(Frame);
