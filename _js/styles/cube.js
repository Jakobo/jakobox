import React from "react"
import { render } from "react-dom"
import Radium from "radium"

const animation = {
  spinCube: Radium.keyframes({
    "0%":   { transform: "rotateY(0) rotateX(0) rotateZ(0)" },
    "100%": { transform: "rotateY(360deg) rotateX(360deg) rotateZ(-360deg)" }
  }),
  spinOne: Radium.keyframes({
    "0%":   { transform: "rotateY(0) rotateX(0) rotateZ(0)" },
    "100%": { transform: "rotateY(90deg) rotateX(90deg) rotateZ(-90deg)" }
  })
}

const styles = {
  tilt: {
    transform: "rotateZ(45deg)"
  },
  reset: {
    position: "relative",
    perspective: 800,
    perspectiveOrigin: "50% 75px"
  },
  container: {
    position: "relative",
    transformStyle: "preserve-3d",
    transformOrigin: "75px 75px 0px"
  },
  spin: {
    animation: "spinCube 1s ease-in-out forwards",
    animationName: animation.spinOne
  },
  spinAlways: {
    animation: "spinCubeAlways 15s linear infinite",
    animationName: animation.spinCube
  },
  sides: {
    all: {
      position: "absolute",
      width: "150px",
      height: "150px",
      display: "block",
      background: "#000",
      boxShadow: "inset 0 0 30px rgba(255,255,255,0.4)",
      boxSizing: "border-box",
      border: "1px solid #fff"
    },
    back:   { transform: "translateZ(-75px) rotateY(180deg)" },
    right:  { transform: "rotateY(-270deg) translateX(75px)", transformOrigin: "top right" },
    left:   { transform: "rotateY(270deg) translateX(-75px)", transformOrigin: "center left" },
    top:    { transform: "rotateX(-90deg) translateY(-75px)", transformOrigin: "top center" },
    bottom: { transform: "rotateX(90deg) translateY(75px)", transformOrigin: "bottom center" },
    front:  { transform: "translateZ(75px)" }
  }
}

const inflate = (o, ...names) => {
  const space = (obj, name) => {
    let orig = obj;
    let pieces = name.split(".");
    pieces.forEach((piece) => {
      if (!obj[piece]) {
        obj[piece] = {};
      }
      obj = obj[piece];
    });
    return orig;
  }
  names.forEach((ns) => {
    space(o, ns)
  });
  return o;
}

const Cube = (props) => {
  let tempStyles = props.styles || {};
  tempStyles = inflate(tempStyles, "outer", "cube", "side", "done.outer", "done.cube", "done.side");
  return <div style={Object.assign({}, styles.tilt, tempStyles.outer, (props.done) ? tempStyles.done.outer : {})}>
    <div style={styles.reset}>
      <div style={Object.assign({},
        styles.container,
        tempStyles.container,
        (props.spin) ? styles.spin : {},
        (props.spin && props.infinite) ? styles.spinAlways : {},
        (props.done) ? tempStyles.done.cube : {}
      )}>
        <b style={Object.assign({}, styles.sides.all, styles.sides.front, tempStyles.side, (props.done) ? tempStyles.done.side : {})}></b>
        <b style={Object.assign({}, styles.sides.all, styles.sides.back, tempStyles.side, (props.done) ? tempStyles.done.side : {})}></b>
        <b style={Object.assign({}, styles.sides.all, styles.sides.top, tempStyles.side, (props.done) ? tempStyles.done.side : {})}></b>
        <b style={Object.assign({}, styles.sides.all, styles.sides.bottom, tempStyles.side, (props.done) ? tempStyles.done.side : {})}></b>
        <b style={Object.assign({}, styles.sides.all, styles.sides.left, tempStyles.side, (props.done) ? tempStyles.done.side : {})}></b>
        <b style={Object.assign({}, styles.sides.all, styles.sides.right, tempStyles.side, (props.done) ? tempStyles.done.side : {})}></b>
      </div>
    </div>
  </div>
}

export default Radium(Cube);
