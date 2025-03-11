const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;
app.use(express.json());
app.use(express.urlencoded());
// CRUD

app.post("/musicians", async (req, res) => {
    await Musician.create(req.body);
    res.send("Musician created!");
});

app.put("/musicians/:id", async (req, res) => {
    let musician = await Musician.findByPk(req.params.id);
    await musician.update(req.body);
    await musician.save();
    res.send("Musician updated!");
});

app.get("/musicians", async (req, res) => {
    res.json(await Musician.findAll());
});

app.get("/musicians/:id", async (req, res) => {
    let musician = await Musician.findByPk(req.params.id);
    res.json(musician);
});

app.delete("/musicians/:id", async (req, res) => {
    let musician = await Musician.findByPk(req.params.id);
    musician.destroy();
    res.send("Musician destroyed!");
});

module.exports = app;
