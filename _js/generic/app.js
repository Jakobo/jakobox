// MUST POLYFILL FOR NON-ES2015 ENVIRONMENTS
import "babel-polyfill"

import React from "react"
import { render } from "react-dom"
import {StyleRoot, Style} from 'radium';

import Frame from "./frame"
import params from "../lib/url"

let props = {
  background: params.background || "none",
  fakeFollows: (params.fakeFollows == "true") ? true : false,
  cam: parseInt(params.cam || 0),
  logo: parseInt(params.logo || 0),
  useBox: (params.useBox == "true") ? true : false,
  noThirds: (params.noThirds == "true") ? true : false
};

// here we go...
render(<StyleRoot><Frame {...props} /></StyleRoot>, document.getElementById('app'));
