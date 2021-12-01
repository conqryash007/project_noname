const express = require("express");
const httpError = require("./models/http-error");
const app = express();
const placesRoute = require("./routes/places-routes");
const userRoute = require("./routes/users-routes");

app.use(express.json());

app.use("/api/places", placesRoute);

app.use("/api/users", userRoute);

app.use((req, res, next) => {
  return next(new httpError("Could not find the route"));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "Something went wrong !" });
});

module.exports = app;
