// master app router
// selects the overlay to run based on the store

/**
 * Destiny App Entry Point
 * Params go in, destiny frame comes out. It has a lot less options
 * than the generic frame. It could probably leverage the generic frame
 * with some props management & some support for custom cam objects and
 * custom positioning logic.
 */

// MUST POLYFILL FOR NON-ES2015 ENVIRONMENTS
import "babel-polyfill"

import React from "react"
import { render } from "react-dom"
import {StyleRoot, Style} from "radium";

import { connect, Provider } from "react-redux"

import createStore from "./store";
import {createOnStorage} from "./middleware";
const store = createStore("jakobox");
const onStorage = createOnStorage(store);
window.addEventListener("storage", onStorage);

import initConsoleActions from "./lib/console_actions"
initConsoleActions(store);

// Both Router and ConnectedRouter are small enough to leave in App for now
// it's always possible to move them elsewhere, but until they are larger,
// we don't want a ton of extra files
import Destiny from "./overlays/destiny"
import BRB from "./overlays/brb"
import Generic from "./overlays/generic"
import Incoming from "./overlays/incoming/frame"
import Outgoing from "./overlays/outgoing/frame"
const screens = {
  brb: BRB,
  destiny: Destiny,
  generic: Generic,
  incoming: Incoming,
  outgoing: Outgoing
}

const Router = (props) => {
  const Component = screens[props.screen];
  return <Component />
}

const ConnectedRouter = connect(
  (state, ownProps) => {
    return {
      screen: state.screen.current || "destiny"
    }
  }
)(Router)

// here we go...
render(
  <Provider store={store}>
    <StyleRoot>
      <ConnectedRouter />
    </StyleRoot>
  </Provider>,
  document.getElementById("app")
);
