// generate the initial structure for screens
const screens = [
  "brb",
  "destiny",
  "generic",
  "incoming",
  "outgoing"
]

export default function generateState(state, overrides = {}) {
  let newState = {};
  screens.forEach((screen) => {
    newState[screen] = Object.assign({}, state)
  })

  Object.keys(overrides).forEach((key) => {
    newState[key] = Object.assign({}, newState[key], overrides[key]);
  });

  return newState;
}
