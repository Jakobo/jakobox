import * as camera from "../../ducks/camera"
import * as color from "../../ducks/color"
import * as follows from "../../ducks/follows"
import * as logo from "../../ducks/logo"
import * as lowerthirds from "../../ducks/lowerthirds"

export default function init(dispatch) {
  dispatch(color.setCameraColor("#2a3f56", "#df8926"))
  dispatch(color.setBColor("#000", "#fff"))
  dispatch(color.setCubeColor("#000", "#fff"))
  dispatch(color.setTextColor("#000", "#fff"))
  dispatch(logo.setScale(1))
  dispatch(camera.setPosition(3, 460))
  dispatch(follows.setPosition(1238, 283))
  dispatch(follows.setSize(682, 210))
  dispatch(follows.setUrls(
    "http://u.muxy.io/dashboard/alerts/demo/g9djjNHgai340bmM76i2Fhfe5nyiMKSX",
    "http://a.muxy.io/alert/jakobox/srX-UDXTDVsAURa8mWWdPkAVxz0NA94E"
  ))
  // dispatch(follows.enableFakeFollows())
  dispatch(lowerthirds.showLowerThirds())
  dispatch(lowerthirds.setCurrentPlaylist("normal"))
  dispatch(lowerthirds.setTickerSize(3))
  dispatch(lowerthirds.enableTickerShuffle())
  dispatch(lowerthirds.setTickerItems([
    "Jakob got into streaming, decided to put his programming to use. Now we have this!\nWhat is the box?",
    "Keep it clean, stay respectful, don't be an asshole\nChat rules",
    "Arminius-D with Crowd Control & Focused Fire\nFavorite weapon",
    "The cat's name is Churchill =^_^= He likes to chew on HDMI cables...\nMeow",
    "When not streaming, I work for a Technology company in San Francisco\nDay Job",
    "Vault of Glass: [x]  // Crota's End [ ] // Prison of Elders: [ ]\nYear 1 Accomplishments",
    "King's Fall: [x] // Challenge of Elders [x]\nYear 2 Accomplishments",
    "Wrath of the Machine: [ ]\nYear 3 Accomplishments",
    "[7] wins on Asylum\nBest Trials Card",
    "I play Dungeons & Dragons with my coworkers. We're currently playing Out of the Abyss\nExtra nerding",
    "If I had to pick a favorite alcohol, it'd be bourbon",
    "Have feedback on the stream? Whisper/message me. I'm always looking to improve!",
    "In \"Behind the Stream\", we do a Creative stream, where we'll dig into the application behind all this\nMondays"
  ]))
}
