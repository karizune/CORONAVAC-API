const request = require('supertest');

describe("1 - Teste de Autenticação JWT", () => {
    it("POST", async () => {
        const response = await request(app)
            .post("/auth/")
            .send({
                "email":"luanchrystian2@gmail.com",
                "senha":"123"
            })
            .expect(200)
    });
});

afterAll(done =>  {
    app.close();
    done();
});