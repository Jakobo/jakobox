# twitch.felocity.com
## Awesome Strimmer Action... GO

Readme files are more memos to your future self. So if you're not me, you're probably interested in how the overlays are done for jakobox.tv. I use twitch as an experiment of sorts, seeing just how far we can push video overlay technology with tools like the Chromium Embedded Frame (the framework behind most stream software's web views).

This could also be seen as me trying to break my poor MacBook Pro.

## Architecture
This is a standard react application, with several entry points defined. I chose to use different entry points instead of a single page application because I preferred the modularity. Otherwise, it's using Radium for the styles and babel for the building work inside of webpack. There's no data access yet, but if it ever emerges, this site will likely adopt Redux.

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
