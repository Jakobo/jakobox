/**
 * Watermark Lower Thirds
 * Displays the Jakobox watermark. It fades to a semi-transparent mark during
 * the cycle, and then will come back to 100% for the transition into other
 * elements. This is expected to be on the screen the longest, which is why
 * it is given the opacity treatment for the longest window possible.
 */

import React, {PropTypes} from "react"
import { render } from "react-dom"
import Radium from "radium"

import Logo from "../../logo"
import Animation, {timeline} from "../../animation"

const makeWatermark = (cycles) => {
  cycles = cycles || 1;
  const cycleTime = 45;
  const fade = timeline()
    .from(0, { opacity: "1" })
    .to(0.4,   { opacity: "0.8" })
    .from(cycles * cycleTime - 0.4, { opacity: "0.8" })
    .to(cycles * cycleTime, { opacity: "1" })
  return (props) => {
    window.setTimeout(() => {
      props.onComplete()
    }, cycles * cycleTime * 1000);
    return <div style={props.logoStyle}><Animation timeline={fade.timeline()}><Logo spin={true} infinite={true} text={false} /></Animation></div>
  }
}

export {makeWatermark};
