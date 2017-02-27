// the following actions do not propogate
import { SET_SCREEN, SET_ADMIN_TARGET } from "../ducks/screen"
let blocklist = {};

const add = (item) => {
  blocklist[item] = true;
}

add(SET_SCREEN);
add(SET_ADMIN_TARGET);

export default blocklist;

export function doNotPropogate(action) {
  return blocklist[action.type];
}
