import React, {Component} from "react"
import { connect } from "react-redux"

import Cam from "../cam/admin"
import Follow from "../follows/admin"
import Logo from "../logo/admin"
import LT from "../lowerthird/admin"

const panels = {
  "cam": Cam,
  "follows": Follow,
  "logo": Logo,
  "lowerthird": LT
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
