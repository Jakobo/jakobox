/**
 * Admin Dashboard. Doing all the awesome stuff I wish Twitch could have done for me,
 * but here we are writing some spiffy code ourselves. The Dashboard is laid out for
 * a laptop screen using % values. The default laptop is 1440 x 900 for reference.
 * We're going to heavily leverage flexbox to build the columns, and materialUI
 * for the UI pieces
 * https://philipwalton.github.io/solved-by-flexbox/demos/grids/
 * http://www.material-ui.com/#/components/tabs
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

// TODO: components to add
// import Chat from "../../components/twitch/chat"
// import Video from "../../components/twitch/video"
// import Muxy from "../../components/muxy/ticker"

const styles = {
  base: {
    width: "100%",
    height: "100%",
    overflow: "visible",
    position: "relative",
    background: "transparent",
    margin: "0px",
    padding: "0px"
  },
  typography: {
    fontFamily: '"Helvetica Neue Condensed", "Helvetica Neue", Helvetica, sans-serif',
    fontSize: "16px"
  },
  flexbox: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
    alignContent: "flex-start"
  },
  column: {
    width: "33.333%"
  }
};

// layout
const Frame = Radium((props) => {
  // background layer: twitch video, unclickable div on top
  // Top left corner (toggle DB visibility)
  // column 1: Screen Selector, Component Selector, Save/Cancel, remainder is the config for it
  // column 2: Muxy Ticker 100% height
  // column 3: Twitch Chat 100% height
  return <div style={Object.assign({}, styles.base, styles.typography)}>
    <div>TODO master visibility toggle</div>
    <div>TODO twitch Video layer</div>
    <div style={styles.flexbox}>
      <div style={styles.column}>column 1</div>
      <div style={styles.column}>column 2</div>
      <div style={styles.column}>column 3</div>
    </div>
  </div>
})

export default Frame;
