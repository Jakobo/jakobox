/**
 * GGGR Co-Brand
 *
 * calls props.onComplete when the animation is finished
 */

import React, {PropTypes} from "react"
import { render } from "react-dom"
import Radium from "radium"

import Logo from "../../logo"
import gggrSrc from "../../../../_assets/gggr-simple-color.png"
import Animation, {timeline} from "../../animation"

const oStyles = {
  svg: {
    display: "block",
    overflow: "visible",
    fontSize: "20px",
    fontFamily: "HelveticaNeue",
    fontWeight: 600,
    color: "#fff",
    fill: "#fff",
    stroke: "#000",
    strokeWidth: "1",
    textAnchor: "end",
    filter: "drop-shadow(5px 5px 5px rgba(0,0,0,0.75))",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    perspective: 1000
  }
}

const boxSlide = timeline()
  .from(0,    { transform: "translateX(0)" })
  .to(0.5,    { transform: "translateX(-100px)" }, "ease-in")
  .from(12.5, { transform: "translateX(0)" })
  .to(13,     { transform: "translateX(100px)" }, "ease-out")

const gggrSlide = timeline()
  .from(0.4,  { opacity: 0 })
  .to(1.2,    { opacity: 1 }, "ease-out")
  .from(11.8, { opacity: 1 })
  .to(12.6,   { opacity: 0 }, "ease-in")

const textDisplay = timeline()
  .from(0.4,  { transform: "translateY(5px)", opacity: 0 })
  .to(0.6,    { transform: "translateY(0)", opacity: 1 }, "ease-out")
  .from(11.8, { transform: "translateY(0)", opacity: 1 })
  .to(12,     { transform: "translateY(5px)", opacity: 0 }, "ease-in")

const duration = boxSlide.duration();

// default component is the spinning logo
const GGGRCobrand = Radium((props) => {
  window.setTimeout(() => {
    props.onComplete();
  }, duration * 1000);

  const width = "240px";
  const widthRaw = parseInt(width);

  const styles = Object.assign({}, oStyles, {
    gggr: {
      position: "absolute",
      left: props.posX(0),
      top: props.posY(0)
    },
    text: {
      position: "absolute",
      top: props.posY(-43),
      left: props.posX(-160),
      width: width,
      height: "40px"
    }
  });

  return <div>
    <div style={props.logoStyle}>
      <Animation timeline={boxSlide.timeline()}>
        <Logo source={(props.source) ? `${props.source}.logo` : null} spin={true} infinite={false} text={false} />
      </Animation>
    </div>
    <div style={styles.gggr}>
      <Animation timeline={gggrSlide.timeline()}>
        <img src={gggrSrc}/>
      </Animation>
    </div>
    <div style={styles.text}>
      <Animation timeline={textDisplay.timeline()}>
        <svg style={Object.assign({}, styles.svg)} xmlns="http://www.w3.org/2000/svg" width={widthRaw} height="40" viewBox={`0 0 ${widthRaw} 40`}>
          <text x="100%" y="15">Gear, Guns, Games, &amp; Rigs</text>
          <text x="100%" y="35">always online at 3gr.tv</text>
        </svg>
      </Animation>
    </div>
  </div>
});

export default GGGRCobrand;
