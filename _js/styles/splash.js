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
  logo: {
    width: "550px",
    height: "550px",
    position: "absolute",
    left: "685px",
    top: "265px",
  },
  jakoboxText: {
    fontSize: "180px",
    fontWeight: "bold",
    position: "absolute",
    top: "425px"
  },
  jako: {
    textAlign: "right",
    left: "235px"
  },
  ox: {
    left: "1192px"
  },
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
  },
  cube: {
    placement: {
      transform: "rotateZ(15deg)",
      position: "absolute",
      left: "900px",
      top: "452px"
    },
    reset: {
      position: "relative",
      perspective: 800,
      perspectiveOrigin: "50% 75px"
    },
    container: {
      position: "relative",
      transformStyle: "preserve-3d",
      transformOrigin: "75px 75px 0px",
      animation: "spinCube 5s infinite linear",
      animationName: animation.spinCube
    },
    zoomIn: {
      zIndex: 2,
      animation: "zoomCubeIn 2s ease-in 0.5s forwards",
      animationName: animation.zoomCubeIn
    },
    zoomOut: {
      zIndex: 2,
      animation: "zoomCubeOut 2s ease-in 0.5s forwards",
      animationName: animation.zoomCubeOut
    },
    sides: {
      removeEdges: {
        animation: "removeCubeDetail 2s ease-in 0.5s forwards",
        animationName: animation.removeCubeDetail
      },
      restoreEdges: {
        animation: "restoreCubeDetail 2s ease-in 0.5s forwards",
        animationName: animation.restoreCubeDetail
      },
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
};
