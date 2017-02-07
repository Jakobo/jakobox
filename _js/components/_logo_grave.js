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
      }, this.props.spinEvery * 1000);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer);
    this.timer = null;
  }

  render() {
    let propset = Object.assign({}, this.props);
    if (this.props.spinEvery > 0) {
      propset.spin = this.state.spin;
      delete propset["spinEvery"];
    }
    return <Logo {...propset}></Logo>
  }
}

SpinEveryHOC.propTypes = {
  spinEvery: PropTypes.number
};
SpinEveryHOC.defaultProps = {
  spinEvery: null
};
