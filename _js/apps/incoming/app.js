/**
 * Incoming Stream Splash Entry Point
 * `timer` refers to the rotation of the ticker bar
 */

// MUST POLYFILL FOR NON-ES2015 ENVIRONMENTS
import "babel-polyfill"

import React from "react"
import { render } from "react-dom"
import {StyleRoot, Style} from 'radium';

import Frame from "./frame"
import params from "../lib/url"

const background = params.background || "none";
const timer = params.timer || 17000;

// here we go...
render(<StyleRoot><Frame background={background} timer={timer} /></StyleRoot>, document.getElementById('app'));
