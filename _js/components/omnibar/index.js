/**
 * Improved Omnibar Animation
 * <Omnibar textStyle={} items={} animation={} loop={true}/>
 * To avoid setting state on an unmounted component, we nullify the callback
 * so when the OmnibarItem completes, it can still trigger it's callback before
 * unloading but we do not create a mutation as a result.
 */
import React, {PropTypes} from "react"
import { render } from "react-dom"
import Radium from "radium"

import Animation, {timeline} from "../animation"

const OmnibarItem = Radium((props) => {
  window.setTimeout(() => {
    props.onComplete();
  }, props.duration * 1000);
  return <Animation timeline={props.timeline}>
    <svg style={props.textStyle} xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox={`0 0 ${props.width} ${props.height}`}>
      <text>{props.text}</text>
    </svg>
  </Animation>
})

class Omnibar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
    this.onItemComplete = this.onItemComplete.bind(this);
    this.items = this.props.items;
    this.instances = 0;
    this.next = this.unmountedNext;
  }
  componentWillMount() {
    this.next = this.mountedNext;
  }
  componentWillUnmount() {
    this.next = this.unmountedNext;
  }
  mountedNext() {
    let newState = Object.assign({}, this.state);
    newState.current += 1;
    if (newState.current >= this.items.length && this.props.loop) {
      newState.current = 0;
    }
    this.setState(newState);
  }
  unmountedNext() {}
  onItemComplete() {
    this.next();
  }
  render() {
    return <OmnibarItem key={this.instances++}
      width={this.props.width}
      height={this.props.height}
      timeline={this.props.animation.timeline()}
      duration={this.props.animation.duration()}
      textStyle={this.props.textStyle}
      onComplete={this.onItemComplete}
      text={this.items[this.state.current]}>
    </OmnibarItem>
  }
}

export default Omnibar;
