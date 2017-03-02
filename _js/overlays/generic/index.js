/**
 * Generic twitch stream frame that does all the heavy lifting.
 * This frame is built such that it can handle a variety of different
 * logo, cam, and follow positions in addition to turning on/off the
 * standard LowerThirds option.
 *
 * This is a good candidate to refactor later, making a Generic (abstract)
 * that is used by the Destiny frame, and a Generic (concrete) that is used
 * by the majority of this code to create the basic frame
 */

import React, { PropTypes } from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

import configure from "./conf"

import LowerThirds from "../../components/lowerthird"

import overlay from "../../styles/overlay"

import Logo from "../../components/logo"
import Cam from "../../components/cam"

// TODO: replace with Watermark, make lowerthirds support pulling props from playlist
import {makeWatermark} from "../../components/lowerthird/items/watermark"
import ExpandingLogo from "../../components/lowerthird/items/expand"
import GGGRCobrand from "../../components/lowerthird/items/gggr"

const playlists = {
  normal: [
    makeWatermark(10),
    ExpandingLogo,
    GGGRCobrand
  ]
}

const styles = {
  base: {
    width: "1920px",
    height: "1080px",
    overflow: "hidden",
    position: "relative",
    background: "transparent"
  },
  typography: {
    fontFamily: '"Helvetica Neue Condensed", "Helvetica Neue", Helvetica, sans-serif',
    fontSize: "26px"
  },
  logo: {
    position: "absolute"
  },
  cam: {
    position: "absolute"
  },
  follows: {
    position: "absolute",
    border: "0px solid transparent",
    width: "405px",
    height: "35px",
    filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.75))",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    perspective: 1000
  }
};

const Frame = (props) => {
  const frameStyles = Object.assign({},
    styles.base,
    {
      background: (props.background.indexOf("http") === 0) ? `url(${props.background}) top left no-repeat` : props.background
    }
  )

  return <div style={frameStyles}>
    <Cam />
    <Logo />
    <LowerThirds playlists={playlists} />
  </div>
};

Frame.propTypes = {
  background: PropTypes.string
};

Frame.defaultProps = {
  background: ""
};

const ConnectedFrame = connect(
  (state, ownProps) => {
    return {
      background: state.background.generic.background
    }
  }
)(Radium(Frame))

export default ConnectedFrame;
