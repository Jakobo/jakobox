/**
 * Lower Thirds
 * Creates a bottom-right Lower Thirds based on the `Box` logo.
 * Playlists can be added to LowerThirds, and it will handle dispatching
 * the correct component with an onComplete callback to handle the next item
 * in the playlist.
 */

import React, {PropTypes} from "react"
import { render } from "react-dom"
import Radium from "radium"

import Logo from "./logo"
import ExpandingLogo from "./lowerthird/expand"

import {makeAnnouncements} from "./lowerthird/announcements"
import destinyFacts from "../destiny/ticker.js"

// default component is the spinning logo for X cycles
const makeDefault = (cycles) => {
  return (props) => {
    const timeUntilDone = (cycles || 1) * 45000;
    window.setTimeout(() => {
      props.onComplete()
    }, timeUntilDone);
    return <div style={props.logoStyle}><Logo spin={true} infinite={true} text={false} /></div>
  }
};

const playlists = {
  default: [makeDefault(6), ExpandingLogo],
  destiny: [makeAnnouncements(destinyFacts, 3, true)]
};

const logoStyle = {
  left: "1800px",
  top: "960px",
  position: "absolute"
};

const shift = (val, by) => {
  return (parseInt(val) + by) + "px"
}

const posX = (by) => {
  return shift(logoStyle.left, by);
}

const posY = (by) => {
  return shift(logoStyle.top, by);
}

class LowerThird extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.cachebreak = 0;
    this.playlist = playlists.default.concat(playlists[this.props.playlist] || []);
    this.onComplete = this.onComplete.bind(this);
  }

  onComplete() {
    // attempt to select the next component
    let newState = Object.assign({}, this.state);
    newState.current = newState.current + 1;
    if (newState.current >= this.playlist.length) {
      newState.current = 0;
    }

    this.setState(newState);
  }

  render() {
    const Component = this.playlist[this.state.current];
    return <div><Component key={this.cachebreak++} onComplete={this.onComplete} posX={posX} posY={posY} logoStyle={logoStyle} /></div>
  }
}

export default LowerThird;
