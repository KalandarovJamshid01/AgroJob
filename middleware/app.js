const express = require("express");
const user = require("./../route/user");
const auth = require("./../route/auth");
const job = require("./../route/job");
const apply = require("./../route/apply");
const type = require("./../route/jobType");
const comment = require("./../route/comment");
const region = require("./../route/region");

const view = require("./../route/view");
const path = require("path");
const AppError = require("../utility/appError");
const ErrorController = require("../controller/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const app = express();

app.use(xss());

app.use(hpp());
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json());
app.use(express.urlencoded());
app.use(fileUpload({ useTempFiles: true }));

app.use(cookieParser());
app.use(cors());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use(bodyParser.json()); // <--- Here
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  console.log("LOGGED");
  next();
});

// app.use("/", viewRouter);

app.use("/api/v1/users", user);
app.use("/api/v1/auth", auth);
app.use("/api/v1/jobs", job);
app.use("/api/v1/applies", apply);
app.use("/api/v1/types", type);
app.use("/api/v1/comments", comment);
app.use("/api/v1/regions", region);

app.use("/", view);

app.all("*", function (req, res, next) {
  next(new AppError(`this url has not found: ${req.originalUrl}`, 404));
});

app.use(ErrorController);

module.exports = app;
