// the following actions do not propogate
import { SET_SCREEN } from "../ducks/screen"
let blocklist = {};

const add = (item) => {
  blocklist[item] = true;
}

add(SET_SCREEN);

export default blocklist;

export function doNotPropogate(action) {
  return blocklist[action.type];
}
