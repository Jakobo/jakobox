import React, { PropTypes } from "react"
import { render } from "react-dom"
import Radium from "radium"

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    let m10 = 0;
    let m1 = 0;
    let s10 = 0;
    let s1 = 0;

    let pieces = props.start.match(/([\d])([\d]):([\d])([\d])/);
    if (pieces.length === 5) {
      m10 = pieces[1];
      m1 = pieces[2];
      s10 = pieces[3];
      s1 = pieces[4];
    }

    this.state = {
      m10: m10,
      m1: m1,
      s10: s10,
      s1: s1
    };
    this.timer = null;
    this.done = false;
  }

  componentDidMount() {
    this.tick();
  }

  tick() {
    this.timer = window.setTimeout(() => {
      let lastState = Object.assign({}, this.state);
      let m1 = lastState.m1;
      let m10 = lastState.m10;
      let s1 = lastState.s1;
      let s10 = lastState.s10;

      s1--;
      if (s1 < 0) {
        s1 = 9;
        s10--;
        if (s10 < 0) {
          s10 = 5;
          m1--;
          if (m1 < 0) {
            m1 = 9;
            m10--;
            if (m10 < 0) {
              m10 = 0;
              m1 = 0;
              s10 = 0;
              s1 = 0;
              this.done = true;
              this.props.onComplete();
            }
          }
        }
      }


      this.setState(Object.assign(lastState, {
        m10: m10,
        m1: m1,
        s10: s10,
        s1: s1
      }));

      if (!this.done) {
        this.tick();
      }
    }, 1000);
  }

  componentWillReceiveProps() {
    this.setState({
      show: 0,
      hide: null
    });
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
    this.timer = null;
  }

  render() {
    return <div>{this.props.onStyleNumber(this.state.m10)}{this.props.onStyleNumber(this.state.m1)}{this.props.onStyleColon(":")}{this.props.onStyleNumber(this.state.s10)}{this.props.onStyleNumber(this.state.s1)}</div>;
  }
}

Countdown.propTypes = {
  start: PropTypes.string,
  onStyleNumber: PropTypes.func,
  onStyleColon: PropTypes.func,
  onComplete: PropTypes.func
};

Countdown.defaultProps = {
  start: "05:00",
  onStyleNumber: function(str) { return <span>{str}</span> },
  onStyleColon: function(str) { return <span>{str}</span> },
  onComplete: function() {}
};


export default Radium(Countdown);
