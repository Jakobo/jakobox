/**
 * Destiny Display frame
 * Does all the heavy lifting for the Destiny twitch frame.
 * Lays out the objects onto the 1920x1080 screen. This may become
 * obsolete if the Generic frame style can be leveraged. However, that
 * might just be premature optimizing.
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

import configure from "./conf"

import LowerThird from "../../components/lowerthird"
import Cam from "../../components/cam"
import Follows from "../../components/follows"

import ExpandingLogo from "../../components/lowerthird/items/expand"
import GGGRCobrand from "../../components/lowerthird/items/gggr"
import Announcements from "../../components/lowerthird/items/announcements"

// TODO: replace with Watermark, make lowerthirds support pulling props from playlist
import {makeWatermark} from "../../components/lowerthird/items/watermark"

const styles = {
  base: {
    width: "1920px",
    height: "1080px",
    overflow: "hidden",
    position: "relative",
    background: "transparent"
  }
}

const playlists = {
  normal: [
    makeWatermark(7),
    ExpandingLogo,
    Announcements,
    makeWatermark(5),
    ExpandingLogo,
    GGGRCobrand
  ],
  demo: [
    Announcements,
    ExpandingLogo,
    GGGRCobrand,
    makeWatermark(1)
  ]
}

const Frame = (props) => {
  props.defaults();

  const frameStyles = Object.assign({},
    styles.base,
    {
      background: (props.background.indexOf("http") === 0) ? `url(${props.background}) top left no-repeat` : props.background
    }
  )

  return <div style={frameStyles}>
    <Cam />
    <Follows />
    <LowerThird playlists={playlists}></LowerThird>
  </div>
};

const ConnectedFrame = connect(
  (state, ownProps) => {
    return {
      background: state.background.destiny.background
    }
  },
  (dispatch) => {
    return {
      defaults: () => {
        // place on end of event queue
        window.setTimeout(() => {
          configure(dispatch);
        });
      }
    }
  }
)(Radium(Frame))

export default ConnectedFrame;
