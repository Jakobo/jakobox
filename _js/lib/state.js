// generate the initial structure for screens
const screens = [
  "brb",
  "destiny",
  "generic",
  "incoming",
  "outgoing"
]

const clone = (o) => {
  return JSON.parse(JSON.stringify(o));
}

export default function generateState(state, overrides = {}) {
  let newState = {};
  screens.forEach((screen) => {
    newState[screen] = Object.assign({}, clone(state))
  })

  Object.keys(overrides).forEach((key) => {
    newState[key] = Object.assign({}, newState[key], overrides[key]);
  });

  return newState;
}
