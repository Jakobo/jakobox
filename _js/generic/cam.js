import React from "react"
import { render } from "react-dom"
import Radium from "radium"

const styles = {
  reset: {
    position: "relative"
  },
  border: {
    position: "absolute",
    boxSizing: "borderBox",
    width: "412px",
    height: "237px",
    borderWidth: "6px",
    borderStyle: "solid",
    borderColor: "#2a3f56",
    boxShadow: "5px 5px 7px 0px rgba(0,0,0,0.75)",
    left: "0px",
    top: "0px"
  },
  accent: {
    position: "absolute",
    boxSizing: "borderBox",
    width: "416px",
    height: "241px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#fff",
    left: "6px",
    top: "6px"
  }
}

const Cam = (props) => {
  var localStyles = Object.assign({}, styles);
  localStyles.border.borderColor = props.color || "#2a3f56";
  localStyles.accent.borderColor = props.accentColor || "#fff";

  return <div style={styles.reset}>
    <div style={styles.border}></div>
    <div style={styles.accent}></div>
    {props.children}
  </div>
}

export default Radium(Cam);
