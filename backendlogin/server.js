require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
require("./config/db");
const route = require("./routes/userRoutes");
const PORT = 8000;

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const fileUpload = require("express-fileupload");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static("assets"));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/api", route);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
