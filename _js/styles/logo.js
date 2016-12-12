// collapse all logo related stuff into an easy to manage element
import React, {PropTypes} from "react"
import { render } from "react-dom"
import Radium from "radium"

import typography from "../styles/typography"

import Cube from "../styles/cube"

const styles = {
  container: {
    position: "relative"
  },
  cube: {
    position: "absolute",
    left: "227px",
    top: "35px",
    transform: "scale(0.18)"
  },
  cubeOnly: {
    left: "41px"
  },
  logo: {
    hide: {
      display: "none"
    },
    base: {
      display: "block",
      overflow: "visible",
      position: "absolute"
    },
    jako: {
      left: "0px",
      top: "43px"
    },
    ox: {
      left: "274px",
      top: "43px"
    },
    box: {
      left: "103px",
      height: "105px"
    },
    boxOnly: {
      left: "-82px"
    },
    text: {
      fontSize: "85px",
      fontFamily: "HelveticaNeue-CondensedBlack",
      fontWeight: 600,
      fontStretch: "condensed",
      color: "#fff"
    },
    stroke: {
      fill: "#fff",
      stroke: "#000",
      strokeWidth: "3"
    },
    heavyStroke: {
      strokeWidth: "6"
    }
  }
};

const cubeOverrides = {
  side: {
    background: "#fff",
    boxShadow: "inset 0 0 10px rgba(0,0,0,0.4)",
    boxSizing: "border-box",
    borderWidth: "8px",
    borderColor: "#000",
    borderStyle: "solid"
  }
}

const Logo = Radium((props) => {
  const strokes = {
    light: {
      strokeWidth: props.lightStroke || "3"
    },
    heavy: {
      strokeWidth: props.heavyStroke || "6"
    },
    cube: {
      borderWidth: (props.cubeStroke || "8") + "px"
    }
  };
  let cubeStyles = Object.assign({}, cubeOverrides);
  cubeStyles.side.borderWidth = strokes.cube.borderWidth;

  return <div style={styles.container}>
    <div style={Object.assign({}, styles.cube, (props.text === false) ? styles.cubeOnly : {})}><Cube spin={props.spin} infinite={props.infinite} styles={cubeStyles}></Cube></div>
    <div>
      <svg style={Object.assign({}, styles.logo.base, styles.logo.text, styles.logo.stroke, strokes.light, styles.logo.jako, (props.text === false) ? styles.logo.hide : {})} xmlns="http://www.w3.org/2000/svg" width="150" height="42" viewBox="0 0 150 42">
        <text x="0" y="42">JAKO</text>
      </svg>
      <svg style={Object.assign({}, styles.logo.base, styles.logo.box, (props.text === false) ? styles.logo.boxOnly : {})}  xmlns="http://www.w3.org/2000/svg" width="250" height="289" viewBox="0 0 250 289">
        <path id="Outside" style={Object.assign({}, styles.logo.stroke, styles.logo.heavyStroke, strokes.heavy)} d="M124.433,231.815l73.559-42.841V103.317L126.025,61,82.982,86V36.04L126.025,9.991,239.95,78.049V213.007L126.025,278.955l-43.043-23L51.972,237.991l0.639-.365-0.639.342L10.028,214.025V78.049L51.972,54.007V188.974Z"/>
      </svg>
      <svg style={Object.assign({}, styles.logo.base, styles.logo.text, styles.logo.stroke, strokes.light, styles.logo.ox, (props.text === false) ? styles.logo.hide : {})}  xmlns="http://www.w3.org/2000/svg" width="75" height="42" viewBox="0 0 75 42">
        <text x="0" y="42">OX</text>
      </svg>
    </div>
  </div>
});

Logo.propTypes = {
  lightStroke: PropTypes.number,
  heavyStroke: PropTypes.number,
  cubeStroke: PropTypes.number,
  text: PropTypes.bool,
  spin: PropTypes.bool,
  infinite: PropTypes.bool
};

Logo.defaultProps = {
  lightStroke: 3,
  heavyStroke: 6,
  cubeStroke: 8,
  text: true,
  spin: false,
  infinite: false
};

// this HOC controls the pulse if enabled via the "spinEvery" prop
class SpinEveryHOC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spin: false
    };
    this.timer = null;
  }

  componentDidMount() {
    this.tick();
  }

  tick() {
    if (this.props.spinEvery) {
      this.timer = window.setTimeout(() => {
        let newState = Object.assign({}, this.state);
        newState.spin = !newState.spin;
        this.setState(newState);
        this.tick();
      }, this.props.spinEvery * 500);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
    this.timer = null;
  }

  render() {
    let propset = Object.assign({}, this.props);
    propset.spin = this.state.spin;
    delete propset["spinEvery"];
    return <Logo {...propset}></Logo>
  }
}

SpinEveryHOC.propTypes = {
  spinEvery: PropTypes.number
};
SpinEveryHOC.defaultProps = {
  spinEvery: null
};

export default SpinEveryHOC;