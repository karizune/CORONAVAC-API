const { Router } = require('express');
const authService = require('../Services/authService.js');

const Authroutes = Router();

Authroutes.post('/', async (request, response) => {
    let {email, senha} = request.body;
    const retornoToken = authService.gerarToken(email,senha);
    return response.json(retornoToken);
});

module.exports = Authroutes;