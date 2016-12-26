// random factoid feed
import React, {PropTypes} from "react"
import { render } from "react-dom"
import Radium from "radium"

import Logo from "../logo"
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
  const width = props.posX(-5);
  const widthRaw = parseInt(width);

  const containerStyles = {
    position: "absolute",
    left: "0px",
    top: props.posY(45),
    width: width,
    backgroundColor: "#f00"
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
      textAnchor: "end"
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
  const dT = (props.line1.length > 60) ? 8 : 6;
  const outerMotion = timeline()
    .from(0,      { opacity: 0 })
    .to(0.3,      { opacity: 1 }, "ease-in")
    .from(0.1,    { left: "0px" })
    .to(dT,       { left: "-130px", }, "ease-in-out")
    .from(dT,     { left: "0px", opacity: 1 })
    .to(dT + 0.8, { left: "130px", opacity: 0 }, "ease-in");
  const innerMotion = timeline()
    .from(0.1,    { left: "0px" })
    .to(dT,       { left: "-100px" })
    .from(dT,     { left: "0px" })
    .to(dT + 0.5, { left: "50px" })

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

const makeAnnouncements = (items, number, shuffle) => {
  return (props) => {
    return <Announcements items={items} sample={number} shuffle={shuffle} {...props} />
  }
}

export {makeAnnouncements};
export default Announcements;
