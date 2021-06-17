const { Router } = require('express');
const authService = require('../services/authService.js');

const Authroutes = Router();

Authroutes.post('/', async (request, response) => {
    let {email, senha} = request.body;
    pacienteEmail = await authService.verificaEmailSenha(email,senha)
    const retornoToken = authService.gerarToken(pacienteEmail);
    return response.json(retornoToken);
});

module.exports = Authroutes;