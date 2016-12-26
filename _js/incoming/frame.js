import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../styles/overlay"
import typography from "../styles/typography"
import splashStyles from "../styles/splash"
import items from "./ticker"

import Countdown from "../lib/countdown"
import Omnibar from "../lib/omnibar"
import Logo from "../shared/logo"

const animation = {
  fadeOut: Radium.keyframes({
    "0%":   { opacity: 1 },
    "30%": { opacity: 0 },
    "100%": { opacity: 0 }
  }),
  bgColor: Radium.keyframes({
    "0%":   {  },
    "30%": { background: "#2A2A5C" },
    "100%": { background: "#000" }
  })
}

const styles = {
  frame: {
    chroma: {
      background: "#0f0"
    },
    toCubecolor: {
      animation: "bgColor 3s ease-in forwards",
      animationName: animation.bgColor
    }
  },
  note: Object.assign({}, typography.base, {
    position: "absolute",
    top: "645px",
    left: "1050px",
    fontSize: "48px"
  }),
  logo: {
    position: "absolute",
    left: "83px",
    top: "343px",
    transform: "scale(3.8)"
  },
  fadeOut: {
    animation: "fadeOut 3s ease-in forwards",
    animationName: animation.fadeOut
  },
  countdown: {
    placement: {
      width: "1920px",
      position: "absolute",
      top: "840px",
      textAlign: "center"
    },
    all: Object.assign({}, typography.base, {
      fontSize: "130px",
      fontWeight: "bold",
      textAlign: "center",
      display: "inline-block",
      width: "70px"
    }),
    colon: {
      width: "40px"
    }
  }
};

const omniIn = (str) => {
  return <span style={Object.assign({}, typography.base, splashStyles.omnibar.placement, splashStyles.omnibar.fadeIn)}>{str}</span>
}

const omniOut = (str) => {
  return <span style={Object.assign({}, typography.base, splashStyles.omnibar.placement, splashStyles.omnibar.fadeOut)}>{str}</span>
}

const omniNo = (str) => {
  return <span style={Object.assign({}, typography.base, splashStyles.omnibar.placement, splashStyles.omnibar.noShow)}>{str}</span>
}

const countdownNumber = (str) => {
  return <span style={styles.countdown.all}>{str}</span>
}

const countdownColon = (str) => {
  return <span style={Object.assign({}, styles.countdown.all, styles.countdown.number)}>{str}</span>
}

// layout
const Frame = Radium((props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    (styles.frame[props.background]) ? styles.frame[props.background] : {},
    (props.done) ? styles.frame.toCubecolor : {}
  )

  return <div style={frameStyles}>
    <div style={Object.assign({}, (props.done) ? styles.fadeOut : {})}><Omnibar delay={props.timer} onStyleIn={omniIn} onStyleOut={omniOut} onNoStyle={omniNo} items={items} /></div>
    <div style={Object.assign({}, styles.logo, (props.done) ? styles.fadeOut : {})}><Logo spin={true} infinite={true} bStrokeColor={"#000"} bFillColor={"#151431"} cubeFillColor={"#2A2A5C"} cubeStrokeColor={"#fff"} cubeStroke={6} filter={"drop-shadow(3px 3px 5px rgba(0,0,0,0.75))"} /></div>
    <h1 style={Object.assign({}, styles.note, (props.done) ? styles.fadeOut : {})}>STREAM IS STARTING SOON</h1>
    <div style={Object.assign({}, styles.countdown.placement, (props.done) ? styles.fadeOut : {})}><Countdown onStyleNumber={countdownNumber} onStyleColon={countdownColon} onComplete={props.onCountdownComplete} start={props.countdown}/></div>
  </div>
})

// wrapper: manages the completion of countdown to trigger a "done" state in the frame
class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false
    };
  }
  onCountdownComplete() {
    this.setState(Object.assign({}, this.state, {
      done: true
    }));
  }
  render() {
    return <Frame {...this.props} done={this.state.done} onCountdownComplete={() => { this.onCountdownComplete.apply(this, arguments) }} />
  }
}

export default Radium(Wrapper);
