// MUST POLYFILL FOR NON-ES2015 ENVIRONMENTS
import "babel-polyfill"

import React from "react"
import { render } from "react-dom"
import {StyleRoot, Style} from 'radium';

import Frame from "./frame"
import params from "../lib/url"

const background = params.background || "none";
const showFollows = params.showFollows || false;
const logoX = params.logoX || null;
const logoY = params.logoY || null;

// here we go...
render(<StyleRoot><Frame background={background} showFollows={showFollows} logoX={logoX} logoY={logoY}/></StyleRoot>, document.getElementById('app'));
