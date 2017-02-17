/**
 * Incoming Stream Render Frame
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

import typography from "../../lib/typography"
import splashStyles from "../../styles/splash"

import Logo from "../../components/logo"
import Omnibar from "../../components/omnibar"
import items from "./ticker"

import {timeline} from "../../components/animation"

import configure from "./conf"

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
  base: {
    width: "1920px",
    height: "1080px",
    overflow: "hidden",
    position: "relative",
    background: "transparent"
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
const Frame = Radium((props) => {
  props.defaults();

  const frameStyles = Object.assign({},
    styles.base,
    {
      background: (props.background.indexOf("http") === 0) ? `url(${props.background}) top left no-repeat` : props.background
    }
  )

  const splashStyles = Object.assign({}, frameStyles, styles.background)

  return <div style={splashStyles}>
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
    <Logo spin={true} infinite={true} cubeStroke={6} filter={"drop-shadow(3px 3px 5px rgba(0,0,0,0.75))"} />
    <h1 style={styles.note}>THANKS FOR WATCHING</h1>
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
