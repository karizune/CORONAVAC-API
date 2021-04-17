const app = require('../index');
const request = require ('supertest');
const { validate : isUuid } = require("uuid");

describe("Teste 1 - Criar novo paciente", () =>{
    it ("POST", async () =>{
        const response = await request(app)
        .post("/")
        .send({

            "name" : "Daniel",
            cpf : 123,
            peso : 80,
            altura : 1.80,   
        }).expect(200);
        expect(isUuid(response.body.newPaciente.id)).toBe(true);
        expect(response.body).toMatchObject({
            "newPaciente": {
                "name" : "Daniel",
                cpf : 123,
                peso : 80,
                altura : 1.80,
                imc :  24.691358024691358,
                "classificacao" : "Peso Normal"
            }
        });
    });
});

describe("Teste 2 - deletar um paciente que não existe", () => {
    it("DELETE - paciente 123 que não existe", async () => {
        await request(app).delete('/123').expect(404);
    });
});

describe("Teste 3 - atualização de um paciente", () => {
    it("POST e PUT - teste metodo atualizar paciente", async () => {
        const response = await request(app)
        .post("/")
        .send({
            "name" : "Daniel",
            cpf : 123,
            peso : 80,
            altura : 1.80
        }).expect(200);
        expect(isUuid(response.body.newPaciente.id)).toBe(true);
        expect(response.body).toMatchObject({      
            "newPaciente": {
                "name" : "Daniel",
                cpf : 123,
                peso : 80,
                altura : 1.80,
                imc :  24.691358024691358,
                "classificacao" : "Peso Normal"
            }
        });
       
        const responseUpd = await request(app)
        .put(`/${response.body.newPaciente.id}`)
        .send({
            "name" : "Daniel",
            cpf : 123,
            peso : 80,
            altura : 1.80
        }).expect(200);
        expect(responseUpd.body).toMatchObject({
            "name" : "Daniel",
            cpf : 123,
            peso : 80,
            altura : 1.80
        });
    });
});
        
afterAll(done => {
    app.close();
    done();
});