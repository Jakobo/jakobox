const SHOW_LOWER_THIRDS = "lowerthirds/SHOW_LOWER_THIRDS";
const HIDE_LOWER_THIRDS = "lowerthirds/HIDE_LOWER_THIRDS";

const initialState = {
  useLowerThirds: false
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SHOW_LOWER_THIRDS:
      newState.useLowerThirds = true;
    break;
    case HIDE_LOWER_THIRDS:
      newState.useLowerThirds = false;
    break;
  }

  return newState;
}

export function showLowerThirds() {
  return {type: SHOW_LOWER_THIRDS};
}

export function hideLowerThirds() {
  return {type: HIDE_LOWER_THIRDS};
}
