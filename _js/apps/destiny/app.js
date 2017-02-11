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
import {StyleRoot, Style} from 'radium';

import { Provider } from "react-redux"
import createStore from '../../store';
import {createOnStorage} from '../../middleware';

const store = createStore("destiny");
const onStorage = createOnStorage(store);
window.addEventListener('storage', onStorage);

import Frame from "./frame"

import initConsoleActions from "../../lib/console_actions"

initConsoleActions(store);

// import params from "../../lib/url"
// const background = params.background || "none";
// const fakeFollows = params.fakeFollows || false;
// const demo = params.demo || false;

// here we go...
render(
  <Provider store={store}>
    <StyleRoot>
      <Frame />
    </StyleRoot>
  </Provider>,
  document.getElementById('app')
);
