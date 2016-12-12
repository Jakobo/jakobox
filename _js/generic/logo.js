// collapse all logo related stuff into an easy to manage element

import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import typography from "../styles/typography"

import Cube from "../styles/cube"

const styles = {
  container: {
    position: "relative"
  },
  cube: {
    position: "absolute",
    left: "227px",
    top: "35px",
    transform: "scale(0.18)"
  },
  cubeOnly: {
    left: "41px"
  },
  logo: {
    hide: {
      display: "none"
    },
    base: {
      display: "block",
      overflow: "visible",
      position: "absolute"
    },
    jako: {
      left: "0px",
      top: "43px"
    },
    ox: {
      left: "274px",
      top: "43px"
    },
    box: {
      left: "103px",
      height: "105px"
    },
    boxOnly: {
      left: "-82px"
    },
    text: {
      fontSize: "85px",
      fontFamily: "HelveticaNeue-CondensedBlack",
      fontWeight: 600,
      fontStretch: "condensed",
      color: "#fff"
    },
    stroke: {
      fill: "#fff",
      stroke: "#000",
      strokeWidth: "3"
    },
    heavyStroke: {
      strokeWidth: "6"
    }
  }
};

const cubeOverrides = {
  side: {
    background: "#fff",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.4)",
    boxSizing: "border-box",
    border: "8px solid #000"
  }
}

const Logo = (props) => {
  return <div style={styles.container}>
    <div style={Object.assign({}, styles.cube, (props.text === false) ? styles.cubeOnly : {})}><Cube spin={props.spin} infinite={props.infinite} styles={cubeOverrides}></Cube></div>
    <div>
      <svg style={Object.assign({}, styles.logo.base, styles.logo.text, styles.logo.stroke, styles.logo.jako, (props.text === false) ? styles.logo.hide : {})} xmlns="http://www.w3.org/2000/svg" width="150" height="42" viewBox="0 0 150 42">
        <text x="0" y="42">JAKO</text>
      </svg>
      <svg style={Object.assign({}, styles.logo.base, styles.logo.box, (props.text === false) ? styles.logo.boxOnly : {})}  xmlns="http://www.w3.org/2000/svg" width="250" height="289" viewBox="0 0 250 289">
        <path id="Outside" style={Object.assign({}, styles.logo.stroke, styles.logo.heavyStroke)} d="M124.433,231.815l73.559-42.841V103.317L126.025,61,82.982,86V36.04L126.025,9.991,239.95,78.049V213.007L126.025,278.955l-43.043-23L51.972,237.991l0.639-.365-0.639.342L10.028,214.025V78.049L51.972,54.007V188.974Z"/>
      </svg>
      <svg style={Object.assign({}, styles.logo.base, styles.logo.text, styles.logo.stroke, styles.logo.ox, (props.text === false) ? styles.logo.hide : {})}  xmlns="http://www.w3.org/2000/svg" width="75" height="42" viewBox="0 0 75 42">
        <text x="0" y="42">OX</text>
      </svg>
    </div>
  </div>
};

export default Radium(Logo);
