import React, {Component} from "react"
import { connect } from "react-redux"

import Destiny from "./destiny"
import Generic from "./generic"
import Interstitial from "./interstitial"
import BRB from "./brb"

const panels = {
  "destiny": Destiny,
  "generic": Generic,
  "incoming": Interstitial,
  "outgoing": Interstitial,
  "brb": BRB
}

const PanelRouter = (props) => {
  const Component = panels[props.panel];
  if (!Component) return null;

  return <Component />
}

const ConnectedPanelRouter = connect(
  (state, ownProps) => {
    return {
      panel: state.admin.panel
    }
  }
)(PanelRouter)

export default ConnectedPanelRouter;
