/**
 * Animation Timeline Manager
 * Drives a multi-step animation with a reasonable set of syntaxes.
 * To drive multiple CSS animations, it will automatically create a nested
 * <div> container that will move independently. This enables animations to
 * be scripted with indepentent start/end resolutions.
 *
 * Heirarchy:
 * |- Animation (root) - Takes a timeline of events and creates segments
 *    |- AnimationSegments - shift() the next segment & creates an AnimationEvent
 *       |- AnimationEvent - Runs the animation as a CSS3 animation
 *
 * Additionally, to help buidling `props.timeline` for management, a `timeline`
 * object is exported. It has the following methods (chained):
 * - from(time, styles): initial state at `time`
 * - to(time, styles): final state at `time`
 * - timeline(): returns an exported version of the timeline as an array
 * - duration(): returns the total time (in seconds) of the entire timeline
 * - raw(): return the raw data object from the timeline
 */
import React, {PropTypes} from "react"
import { render } from "react-dom"
import Radium from "radium"

const reset = {
  position: "relative"
};

const AnimationEvent = Radium((props) => {
  const clean = (o, init) => {
    if ((o.left || o.right || o.top || o.bottom) && !o.position) {
      o.position = "absolute";
    }
    return o;
  }
  const animation = Radium.keyframes({
    "0%": clean(props.initialStyle),
    "100%": clean(props.finalStyle)
  });
  let styles = Object.assign({}, clean(props.initialStyle, true), {
    animation: `placeholder ${props.duration}s ${props.easing} ${props.delay}s forwards`,
    animationName: animation
  });
  return <div style={Object.assign({}, styles)}>{props.children}</div>
});

// creates an animation for the top Object,
// then passes the remainder into a new AnimationSegments
const AnimationSegments = Radium((props) => {
  let segments = props.segments;
  const current = segments.shift();
  return <div style={reset}>
    <AnimationEvent initialStyle={current.style0}
                    finalStyle={current.style1}
                    easing={current.easing}
                    delay={current.delay}
                    duration={current.duration}>
      {(segments.length > 0) ? <AnimationSegments segments={segments}>{props.children}</AnimationSegments> : props.children}
      </AnimationEvent>
    </div>
});

const Animation = (props) => {
  if (!props.timeline) {
    return props.children;
  }
  return <AnimationSegments segments={props.timeline}>{props.children}</AnimationSegments>
};

const timeline = (tl) => {
  let counter = 0;
  let data = (tl) ? tl.exportRaw() : {};
  let froms = [];
  let clearFroms = false;

  // from from from to
  // from to to to
  const from = (time, styles) => {
    if (clearFroms) {
      froms = [];
    }
    froms.push({time: time, styles: styles});
    return next;
  };
  const to = (time, styles, curve = "ease-in-out") => {
    clearFroms = true;
    froms.forEach((f) => {
      data[`${f.time}to${time}_${counter++}`] = {
        delay: f.time,
        duration: time - f.time,
        style0: f.styles,
        style1: styles,
        easing: curve
      }
    });
    return next;
  };
  const duration = () => {
    let max = 0;
    Object.keys(data).forEach((k) => {
      const d = data[k];
      const time = d.delay + d.duration;
      max = (time > max) ? time : max;
    });
    return max;
  };
  const timeline = () => {
    let result = [];
    Object.keys(data).sort().forEach((k) => {
      result.push(data[k]);
    });
    return result;
  };
  const raw = () => {
    return data;
  };
  const next = {
    from: from,
    to: to,
    timeline: timeline,
    duration: duration,
    raw: raw
  };
  return next;
}

export {timeline};
export default Animation;
