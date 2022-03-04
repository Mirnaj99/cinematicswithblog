const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const postsRoute = require("./routes/posts");
const multer = require("multer");
const path = require('path')

dotenv.config();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DataBase Connected"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb is callback
    cb(null, "../../"); // images is the destination
  },
  filename: (req, file, cb) => {
    //giving a name for the file
    cb(null, req.body.name); // req.body.name is the filename that we are providing
  },
});
0
const upload = multer({ storage: storage }); // the storage declared above
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../../")));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/posts", postsRoute);

app.listen(4000, () => {
  console.log("server is running");
});
