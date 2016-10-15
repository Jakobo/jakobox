import React, { PropTypes } from "react"
import { render } from "react-dom"
import Radium from "radium"

class Omnibar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 0,
      hide: null
    };
    this.timer = null;
  }

  componentDidMount() {
    this.tick();
  }

  nextIndex(last) {
    let max = this.props.items.length - 1;
    let next = (last + 1 > max) ? 0 : last + 1;
    return next;
  }

  tick() {
    this.timer = window.setTimeout(() => {
      let lastState = Object.assign({}, this.state);
      this.setState(Object.assign(lastState, {
        show: this.nextIndex(lastState.show),
        hide: lastState.show
      }));
      this.tick();
    }, this.props.delay);
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
    const noShow = {
      display: "none"
    };

    return <div>{this.props.items.map((item, i) => {
        if (i === this.state.hide) {
          return <div key={i}>{this.props.onStyleOut(item)}</div>
        }
        else if (i === this.state.show) {
          return <div key={i}>{this.props.onStyleIn(item)}</div>
        }
        else {
          return <div key={i} data-nostyle="true">{this.props.onNoStyle(item)}</div>
        }
      })}</div>;
  }
}

Omnibar.propTypes = {
  items: PropTypes.array,
  delay: PropTypes.number,
  onStyleOut: PropTypes.func,
  onStyleIn: PropTypes.func,
  onNoStyle: PropTypes.func
};

Omnibar.defaultProps = {
  delay: 5000,
  items: [],
  onStyleOut: function(item) { return <div>{item}</div> },
  onStyleIn: function(item) { return <div>{item}</div> },
  onNoStyle: function(item) { return <div>{item}</div> }
};

export default Radium(Omnibar);
