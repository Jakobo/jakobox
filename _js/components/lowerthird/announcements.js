/**
 * Announcements Lower Thirds
 * Displays a set of announcements passed in as an array. Animates them in
 * a sweeping motion towards the left before clearing.
 *
 * Heirarchy:
 * |- Announcements (root) - selects item, renders an <Announcement>
 *    |- Announcement - manages animation of a single announcement
 *
 * An announcement signals <Announcements> via onComplete, while the root
 * element can signal completion of all announcements via its props.onComplete
 * value
 */

import React, {PropTypes} from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

import Logo from "../logo"
import Watermark from "../watermark"
import Animation, {timeline} from "../animation"

const shuffle = (array) => {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// this HOC selects an announcement to display
class Announcements extends React.Component {
  constructor(props) {
    super(props);
    // extract facts, shuffle if requested, sample if requested
    this.items = (this.props.shuffle) ? shuffle(this.props.items) : this.props.items;
    this.items = (this.props.sample) ? this.items.slice(0, this.props.sample) : this.items;
    this.state = {
      current: 0
    };
    this.next = this.next.bind(this);
  }

  next() {
    let newState = Object.assign({}, this.state);
    newState.current += 1;
    if (newState.current >= this.items.length) {
      this.props.onComplete();
    }
    else {
      window.setTimeout(() => {
        this.setState(newState);
      }, 2000);
    }
  }

  render() {
    const [line1, line2] = this.items[this.state.current].split("\n");
    return <Announcement key={this.state.current} line1={line1} line2={line2} onComplete={this.next} posX={this.props.posX} posY={this.props.posY} logoStyle={this.props.logoStyle} />
  }
}

// the announcement fragment handles displaying the announcement with
// the logo that spins once
const Announcement = Radium((props) => {
  const width = props.posX(-20);
  const widthRaw = parseInt(width);

  const containerStyles = {
    position: "absolute",
    left: "0px",
    top: props.posY(45),
    width: width
  };

  const textStyles = {
    largeText: {
      width: width,
      position: "absolute",
      top: (props.line2) ? "0px" : "20px"
    },
    smallText: {
      width: width,
      position: "absolute",
      top: "30px"
    },
    svg: {
      display: "block",
      overflow: "visible",
      fontSize: "24px",
      fontFamily: "HelveticaNeue",
      fontWeight: 600,
      color: "#fff",
      fill: "#fff",
      stroke: "#000",
      strokeWidth: "1",
      textAnchor: "end",
      filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.75))",
      transform: "translateZ(0)",
      backfaceVisibility: "hidden",
      perspective: 1000
    },
    svgSmall: {
      fontSize: "18px",
      fontWeight: 600
    }
  }

  // fast fade in
  // slow drift left (line 1)
  // fast drift left (line 2 if exists)
  // snap back & fast fade out
  // stall timing based on string size
  const dT = (props.line1.length > 60) ? 6 : 8;
  const outerMotion = timeline()
    .from(0,      { opacity: 0 })
    .to(0.3,      { opacity: 1 }, "linear")
    .from(0.1,    { transform: "translateX(0)" })
    .to(dT,       { transform: "translateX(-40px)" }, "linear")
    .from(dT,     { transform: "translateX(0)", opacity: 1 })
    .to(dT + 0.8, { transform: "translateX(40px)", opacity: 0 }, "linear");
  const innerMotion = timeline()
    .from(0.1,    { transform: "translateX(0)" })
    .to(dT,       { transform: "translateX(-100px)" }, "linear")
    .from(dT,     { transform: "translateX(0)" })
    .to(dT + 0.8, { transform: "translateX(100px)" }, "linear")

  const capLine2 = (props.line2) ? props.line2.toUpperCase() : "";

  window.setTimeout(() => {
    props.onComplete();
  }, (outerMotion.duration() * 1000) + 1);

  return <div>
    <div style={containerStyles}>
      <Animation timeline={outerMotion.timeline()}>
        <div style={textStyles.largeText}>
          <svg style={textStyles.svg} xmlns="http://www.w3.org/2000/svg" width={widthRaw} height="42" viewBox={`0 0 ${widthRaw} 42`}>
            <text x="100%">{props.line1}</text>
          </svg>
        </div>
        <Animation timeline={innerMotion.timeline()}>
          <div style={textStyles.smallText}>
            <svg style={Object.assign({}, textStyles.svg, textStyles.svgSmall)} xmlns="http://www.w3.org/2000/svg" width={widthRaw} height="42" viewBox={`0 0 ${widthRaw} 42`}>
              <text x="100%">{capLine2}</text>
            </svg>
          </div>
        </Animation>
      </Animation>
    </div>
    <div style={props.logoStyle}><Logo spin={true} infinite={false} text={false} /></div>
  </div>

});

const ConnectedAnnouncements = connect(
  (state, ownProps) => {
    return {
      items: state.lowerthirds[state.screen.current].ticker.items,
      number: state.lowerthirds[state.screen.current].ticker.size,
      shuffle: state.lowerthirds[state.screen.current].ticker.shuffle
    }
  }
)(Announcements)

export default ConnectedAnnouncements;
