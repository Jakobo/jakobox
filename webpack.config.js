var webpack = require("webpack");
var path = require("path");

// directories
var BASE_JS_DIR = path.resolve(__dirname, "_js");
var APP_DIR = path.resolve(__dirname, "_js", "overlays");
var BUILD_DIR = path.resolve(__dirname, "assets");

// only apply BABEL to these directories... otherwise the build becomes SUPER
// slow! We should only be running babel on the app dir and any node modules
// that were improperly designed and didn't publish built code
var BABEL_DIRS = [
  BASE_JS_DIR,
  APP_DIR
];

// webpack config proper
var config = {
  entry: {
    all:      [BASE_JS_DIR + "/app.js"]
  },
  output: {
    path: BUILD_DIR,
    publicPath: "/assets/",
    filename: "[name].js"
  },
  module : {
    loaders : [
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.jsx?/, include: BABEL_DIRS, loader: "babel" },
      { test: /\.svg$/, loader: "babel!svg-react" },
      { test: /\.(png|jpg)$/, loader: 'url-loader' }
    ]
  },
};

module.exports = config;
