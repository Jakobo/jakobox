/**
 * Generic Cam Layout
 * A generic cam that can be used in more than one layout
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

const originalStyles = {
  position: {
    position: "absolute",
    left: "0px",
    right: "0px"
  },
  reset: {
    position: "relative",
    width: "480px",
    height: "340px"
  },
  frame: {
    boxSizing: "borderBox",
    width: "412px",
    height: "237px",
    border: "6px solid #fff",
    boxShadow: "5px 5px 7px 0px rgba(0,0,0,0.75)",
    left: "0px",
    top: "50px"
  },
  accentTop: {
    position: "absolute",
    boxSizing: "border-box",
    borderBottom: "8px solid #fff",
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
    borderLeft: "8px solid #fff",
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
};

const Cam = Radium((props) => {
  if (!props.visible) {
    return null;
  }

  let styles = Object.assign({}, originalStyles);
  if (props.color) {
    styles.frame.border = `6px solid ${props.color}`;
  }
  if (props.accent) {
    styles.accentTop.borderBottom = `8px solid ${props.accent}`;
    styles.accentRight.borderLeft = `8px solid ${props.accent}`;
  }
  styles.position.left = `${props.x}px`;
  styles.position.top = `${props.y}px`;

  return <div style={styles.position}>
    <div style={styles.reset}>
      <div style={styles.frame}></div>
      <div style={styles.accentTop}></div>
      <div style={styles.accentRight}></div>
    </div>
  </div>
});

const ConnectedCam = connect(
  (state, ownProps) => {
    return {
      color: ownProps.color || state.color[state.screen.current].camera.main,
      accent: ownProps.accent || state.color[state.screen.current].camera.accent,
      x: ownProps.x || state.camera[state.screen.current].x,
      y: ownProps.y || state.camera[state.screen.current].y,
      visible: state.camera[state.screen.current].visible
    }
  }
)(Radium(Cam))

export default ConnectedCam;