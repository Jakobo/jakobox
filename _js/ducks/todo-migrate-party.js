import { RESET } from "./global"

const SET_VISIBILITY = "party/SET_VISIBILITY"
const USE_DISCORD = "party/USE_DISCORD"
const USE_XBOX = "party/USE_XBOX"
const SET_XBOX_PARTY = "party/SET_XBOX_PARTY"

// https://streamkit.discordapp.com/overlay/voice/
// server: 96708838723428352
// channel: 280396546741108736
// ? icon=true&
// online=true&
// logo=white&
// text_color=%23ffffff&
// text_size=20&
// text_outline_color=%23333333&
// text_outline_size=1&
// text_shadow_color=%23333333&
// text_shadow_size=0&
// bg_color=%231e2124&
// bg_opacity=0&
// bg_shadow_color=%23000000&
// bg_shadow_size=0&
// invite_code=&
// limit_speaking=false&
// small_avatars=true&
// hide_names=false&
// fade_chat=0

const initialState = {
  visible: false,
  isXbox: true,
  xboxParty: [],
  isDiscord: false,
  discordRoom: "gggrBravoFireteam",
  discord: {
    gggrActiveFireteam: {
      server: "96708838723428352",
      channel: "114181333470806024"
    },
    gggrBravoFireteam: {
      server: "96708838723428352",
      channel: "280396546741108736"
    }
  }
};

export default function reducer(state = initialState, action = {}) {
  let newState = Object.assign({}, state);
  switch(action.type) {
    case SET_VISIBILITY:
      newState.visible = action.visible;
    break;
    case USE_XBOX:
      newState.isXbox = true;
      newState.isDiscord = false;
    break;
    case USE_DISCORD:
      newState.isDiscord = true;
      newState.isXbox = false;
    break;
    case SET_XBOX_PARTY:
      newState.xboxParty = action.party;
    break;
  }

  return newState;
}

export function showParty() {
  return {type: SET_VISIBILITY, visible: true};
}

export function hideParty() {
  return {type: SET_VISIBILITY, visible: true};
}

export function useDiscord() {
  return {type: USE_DISCORD};
}

export function useXbox() {
  return {type: USE_XBOX};
}

export function setXboxParty(party) {
  return {type: SET_XBOX_PARTY, party};
}
