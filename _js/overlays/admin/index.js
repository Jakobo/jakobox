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

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import getMuiTheme from "material-ui/styles/getMuiTheme"
import {deepPurple700} from "material-ui/styles/colors"

import AppBar from "../../components/admin/appbar"
import PanelRouter from "../../components/admin/panelrouter"

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
  iframe: {
    border: "0",
    margin: "0",
    padding: "0"
  },
  flexbox: {
    display: "flex",
  },
  flexboxColumn: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "stretch",
    alignContent: "flex-start"
  },
  flexboxRows: {
    flexDirection: "column"
  },
  column: {
    width: "33.333%",
    minWidth: "425px",
    height: "100%"
  },
  flexboxToContent: {
    flexGrow: "0",
    flexShrink: "1",
    flexBasis: "auto"
  },
  flexboxFill: {
    flexGrow: "1",
    flexShrink: "1",
    flexBasis: "auto"
  },
  widthFull: {
    width: "100%"
  },
  heightOneThird: {
    height: "33vh"
  },
  heightTwoThirds: {
    height: "66vh"
  },
  heightFull: {
    height: "100vh"
  },
  divider: {
    margin: "8px 0 8px 0"
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepPurple700,
  },
});

// layout
const Frame = Radium((props) => {
  // background layer: twitch video, unclickable div on top
  // Top left corner (toggle DB visibility)
  // column 1: Screen Selector, Component Selector, Save/Cancel, remainder is the config for it
  // column 2: Muxy Ticker 100% height
  // column 3: Twitch Chat 100% height
  return <MuiThemeProvider muiTheme={muiTheme}>
    <div style={Object.assign({}, styles.base, styles.typography)}>
      <div style={Object.assign({}, styles.flexbox, styles.flexboxColumn)}>
        <div style={styles.column}>
          <AppBar />
          <PanelRouter />
        </div>
        <div style={styles.column}>
          <iframe
            src="https://u.muxy.io/live"
            frameBorder="0"
            scrolling="no"
            style={Object.assign({}, styles.iframe, styles.flexboxFill, styles.heightFull, styles.widthFull)}
            seamless="seamless">
          </iframe>
        </div>
        <div style={Object.assign({}, styles.flexbox, styles.flexboxRows, styles.column)}>
          <iframe
            src="http://player.twitch.tv/?channel=jakobox"
            style={Object.assign({}, styles.iframe, styles.flexboxToContent, styles.heightOneThird, styles.widthFull)}
            frameBorder="0"
            scrolling="no"
            allowFullScreen="false"
            muted="true"
            seamless="seamless">
          </iframe>
          <iframe
            src="http://www.twitch.tv/jakobox/chat"
            style={Object.assign({}, styles.iframe, styles.flexboxFill, styles.heightTwoThirds, styles.widthFull)}
            frameBorder="0"
            scrolling="no"
            seamless="seamless">
          </iframe>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
})

const ConnectedFrame = connect(
  (state, ownProps) => {
    return {};
  },
  (dispatch) => {
    return {
      onLeftIconButtonTouchTap: () => {
        console.log("onLeftIconButtonTouchTap");
      }
    }
  }
)(Radium(Frame))

export default ConnectedFrame;
