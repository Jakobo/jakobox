/**
 * Generic Cam Layout
 * A generic cam that can be used in more than one layout
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

const originalStyles = {
  base: {
    position: "absolute",
    left: "0px",
    right: "0px",
    width: "1px",
    height: "1px",
    border: "0"
  }
};

const Follows = Radium((props) => {
  let styles = Object.assign({}, originalStyles);
  styles.base.left = `${props.x}px`;
  styles.base.top = `${props.y}px`;
  styles.base.width = `${props.width}px`;
  styles.base.height = `${props.height}px`;

  return <iframe style={styles.base} src={props.url}  seamless="seamless"/>
});

const ConnectedFollows = connect(
  (state, ownProps) => {
    return {
      x: ownProps.x || state.follows.x,
      y: ownProps.y || state.follows.y,
      width: ownProps.width || state.follows.width,
      height: ownProps.height || state.follows.height,
      url: ownProps.url || (state.follows.fakeFollows) ? state.follows.fakeUrl : state.follows.liveUrl
    }
  }
)(Radium(Follows))

export default ConnectedFollows;
