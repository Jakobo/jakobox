/**
 * Destiny Display frame
 * Does all the heavy lifting for the Destiny twitch frame.
 * Lays out the objects onto the 1920x1080 screen. This may become
 * obsolete if the Generic frame style can be leveraged. However, that
 * might just be premature optimizing.
 */

import React from "react"
import { render } from "react-dom"
import Radium from "radium"

import overlay from "../styles/overlay"

import LowerThird from "../shared/lowerthird"
import Cam from "../shared/cam"

import ExpandingLogo from "../shared/lowerthird/expand"
import GGGRCobrand from "../shared/lowerthird/gggr"
import {makeAnnouncements} from "../shared/lowerthird/announcements"
import {makeWatermark} from "../shared/lowerthird/watermark"
import destinyFacts from "./ticker.js"

const playlist = [
  makeWatermark(6),
  makeAnnouncements(destinyFacts, 3, true),
  makeWatermark(1),
  ExpandingLogo,
  GGGRCobrand
];

const styles = {
  frame: {
    chroma: {
      background: "#0f0"
    },
    pvp: {
      background: "url(https://i.ytimg.com/vi/KiKMW9RrSIY/maxresdefault.jpg) top left no-repeat"
    },
    message: {
      background: "url(https://ibin.co/2yWLfHG6o1ig.jpg) top left no-repeat"
    },
    orbit: {
      background: "url(http://cdn-thumbthrone.s3.amazonaws.com/wp-content/uploads/2014/09/Destiny_20140913173803.jpg) top left no-repeat"
    },
    local: {
      background: "url(/_assets/screens/destiny.jpg) top left no-repeat"
    }
  },
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
    top: "400px",
    left: "3px"
  }
};

const Frame = (props) => {
  const frameStyles = Object.assign({},
    overlay.base,
    (styles.frame[props.background]) ? styles.frame[props.background] : {}
  )

  const followUrl = (props.fakeFollows) ? "http://u.muxy.io/dashboard/alerts/demo/g9djjNHgai340bmM76i2Fhfe5nyiMKSX" : "http://a.muxy.io/alert/jakobox/srX-UDXTDVsAURa8mWWdPkAVxz0NA94E"

  return <div style={frameStyles}>
    <div style={styles.cam}><Cam color={"#2a3f56"} accent={"#df8926"}></Cam></div>
    <iframe style={styles.follow} src={followUrl} seamless="seamless" />
    <LowerThird playlist={playlist}></LowerThird>
  </div>
};

export default Radium(Frame);
