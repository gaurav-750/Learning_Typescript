const path = require("path");

module.exports = {
  entry: "./src/app.ts",

  output: {
    filename: "bundle.js", //single js file which will be generated in the end
    path: path.resolve(__dirname, "dist"), //where output file will be generated
  },
};
