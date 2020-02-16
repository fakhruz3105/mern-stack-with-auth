const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/ErrorHandler");
require("dotenv").config();

const app = express();

//JSON parser
app.use(express.json());

//Request Logger
app.use(morgan("common"));

//Backend protection
app.use(helmet());

//CORS error handler
app.use(
  cors({
    origin: process.env.ORIGIN
  })
);

//Connect to DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(error => console.log(error));

//Use router
app.use("/api/items", require("./route/api/items"));
app.use("/api/users", require("./route/api/users"));

//Serve static asset if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//Error handler middleware
app.use(notFound);
app.use(errorHandler);

//Setup server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at ${PORT}...`));
