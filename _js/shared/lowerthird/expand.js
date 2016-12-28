/**
 * Expand Effect Lower Thirds
 * This lower thirds effect moves the Box logo to the left, making room to
 * show "Jako" to the left side, and "ox" to the right. This lingers for a
 * moment before returning to the initial state.
 *
 * calls props.onComplete when the animation is finished
 */

import React, {PropTypes} from "react"
import { render } from "react-dom"
import Radium from "radium"

import Logo, {Watermark} from "../logo"
import Animation, {timeline} from "../animation"

const oStyles = {
  text: {
    display: "block",
    overflow: "visible",
    position: "absolute",
    top: "23px",
    fontSize: "85px",
    fontFamily: "HelveticaNeue-CondensedBlack",
    fontWeight: 600,
    fontStretch: "condensed",
    color: "#fff",
    fill: "#fff",
    stroke: "#000",
    strokeWidth: "3"
  }
}

const boxSlide = timeline()
  .from(0, { transform: "translateX(0)" })
  .to(2, { transform: "translateX(-100px)" }, "ease-in")
  .from(0, { transform: "rotateZ(0)", transformOrigin: "43px 52px", width: "86px", height: "104px" })
  .to(2, { transform: "rotateZ(-360deg)" }, "ease-in")
  .from(12, { left: "0px", transform: "rotateZ(0)", transformOrigin: "43px 52px", width: "86px", height: "104px" })
  .to(14, { left: "100px", transform: "rotateZ(360deg)" }, "ease-in-out")

const jakoSlide = timeline()
  .from(2, { transform: "translateX(185px)", opacity: 0 })
  .to(2.6, { transform: "translateX(0)", opacity: 1 })
  .from(11.4, { transform: "translateX(0)", opacity: 1 })
  .to(12, { transform: "translateX(185px)", opacity: 0 })

const oxSlide = timeline()
  .from(2, { transform: "translateX(-85px)", opacity: 0 })
  .to(2.6, { transform: "translateX(2px)", opacity: 1 })
  .from(11.4, { transform: "translateX(0)", opacity: 1 })
  .to(12, { transform: "translateX(-87px)", opacity: 0 })

const duration = Math.max(
  boxSlide.duration(),
  jakoSlide.duration(),
  oxSlide.duration()
);

// default component is the spinning logo
const ExpandingLogo = Radium((props) => {
  window.setTimeout(() => {
    props.onComplete();
  }, duration * 1000);

  const styles = Object.assign({}, oStyles, {
    jako: {
      position: "absolute",
      width: "190px",
      height: "200px",
      overflow: "hidden",
      left: props.posX(-285),
      top: props.posY(20)
    },
    ox: {
      position: "absolute",
      width: "190px",
      height: "200px",
      overflow: "hidden",
      left: props.posX(-15),
      top: props.posY(20)
    }
  });

  return <div>
    <div style={styles.jako}>
      <Animation timeline={jakoSlide.timeline()}>
        <svg style={styles.text} xmlns="http://www.w3.org/2000/svg" width="150" height="42" viewBox="0 0 150 42">
          <text x="0" y="42">JAKO</text>
        </svg>
      </Animation>
    </div>
    <div style={props.logoStyle}>
      <Animation timeline={boxSlide.timeline()}>
        <Logo spin={false} infinite={false} text={false} />
      </Animation>
    </div>
    <div style={styles.ox}>
      <Animation timeline={oxSlide.timeline()}>
        <svg style={styles.text}  xmlns="http://www.w3.org/2000/svg" width="75" height="42" viewBox="0 0 75 42">
          <text x="0" y="42">OX</text>
        </svg>
      </Animation>
    </div>
  </div>
});

export default ExpandingLogo;
