// generate the initial structure for screens
const screens = [
  "brb",
  "destiny",
  "generic",
  "incoming",
  "outgoing"
]

export default function generateState(state) {
  let newState = {};
  screens.forEach((screen) => {
    newState[screen] = Object.assign({}, state)
  })
  return newState;
}
