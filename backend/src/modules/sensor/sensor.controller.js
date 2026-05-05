const express = require("express");
const router = express.Router();
const service = require("./sensor.service");

router.get("/mode", (req, res) => {
  res.json({ mode: service.getMode() });
});

router.post("/mode", (req, res) => {
  const { mode } = req.body;

  if (mode === "WIFI") {
    return res.json({ message: "WIFI próximamente" });
  }

  service.changeMode(mode);

  res.json({ message: `Modo cambiado a ${mode}` });
});

module.exports = router;