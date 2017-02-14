var webpack = require("webpack");
var oldConfig = require("./webpack.config")

// copy config, prevent assignment messing up multiple webpacks
var config = Object.assign({}, oldConfig);

if (!config.plugins) {
  config.plugins = [];
}

config.devtool = "nosources-source-map"

// add webpack define for production builds
config.plugins.push(new webpack.DefinePlugin({
  "process.env": {
    "NODE_ENV": '"production"'
  }
}));

module.exports = config;
