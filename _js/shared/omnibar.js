/**
 * Improved Omnibar Animation
 * <Omnibar textStyle={} items={} animation={} loop={true}/>
 */
import React, {PropTypes} from "react"
import { render } from "react-dom"
import Radium from "radium"

import Animation, {timeline} from "./animation"

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
    this.next = this.next.bind(this);
    this.items = this.props.items;
    this.instances = 0;
  }
  next() {
    let newState = Object.assign({}, this.state);
    newState.current += 1;
    if (newState.current >= this.items.length && this.props.loop) {
      newState.current = 0;
    }
    this.setState(newState);
  }
  render() {
    return <OmnibarItem key={this.instances++}
      width={this.props.width}
      height={this.props.height}
      timeline={this.props.animation.timeline()}
      duration={this.props.animation.duration()}
      textStyle={this.props.textStyle}
      onComplete={this.next}
      text={this.items[this.state.current]}>
    </OmnibarItem>
  }
}

export default Omnibar;
