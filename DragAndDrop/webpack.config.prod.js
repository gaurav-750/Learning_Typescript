const path = require("path");
const cleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",

  entry: "./src/app.ts",

  output: {
    filename: "bundle.js", //single js file which will be generated in the end
    path: path.resolve(__dirname, "dist"), //where output file will be generated
  },

  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },

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

  //applied to the final bundle.js file
  plugins: [new cleanPlugin.CleanWebpackPlugin()],
};
