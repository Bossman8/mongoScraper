var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// require all models
var app = express();

// set up port
var PORT = process.env.PORT || 2500;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// set up DB
var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// connect to DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// require routing files
require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
