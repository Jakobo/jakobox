/**
 * Logo
 * Manages all logo related behaviors and display. Contains both the
 * box and non-box versions of the logo.
 * Strokes, fills, etc can all be controlled via props.
 */

import React, {PropTypes} from "react"
import { render } from "react-dom"
import { connect } from "react-redux"
import Radium from "radium"

import {objectAt, firstOf} from "../../lib/components"

import Cube from "./cube"

const styles = {
  position: {
    position: "absolute",
    left: "0px",
    top: "0px"
  },
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
      strokeWidth: props.lightStroke,
      stroke: props.textStrokeColor,
      fill: props.textFillColor
    },
    heavy: {
      strokeWidth: props.heavyStroke,
      stroke: props.textStrokeColor,
      fill: props.textFillColor
    },
    cube: {
      borderWidth: (props.cubeStroke) + "px",
      borderColor: props.cubeStrokeColor,
      background: props.cubeFillColor
    },
    b: {
      strokeWidth: props.heavyStroke,
      stroke: props.bStrokeColor,
      fill: props.bFillColor
    }
  };
  const shadows = {
    filter: props.filter || null
  };

  const positionStyles = Object.assign({}, styles.position);
  positionStyles.left = `${props.x}px`;
  positionStyles.top = `${props.y}px`;
  positionStyles.transform = `scale(${props.scale})`;

  // apply the side modifications to the cube (need to carry the stroke down through the react tree)
  let cubeStyles = Object.assign({}, cubeOverrides);
  cubeStyles.side = Object.assign({}, cubeStyles.side, strokes.cube);

  return <div style={positionStyles}>
    <div style={styles.container}>
      <div style={Object.assign({},
        styles.cube,
        (props.text === false) ? styles.cubeOnly : {}
      )}><Cube spin={props.spin} infinite={props.infinite} styles={cubeStyles}></Cube></div>
      <div style={Object.assign({}, shadows)}>
        <svg style={Object.assign({},
          styles.logo.base,
          styles.logo.text,
          styles.logo.stroke,
          strokes.light,
          styles.logo.jako,
          (props.text === false) ? styles.logo.hide : {}
        )} xmlns="http://www.w3.org/2000/svg" width="150" height="42" viewBox="0 0 150 42">
          <text x="0" y="42">JAKO</text>
        </svg>
        <svg style={Object.assign({},
          styles.logo.base,
          styles.logo.box,
          (props.text === false) ? styles.logo.boxOnly : {}
        )}  xmlns="http://www.w3.org/2000/svg" width="250" height="289" viewBox="0 0 250 289">
          <path id="Outside" style={Object.assign({},
            styles.logo.stroke,
            styles.logo.heavyStroke,
            strokes.heavy,
            strokes.b
          )} d="M124.433,231.815l73.559-42.841V103.317L126.025,61,82.982,86V36.04L126.025,9.991,239.95,78.049V213.007L126.025,278.955l-43.043-23L51.972,237.991l0.639-.365-0.639.342L10.028,214.025V78.049L51.972,54.007V188.974Z"/>
        </svg>
        <svg style={Object.assign({},
          styles.logo.base,
          styles.logo.text,
          styles.logo.stroke,
          strokes.light,
          styles.logo.ox,
          (props.text === false) ? styles.logo.hide : {}
        )}  xmlns="http://www.w3.org/2000/svg" width="75" height="42" viewBox="0 0 75 42">
          <text x="0" y="42">OX</text>
        </svg>
      </div>
    </div>
  </div>
});

Logo.propTypes = {
  lightStroke: PropTypes.number,
  heavyStroke: PropTypes.number,
  cubeStroke: PropTypes.number,
  text: PropTypes.bool,
  spin: PropTypes.bool,
  infinite: PropTypes.bool,
  cubeStrokeColor: PropTypes.string,
  cubeFillColor:  PropTypes.string,
  textStrokeColor: PropTypes.string,
  textFillColor: PropTypes.string,
  bStrokeColor: PropTypes.string,
  bFillColor: PropTypes.string
};

Logo.defaultProps = {
  lightStroke: 3,
  heavyStroke: 6,
  cubeStroke: 8,
  text: true,
  spin: false,
  infinite: false,
  cubeStrokeColor: "#000",
  cubeFillColor: "#fff",
  textStrokeColor: "#000",
  textFillColor: "#fff",
  bStrokeColor: "#000",
  bFillColor: "#fff"
};

const ConnectedLogo = connect(
  (state, ownProps) => {
    const scope = objectAt(state, ownProps.source);
    return {
      cubeStrokeColor: firstOf(ownProps.cubeStrokeColor, objectAt(scope, "cube.stroke", null)),
      cubeFillColor: firstOf(ownProps.cubeFillColor, objectAt(scope, "cube.fill", null)),
      textStrokeColor: firstOf(ownProps.textStrokeColor, objectAt(scope, "text.stroke", null)),
      textFillColor: firstOf(ownProps.textFillColor, objectAt(scope, "text.fill", null)),
      bStrokeColor: firstOf(ownProps.bStrokeColor, objectAt(scope, "b.stroke", null)),
      bFillColor: firstOf(ownProps.bFillColor, objectAt(scope, "b.fill", null)),
      x: firstOf(ownProps.x, scope.x),
      y: firstOf(ownProps.y, scope.y),
      scale: firstOf(ownProps.scale, scope.scale),
      text: firstOf(ownProps.text, scope.text),
      spin: firstOf(ownProps.spin, scope.spin),
      infinite: firstOf(ownProps.infinite, scope.infinite)
    }
  }
)(Radium(Logo))

export default ConnectedLogo;
