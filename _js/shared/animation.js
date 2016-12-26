// generic animation object
import React, {PropTypes} from "react"
import { render } from "react-dom"
import Radium from "radium"

/*
<Animation segments={[
  easing: "ease-in-out",
  duration: 2,
  frames: {
    "0%":   { css },
    "100%": { css }
  }
]}>...obj</Animation>
*/
const reset = {
  position: "relative"
};

const AnimationEvent = Radium((props) => {
  const clean = (o) => {
    if ((o.left || o.right || o.top || o.bottom) && !o.position) {
      o.position = "absolute";
    }
    return o;
  }
  const animation = Radium.keyframes({
    "0%": clean(props.initialStyle),
    "100%": clean(props.finalStyle)
  });
  let styles = Object.assign({}, clean(props.initialStyle), {
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
