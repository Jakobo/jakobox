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

import params from "./lib/url"
import createStore from "./store";
import {createPeerConnection} from "./middleware/peerjs";
import initConsoleActions from "./lib/console_actions"
import { setScreen } from "./ducks/screen"

// Both Router and ConnectedRouter are small enough to leave in App for now
// it's always possible to move them elsewhere, but until they are larger,
// we don't want a ton of extra files
import Admin from "./overlays/admin"
import Destiny from "./overlays/destiny"
import BRB from "./overlays/brb"
import Generic from "./overlays/generic"
import Incoming from "./overlays/incoming"
import Outgoing from "./overlays/outgoing"
const screens = {
  admin: Admin,
  brb: BRB,
  destiny: Destiny,
  generic: Generic,
  incoming: Incoming,
  outgoing: Outgoing
}

const store = createStore();
initConsoleActions(store);
createPeerConnection(store, params.connect || params.host, params.key || null, (params.connect) ? true : false);
store.dispatch(setScreen(params.screen || "incoming"));

const Router = (props) => {
  // else render the requested component
  const Component = screens[props.screen];
  return (Component) ? <Component /> : null;
}

const ConnectedRouter = connect(
  (state, ownProps) => {
    return {
      screen: state.screen.current
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
