require('dotenv').config({path: './src/Config/.env'});
const app = require('../index');
const request = require('supertest');
const jwt = require('jsonwebtoken');

const token = jwt.sign({ token: process.env.JWT_SECRET_TOKEN }, process.env.JWT_KEY)

let token

beforeAll(()=>{
    request(app).post('/auth/').send({
        "email":"luanchrystian2@gmail.com",
        "senha":"123"
    }).end((err, response)=>{
        token = response.body.token;
    })
})

describe("Teste 1 - Autenticação JWT", () => {
    it("POST", async () => {
        const response = await request(app)
            .post("/auth/")
            .send({
                "email":"luanchrystian2@gmail.com",
                "senha":"123"
            })
            .expect(200);
    });
});

describe("Teste 2 - Buscar paciente por CPF", () => {

    console.log(token)
    it("GET", async () => {
        const response = await request(app)
            .get('/paciente/13943511600')
            .set('Authorization', token).expect(200)
    })
})

afterAll(done =>  {
    app.close();
    done();
});