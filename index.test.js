// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    test("Testing musicians endpoint", async () => {
        const response = await request(app).get("/musicians");
        const data = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(data[0].name).toBe("Mick Jagger");
    });

    test("Testing musicians endpoint with :id", async () => {
        const response = await request(app).get("/musicians/1");
        const data = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(data.name).toBe("Mick Jagger");
    });
});
