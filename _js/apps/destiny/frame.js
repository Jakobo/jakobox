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

import overlay from "../../styles/overlay"

import LowerThird from "../../components/lowerthird"
import Cam from "../../components/cam"

import ExpandingLogo from "../../components/lowerthird/expand"
import GGGRCobrand from "../../components/lowerthird/gggr"
import {makeAnnouncements} from "../../components/lowerthird/announcements"
import {makeWatermark} from "../../components/lowerthird/watermark"
import destinyFacts from "./facts.js"

const playlist = [
  makeWatermark(7),
  ExpandingLogo,
  makeAnnouncements(destinyFacts, 3, true),
  makeWatermark(5),
  ExpandingLogo,
  GGGRCobrand
];

const demoPlaylist = [
  makeAnnouncements(destinyFacts, 3, true),
  ExpandingLogo,
  GGGRCobrand,
  makeWatermark(1)
];

const styles = {
  follow: {
    border: "0",
    width: "682px",
    height: "210px",
    right: "0",
    top: "283px",
    position: "absolute"
  },
  cam: {
    position: "absolute",
    top: "460px",
    left: "3px"
  }
};

const Frame = (props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    {
      background: (props.background.indexOf("http") === 0) ? `url(${props.background}) top left no-repeat` : props.background
    }
  )

  const followUrl = (props.fakeFollows) ? "http://u.muxy.io/dashboard/alerts/demo/g9djjNHgai340bmM76i2Fhfe5nyiMKSX" : "http://a.muxy.io/alert/jakobox/srX-UDXTDVsAURa8mWWdPkAVxz0NA94E"

  return <div style={frameStyles}>
    <div style={styles.cam}><Cam color={"#2a3f56"} accent={"#df8926"}></Cam></div>
    <iframe style={styles.follow} src={followUrl} seamless="seamless" />
    <LowerThird playlist={(props.demoPlaylist) ? demoPlaylist : playlist}></LowerThird>
  </div>
};

const ConnectedFrame = connect(
  (state, ownProps) => {
    return {
      background: state.background.background,
      fakeFollows: state.testdata.fakeFollows,
      demoPlaylist: state.testdata.demoPlaylist
    }
  }
)(Radium(Frame))

export default ConnectedFrame;
