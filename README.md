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

## Build/Deploy
I'm using my standard webpack setup here:

```bash
npm install # All the things
npm run dev # Start a webpack dev server for the project
            # or do "npm run build" to minify and create /assets items
            # and "npm run verify" starts a static server to verify production builds
```

## Deploying
This runs on github's static page system. This means that anything not starting with `_` will be publicly available via the felocity.com site. To publish, run the build command `npm run build` and then remember to commit the changes before pushing. We don't have a `nojekyll` file because we want to avoid copying all our underscore directories for cleanliness. `git push` and let github do the rest.
