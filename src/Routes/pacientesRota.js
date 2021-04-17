const { Router, request } = require('express');
const pacienteServico = require('../Services/pacienteService.js');
const autenticacaoJWT = require('../Services/authService.js');
const { validate } = require('../Validators/validators.js');
const { PacienteValidationRules } = require('../Validators/pacienteValidators.js');

const routes = Router();
routes.get('/', async (request, response) => {
    const pacienteRetorno = await pacienteServico.buscaPaciente();
    return response.json(pacienteRetorno);
});

routes.get('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    const { cpf } = request.params;
    const pacienteRetorno = await pacienteServico.buscaPacientePorCpf(cpf);
    return response.json(pacienteRetorno);
});

routes.post('/', PacienteValidationRules(), validate , async (request, response) => {
    const { nome, cpf, altura,  peso, imc , classificacao, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid, email, senha } = request.body;
    console.log(request.body);
    const novoPaciente = { nome, cpf, altura, peso , imc, classificacao, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid, email, senha};
    const pacienteRetorno = await pacienteServico.inserePaciente(novoPaciente);
    if (pacienteRetorno === null){
        response.status(500).json({ "ERROR": "CPF Paciente já existe. Paciente do not be inserted" });
    }
    return response.status(201).json({ pacienteRetorno });
});

routes.put('/:cpf', async (request, response) => {
    const { cpf} = request.params;
    const { nome, altura, peso, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid } = request.body;
    const pacienteAtualizar = {nome,cpf, nome, altura, peso, dataNascimento, cidade, UF , listaComorbidades , JaTeveCovid, email, senha};
    const pacienteRetorno = await pacienteServico.atualizaPaciente(pacienteAtualizar);      
    if (!pacienteRetorno){
        return response.status(404).json({ "error": "Paciente não encontado!" });
    }
    return response.status(200).json({ "ok": "Paciente Atualizado!" });    
});
        
routes.delete('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {   
    const { cpf } = request.params;
    console.log(cpf); 
    const pacienteRetorno = await pacienteServico.removePaciente(cpf);
    if (!pacienteRetorno){
        return response.status(404).json({ "error": "Paciente não encontrado!!" });
    }
    return response.status(200).json({ "Message": `Paciente ${cpf} removido` });
});

module.exports = routes;