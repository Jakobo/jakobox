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

import Frame from "./frame"
import params from "../lib/url"

const background = params.background || "none";
const timer = params.timer || 37000;
const fakeFollows = params.fakeFollows || false;

// here we go...
render(<StyleRoot><Frame background={background} timer={timer} fakeFollows={fakeFollows}/></StyleRoot>, document.getElementById('app'));
