import Logo from "../logo"

// watermark is a common enough configuration, it should be defined
const Watermark = (props) => {
  const color = props.color;
  let newProps = Object.assign({}, props);
  delete newProps["color"];
  delete newProps["opacity"];

  // configure. All stroke/fill are the same, all borders set to 0, no text
  newProps.bStrokeColor = color;
  newProps.bFillColor = color;
  newProps.cubeStrokeColor = color;
  newProps.cubeFillColor = color;
  newProps.cubeStroke = 0;
  newProps.lightStroke = 0;
  newProps.heavyStroke = 0;
  newProps.text = false;

  const wmStyle = {
    opacity: props.opacity || 0.6
  };

  return <div style={wmStyle}><Logo {...newProps} /></div>
}
