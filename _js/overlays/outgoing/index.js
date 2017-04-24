/**
 * Incoming Stream Render Frame
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

import Logo from "../../components/logo"

const styles = {
  base: {
    width: "1920px",
    height: "1080px",
    overflow: "hidden",
    position: "relative",
    background: "transparent"
  },
  typography: {
    fontFamily: '"Helvetica Neue Condensed", "Helvetica Neue", Helvetica, sans-serif',
    fontSize: "26px"
  },
  note: {
    position: "absolute",
    top: "645px",
    left: "1050px",
    fontSize: "48px"
  }
};

// layout
const Frame = Radium((props) => {
const frameStyles = Object.assign({},
    styles.base,
    styles.typography,
    {
      background: (props.background.indexOf("http") === 0) ? `url(${props.background}) top left no-repeat` : props.background
    }
  )

  const splashStyles = Object.assign({}, frameStyles, styles.background)

  return <div style={splashStyles}>
    <Logo source={"interstitial.startStop.logo"} spin={true} infinite={true} cubeStroke={6} filter={"drop-shadow(3px 3px 5px rgba(0,0,0,0.75))"} />
    <h1 style={styles.note}>THANKS FOR WATCHING</h1>
  </div>
})

const ConnectedFrame = connect(
  (state, ownProps) => {
    return {
      background: state.interstitial.startStop.background
    }
  }
)(Radium(Frame))

export default ConnectedFrame;
