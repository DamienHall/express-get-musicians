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
    // POST
    test("Can create musician", async () => {
        const response = await request(app).post("/musicians").send({
            "name": "Damien",
            "instrument": "keytar"
        });
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Musician created!");
    });

    // PUT
    test("Can update musician", async () => {
        const response = await request(app).put("/musicians/1").send({
            "name": "Caviera"
        });
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Musician updated!");
    });

    // GET
    test("Can get all musicians", async () => {
        const response = await request(app).get("/musicians");
        const data = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(data[0].name).toBe("Caviera");
    });

    test("Can get musician by id", async () => {
        const response = await request(app).get("/musicians/1");
        const data = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(data.name).toBe("Caviera");
    });
    
    // DELETE
    test("Can delete musician by id", async () => {
        const response = await request(app).delete("/musicians/1");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Musician destroyed!");
    });
});
