const express = require("express");
const cors = require("cors");

const sensorRoutes = require("./modules/sensor/sensor.controller");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", sensorRoutes);

module.exports = app;