// MUST POLYFILL FOR NON-ES2015 ENVIRONMENTS
import "babel-polyfill"

import React from "react"
import { render } from "react-dom"
import {StyleRoot, Style} from 'radium';

import Frame from "./frame"
import params from "../lib/url"

const background = params.background || "none";
const fakeFollows = (params.fakeFollows == "true") ? true : false;
const cam = parseInt(params.cam || 1);
const logo = parseInt(params.logo || 1);
const useBox = (params.useBox == "true") ? true : false;

// here we go...
render(<StyleRoot><Frame background={background} fakeFollows={fakeFollows} cam={cam} logo={logo} useBox={useBox} /></StyleRoot>, document.getElementById('app'));
