import React, {Component} from "react"
import { connect } from "react-redux"

import Destiny from "./destiny"

const panels = {
  "destiny": Destiny
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
