/**
 * Admin Dashboard. Doing all the awesome stuff I wish Twitch could have done for me,
 * but here we are writing some spiffy code ourselves. The Dashboard is laid out for
 * a laptop screen using % values. The default laptop is 1440 x 900 for reference.
 * We're going to heavily leverage flexbox to build the columns, and materialUI
 * for the UI pieces
 * https://philipwalton.github.io/solved-by-flexbox/demos/grids/
 * http://www.material-ui.com/#/components/tabs
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

import splashStyles from "../../styles/splash"

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
  background: {
    background: "rgba(0, 0, 0, 0.5)"
  },
  note: {
    position: "absolute",
    top: "645px",
    left: "1287px",
    fontSize: "48px",
    color: "rgba(255, 255, 255, 0.8)"
  },
  logo: {
    opacity: 0.8
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
      background: state.background.brb.background
    }
  }
)(Radium(Frame))

export default ConnectedFrame;
