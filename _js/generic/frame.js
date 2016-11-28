import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../styles/overlay"
import typography from "../styles/typography"

import Logo from "./logo"

const styles = {
  frame: {
    chroma: {
      background: "#0f0"
    },
    code: {
      background: "url(https://ibin.co/33Uam0QIrYAu.png) top left no-repeat",
      backgroundSize: "cover"
    },
    destiny: {
      background: "url(https://i.ytimg.com/vi/KiKMW9RrSIY/maxresdefault.jpg) top left no-repeat"
    },
    destiny2: {
      background: "url(http://cdn-thumbthrone.s3.amazonaws.com/wp-content/uploads/2014/09/Destiny_20140913173803.jpg) top left no-repeat"
    },
    ki: {
      background: "url(https://i.ytimg.com/vi/qInozta1EzM/maxresdefault.jpg) top left no-repeat"
    }
  },
  logo: {
    position: "absolute"
  }
};

const logoXY = (x = "left", y = "top") => {
  const xs = {
    left: 0,
    center: 730,
    right: 1470
  };
  const ys = {
    top: 0,
    lowthird: 847,
    bottom: 979
  };
  return {
    left: ((typeof xs[x] != "undefined") ? xs[x] : xs.left) + "px",
    top: ((typeof ys[y] != "undefined") ? ys[y] : xs.left) + "px",
  };
}

const stroke = (text, style) => {
  return <div style={style}>
    <div style={Object.assign({}, styles.stroke, typography.base)}>{text}</div><div style={Object.assign({}, styles.strokeFill, typography.base)}>{text}</div>
  </div>
}

const Frame = (props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    (styles.frame[props.background]) ? styles.frame[props.background] : {}
  )

  let follows = null;
  if (props.showFollows) {
    follows = <iframe style={styles.testFollow} src="http://u.muxy.io/dashboard/alerts/demo/g9djjNHgai340bmM76i2Fhfe5nyiMKSX" border="0" seamless="seamless" />
  }

  return <div style={frameStyles}>
    <div style={Object.assign({}, styles.logo, logoXY(props.logoX, props.logoY))}><Logo spin={true} infinite={true}></Logo></div>
  </div>
};

/*
stroke: {
  position: "absolute",
  WebkitTextStroke: "0.2em #000",
  textStroke: "0.2em #000",
  left: "0",
  zIndex: "-1"
},
strokeFill: {
  position: "relative",
  background: "transparent",
  color: "#fff",
  textShadow: "2px 2px 0 rgba(0, 0, 0, 0.2)"
},
<div style={styles.logo}>
  <svg style={Object.assign({}, styles.logo.base, styles.logo.text, styles.logo.stroke, styles.logo.jako)} xmlns="http://www.w3.org/2000/svg" width="150" height="42" viewBox="0 0 150 42">
    <text x="0" y="42">JAKO</text>
  </svg>
  <svg style={Object.assign({}, styles.logo.base, styles.logo.box)}  xmlns="http://www.w3.org/2000/svg" width="250" height="289" viewBox="0 0 250 289">
    <path id="Inside" style={Object.assign({}, styles.logo.stroke, styles.logo.mediumStroke)} d="M168,122.01v49.957L126.025,197,82.982,171.967V122.01l43.043-26.038Z"/>
    <path id="Outside" style={Object.assign({}, styles.logo.stroke, styles.logo.heavyStroke)} d="M124.433,231.815l73.559-42.841V103.317L126.025,61,82.982,86V36.04L126.025,9.991,239.95,78.049V213.007L126.025,278.955l-43.043-23L51.972,237.991l0.639-.365-0.639.342L10.028,214.025V78.049L51.972,54.007V188.974Z"/>
  </svg>
  <svg style={Object.assign({}, styles.logo.base, styles.logo.text, styles.logo.stroke, styles.logo.ox)}  xmlns="http://www.w3.org/2000/svg" width="75" height="42" viewBox="0 0 75 42">
    <text x="0" y="42">OX</text>
  </svg>
</div>
{follows}
<div style={styles.cam.base}>
  <div style={styles.cam.reset}>
    <div style={styles.cam.frame}></div>
    <div style={styles.cam.accentTop}></div>
    <div style={styles.cam.accentLeft}></div>
  </div>
</div>
*/

export default Radium(Frame);
