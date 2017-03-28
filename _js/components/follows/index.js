/**
 * Generic Cam Layout
 * A generic cam that can be used in more than one layout
 */

import React from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

import {objectAt, firstOf} from "../../lib/components"

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

  return <iframe style={styles.base} src={(props.fakeFollows) ? props.fakeUrl : props.liveUrl} seamless="seamless"/>
});

const ConnectedFollows = connect(
  (state, ownProps) => {
    const scope = objectAt(state, ownProps.source);
    return {
      x: firstOf(ownProps.x, scope.x),
      y: firstOf(ownProps.y, scope.y),
      width: firstOf(ownProps.width, scope.width),
      height: firstOf(ownProps.height, scope.height),
      fakeFollows: firstOf(ownProps.fakeFollows, scope.fakeFollows),
      fakeUrl: firstOf(ownProps.fakeUrl, scope.fakeUrl),
      liveUrl: firstOf(ownProps.liveUrl, scope.liveUrl)
    }
  }
)(Radium(Follows))

export default ConnectedFollows;
