/**
 * BRB Stream Render Frame
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

import typography from "../../lib/typography"
import splashStyles from "../../styles/splash"

import Logo from "../../components/logo"

import configure from "./conf"

const styles = {
  base: {
    width: "1920px",
    height: "1080px",
    overflow: "hidden",
    position: "relative",
    background: "transparent"
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
    transform: "scale(3.8)",
    left: "83px",
    top: "343px",
    opacity: 0.8
  }
};

// layout
const Frame = Radium((props) => {
  props.defaults();

  const frameStyles = Object.assign({},
    styles.base,
    {
      background: (props.background.indexOf("http") === 0) ? `url(${props.background}) top left no-repeat` : props.background
    }
  )

  const brbStyles = Object.assign({}, frameStyles, styles.background)

  return <div style={frameStyles}>
    <div style={brbStyles}>
      <div style={styles.logo}><Logo spin={true} infinite={true} cubeStroke={6} filter={"drop-shadow(3px 3px 5px rgba(0,0,0,0.75))"} /></div>
      <h1 style={styles.note}>BE RIGHT BACK...</h1>
    </div>
  </div>
})

const ConnectedFrame = connect(
  (state, ownProps) => {
    return {
      background: state.background.background
    }
  },
  (dispatch) => {
    return {
      defaults: () => {
        // place on end of event queue
        window.setTimeout(() => {
          configure(dispatch);
        });
      }
    }
  }
)(Radium(Frame))

export default ConnectedFrame;
