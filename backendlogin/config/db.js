const mongoose = require("mongoose");
const URI = process.env.MONGODBURL;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connection established");
  })
  .catch((error) => {
    console.log("Error in connection", error);
  });
