const path = require("path");

module.exports = {
  mode: "development",

  entry: "./src/app.ts",

  output: {
    filename: "bundle.js", //single js file which will be generated in the end
    path: path.resolve(__dirname, "dist"), //where output file will be generated
    publicPath: "/dist/", //this configuration is required to tell webpack-dev-server where to look for the bundle.js file
  },

  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },

  devtool: "inline-source-map", //to debug ts files in browser

  module: {
    //to tell webpack how to handle different files
    rules: [
      {
        test: /\.ts?$/, //webpack will check whether its a .ts file
        use: "ts-loader", // if yes then use ts-loader to compile it - ts-loader will use typescript compiler and tsconfig.json to compile it
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js"],
  },

  stats: { warnings: false },
};
