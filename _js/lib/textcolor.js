import parse from "color-parse"

const nThreshold = 105;
export default function(color) {
  const parsed = parse(color);
  const r = parsed.values[0];
  const g = parsed.values[1];
  const b = parsed.values[2];
  const bgDelta = (r * 0.299) + (g * 0.587) + (b * 0.114);
  return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
}
