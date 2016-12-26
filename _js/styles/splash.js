/**
 * Default splash screen styles
 * TODO remove dead code
 */

import Radium from "radium"

const animation = {
  fadeIn: Radium.keyframes({
    "0%":   { opacity: "0" },
    "100%": { opacity: "1" }
  }),
  fadeOut: Radium.keyframes({
    "0%":   { opacity: "1" },
    "100%": { opacity: "0" }
  }),
  spinCube: Radium.keyframes({
    "0%":   { transform: "rotateY(0)" },
    "100%": { transform: "rotateY(360deg)" }
  }),
  zoomCubeIn: Radium.keyframes({
    "0%":   { transform: "scale(1) rotateZ(15deg)", left: "900px", top: "452px" },
    "100%": { transform: "scale(13) rotateZ(0)", left: "-15px", top: "-335px" }
  }),
  zoomCubeOut: Radium.keyframes({
    "0%":   { transform: "scale(13) rotateZ(0)", left: "-15px", top: "-335px" },
    "100%": { transform: "scale(1) rotateZ(15deg)", left: "900px", top: "452px" }
  }),
  removeCubeDetail: Radium.keyframes({
    "0%":   { borderColor: "#fff", boxShadow: "inset 0 0 30px rgba(255,255,255,0.4)" },
    "100%": { borderColor: "#000", boxShadow: "inset 0 0 30px rgba(0,0,0,1)" }
  }),
  restoreCubeDetail: Radium.keyframes({
    "0%":   { borderColor: "#000", boxShadow: "inset 0 0 30px rgba(0,0,0,1)" },
    "100%": { borderColor: "#fff", boxShadow: "inset 0 0 30px rgba(255,255,255,0.4)" }
  })
}

export default {
  fadeOutOnZero: {
    animation: "fadeOut 1s ease-in forwards",
    animationName: animation.fadeOut
  },
  omnibar: {
    placement: {
      position: "absolute",
      left: "0",
      top: "50px",
      width: "1920px",
      textAlign: "center",
      fontSize: "30px",
      opacity: "0"
    },
    fadeIn: {
      visibility: "visible",
      animation: "fadeIn 2s ease-out 2s forwards",
      animationName: animation.fadeIn
    },
    fadeOut: {
      animation: "fadeOut 2s ease-in forwards",
      animationName: animation.fadeOut
    },
    noShow: {
      visibility: "hidden"
    }
  }
};
