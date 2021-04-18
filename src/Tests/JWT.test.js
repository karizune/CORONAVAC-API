const app = require('../index');
const request = require('supertest');
const { uuid, isUuid } = require('uuidv4');
const { response } = require('express');
jest.useFakeTimers()


let token;

beforeAll((done)=>{
    request(app).post('/auth/').send({
        "email":"luanchrystian2@gmail.com",
        "senha":"123"
    }).end((err, response)=>{
        token = response.body.token;
        done();
    })
})

describe("Teste 1 - Consegui autenticação JWT", () => {
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