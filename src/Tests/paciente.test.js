require("dotenv").config({ path: "./src/Config/.env" });
const request = require("supertest");
const app = require("../index");

const cpf = process.env.CPF;
const token = "Bearer " + process.env.jwt_dev_token;

describe("Paciente 1 - Teste de busca de lista de pacientes cadastrados", () => {
  it("GET", async () => {
    const response = await request(app).get("/paciente/").expect(200);
  });
});

describe("Paciente 2 - Teste de inserir novo paciente", () => {
  it("POST", async () => {
    const response = await request(app)
      .post("/paciente")
      .send({
        nome: "Luan Chrystian Galan",
        cpf: "14035895695",
        altura: 1.7,
        peso: 1,
        imc: 25,
        classificacao: "gordo",
        cidade: "Araxá",
        UF: "MG",
        listaComorbidades: "",
        JaTeveCovid: "Não",
        JaTomouVacina: "Primeira dose",
        email: "luanchrystian@gmail.com",
        senha: "123",
      })
      .expect(422);
  });
});

describe("Paciente 3 - Teste de deletar um paciente que não existe", () => {
  it("DELETE - paciente 123 que não existe", async () => {
    await request(app).delete("/123").expect(404);
  });
});

afterAll((done) => {
  app.close();
  done();
});
