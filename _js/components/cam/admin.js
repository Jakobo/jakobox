/**
 * Generic Cam Layout
 * A generic cam that can be used in more than one layout
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"

const CamAdmin = (props) => {

};

const ConnectedCamAdmin = connect(
  (state, ownProps) => {
    return {
      color: state.color[state.admin.target].camera.main,
      accent: state.color[state.admin.target].camera.accent,
      x: state.camera[state.admin.target].x,
      y: state.camera[state.admin.target].y,
      visible: state.camera[state.admin.target].visible
    }
  },
  (dispatch) => {
    return {
      onChangeColor: (main, accent) => {

      },
      onChangePosition: (x, y) => {

      },
      onChangeVisibility: (visible) => {
        
      }
    }
  }
)(CamAdmin)

export default ConnectedCamAdmin;
