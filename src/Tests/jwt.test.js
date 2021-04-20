require('dotenv').config({path: './src/Config/.env'});
const request = require('supertest');
const app = require('../index');

const cpf = process.env.CPF;
const token = 'Bearer ' + process.env.jwt_dev_token;

describe("JWT 1 - Teste de Autenticação JWT", () => {
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

describe("JWT 2 - Teste de busca de paciente por CPF (Não autorizado)", () => {
    it("GET", async ()=>{
        const response = await request(app)
        .get(`/paciente/${cpf}`)
        .expect(401);
    });
});

describe("JWT 3 - Teste de busca de paciente por CPF (Autorizado)", () => {
    it("GET", async () =>{
        const response = await request(app)
        .get(`/paciente/${cpf}`)
        .set('Authorization', token)
        .expect(200);
    });
});

afterAll(done =>  {
    app.close();
    done();
});