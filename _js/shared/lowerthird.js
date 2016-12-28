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

import GGGRCobrand from "./lowerthird/gggr"
import ExpandingLogo from "./lowerthird/expand"
import {makeWatermark} from "./lowerthird/watermark"

const defaultPlaylist = [makeWatermark(8), ExpandingLogo, GGGRCobrand];

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
    this.playlist = (this.props.playlist) ? this.props.playlist : defaultPlaylist;
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
