import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../styles/overlay"
import typography from "../styles/typography"
import splashStyles from "../styles/splash"
import items from "./ticker"

import Countdown from "../lib/countdown"
import Omnibar from "../lib/omnibar"

const styles = {
  frame: {
    chroma: {
      background: "#0f0"
    }
  },
  note: Object.assign({}, typography.base, {
    position: "absolute",
    top: "715px",
    left: "1050px",
    fontSize: "48px"
  }),
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
    (styles.frame[props.background]) ? styles.frame[props.background] : {}
  )

  let follows = null;
  if (props.showFollows) {
    follows = <iframe style={styles.testFollow} src="https://u.muxy.io/dashboard/alerts/demo/g9djjNHgai340bmM76i2Fhfe5nyiMKSX" border="0" seamless="seamless" />
  }

  return <div style={frameStyles}>
    <Omnibar delay={props.timer} onStyleIn={omniIn} onStyleOut={omniOut} onNoStyle={omniNo} items={items} />
    <div style={Object.assign({}, typography.base, splashStyles.jakoboxText, splashStyles.jako)}>JAKO</div>
    <div style={Object.assign({}, typography.base, splashStyles.jakoboxText, splashStyles.ox)}>OX</div>
    <svg style={splashStyles.logo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 289">
      <path d="M124.433,231.815l73.559-42.841V103.317L126.025,61,82.982,86V36.04L126.025,9.991,239.95,78.049V213.007L126.025,278.955l-43.043-23L51.972,237.991l0.639-.365-0.639.342L10.028,214.025V78.049L51.972,54.007V188.974"/>
    </svg>
    <div style={Object.assign({}, splashStyles.cube.placement, (props.done) ? splashStyles.cube.zoomIn : {})}>
      <div style={splashStyles.cube.reset}>
        <div style={Object.assign({}, splashStyles.cube.container)}>
          <b style={Object.assign({}, splashStyles.cube.sides.all, splashStyles.cube.sides.front, (props.done) ? splashStyles.cube.sides.removeEdges : {})}></b>
          <b style={Object.assign({}, splashStyles.cube.sides.all, splashStyles.cube.sides.back, (props.done) ? splashStyles.cube.sides.removeEdges : {})}></b>
          <b style={Object.assign({}, splashStyles.cube.sides.all, splashStyles.cube.sides.top, (props.done) ? splashStyles.cube.sides.removeEdges : {})}></b>
          <b style={Object.assign({}, splashStyles.cube.sides.all, splashStyles.cube.sides.bottom, (props.done) ? splashStyles.cube.sides.removeEdges : {})}></b>
          <b style={Object.assign({}, splashStyles.cube.sides.all, splashStyles.cube.sides.left, (props.done) ? splashStyles.cube.sides.removeEdges : {})}></b>
          <b style={Object.assign({}, splashStyles.cube.sides.all, splashStyles.cube.sides.right, (props.done) ? splashStyles.cube.sides.removeEdges : {})}></b>
        </div>
      </div>
    </div>
    <h1 style={styles.note}>STREAM IS STARTING SOON</h1>
    <div style={styles.countdown.placement}><Countdown onStyleNumber={countdownNumber} onStyleColon={countdownColon} onComplete={props.onCountdownComplete} start={props.countdown}/></div>
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
