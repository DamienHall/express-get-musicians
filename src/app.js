const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

app.get("/musicians", async (req, res) => {
    res.json(await Musician.findAll());
});

app.get("/musicians/:id", async (req, res) => {
    let musician = await Musician.findByPk(req.params.id);
    res.json(musician);
});

module.exports = app;
