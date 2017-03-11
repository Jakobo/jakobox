# twitch.felocity.com
## Awesome Strimmer Action... GO

Readme files are more memos to your future self. So if you're not me, you're probably interested in how the overlays are done for jakobox.tv. I use twitch as an experiment of sorts, seeing just how far we can push video overlay technology with tools like the Chromium Embedded Frame (the framework behind most stream software's web views).

This could also be seen as me trying to break my poor MacBook Pro.

## Architecture
This is a standard react application, a main entry point at stream.html. The app.js file launches redux and manages state. I plan to add a dashboard.html which takes the twitch chat iframe, adds stream controls, the muxy ticker, and otherwise makes managing the stream a lot easier.

* Muxy Live Ticker: http://u.muxy.io/live
* Twitch Chat Frame: http://www.twitch.tv/{CHANNEL}/chat
* Twitch Video Feed: http://player.twitch.tv/?channel={CHANNEL}&autoplay=true&muted=true
* Material UI for dashboard: http://www.material-ui.com/

## Usage
As deployed, the React application is capable of running in two modes
* Host - Owns the authoritative state of the application
* Client - Consumes state changes but cannot push changes back

The anatomy of a screen URL is:
```
http://.../screen.html?key=<key>&ls=<ls>&host=<host>&screen=<screen>
KEY    - the API Key if using PeerJS for WebRTC connection signaling. Else, it's the localstorage key
LS     - if set to "1", localstorage will be used instead of PeerJS
HOST   - if set to "1", this screen will assume it has authority over the state
SCREEN - the screen to render. Based on the available overlays in /overlays
```

This means that to start say, the Destiny overlay on key `foobar`, you would reference `http://.../screen.html?key=foobar&ls=1&screen=destiny`, while you can control it (and any other screens on the same KEY value) via `http://.../screen.html?key=foobar&ls=1&host=1&screen=admin`.

In an RTC world, you could have your computer and your phone within reach and running the admin application. Either machine would need to be able to become the host (though that's not implemented in the admin panel yet).

## Build/Deploy
I'm using a mostly standard webpack setup here:

```bash
npm install # All the things
npm run dev # Start a webpack dev server for the project
            # or do "npm run build" to minify and create /assets items
            # and "npm run verify" starts a static server to verify production builds
```

## Deploying
This runs on github's static page system. This means that anything not starting with `_` will be publicly available via the felocity.com site. To publish, run the build command `npm run build` and then remember to commit the changes before pushing. We don't have a `nojekyll` file because we want to avoid copying all our underscore directories for cleanliness. `git push` and let github do the rest.
