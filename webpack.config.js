var NpmInstallPlugin = require("npm-install-webpack-plugin");

module.exports = {
    entry: "./dist/index.js",
    output: {
        path: __dirname,
        filename: "build/entities.js"
    },
	plugins: [
        new NpmInstallPlugin({
            dev: false,
            peerDependencies: true
        })
    ],
    module: {
        loaders: [
        ]
    }
};