import React, {Component} from "react"
import { connect } from "react-redux"

import Cam from "../cam/admin"

const panels = {
  // "cam": Cam
}

const Chooser = (props) => {
  const Component = panels[props.panel];
  if (!Component) return null;

  return <Component />
}

const ConnectedChooser = connect(
  (state, ownProps) => {
    return {
      panel: state.admin.component
    }
  }
)(Chooser)

export default ConnectedChooser;
