const { Router, request } = require('express');
const vacinaServico = require('../Services/vacinaService.js');
const autenticacaoJWT = require('../Services/authService.js');
const { validate } = require('../Validators/Validators.js');
const { VacinaValidationRules } = require('../Validators/vacinaValidators.js');

const routes2 = Router();
routes2.get('/', autenticacaoJWT.verificarToken, async (request, response) => {
    const vacinaRetorno = await vacinaServico.buscaSolicitacoesVacina();
    return response.json(vacinaRetorno);
});

routes2.get('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => {
    const { cpf } = request.params;
    const vacinaRetorno = await vacinaServico.buscaSolicitacaoPorCpf(cpf);
    return response.json(vacinaRetorno);
});

routes2.post('/', VacinaValidationRules() ,  validate, async (request, response) => {
    const { nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao,cpf } = request.body;
    console.log(request.body);
    const novaVacinacao = {  nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf};
    const vacinaRetorno = await vacinaServico.inserePacienteParaVacina(novaVacinacao);
    if (vacinaRetorno === null){
        response.status(500).json({ "ERROR": "Pessoa já está na fila. Paciente não foi inserido!!" });
    }
    return response.status(201).json({ vacinaRetorno });
});

routes2.put('/vacina/:cpf', async (request, response) => {
    const { cpf} = request.params;
    const { nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao} = request.body;
    const vacinacaoAtualizar = {nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf};
    const vacinaRetorno = await vacinaServico.atualizaVacinacao(vacinacaoAtualizar);      
    if (!vacinaRetorno){
        return response.status(404).json({ "error": "Paciente não encontado!" });
    }
    return response.status(200).json({ "ok": "Paciente Atualizado!" });    
});
        
routes2.delete('/:cpf', autenticacaoJWT.verificarToken, async (request, response) => { 
    const { cpf } = request.params;
    console.log(cpf); 
    const vacinaRetorno = await vacinaServico.removeVacinacao(cpf);
    if (!vacinaRetorno){
        return response.status(404).json({ "error": "Paciente não encontrado!!" });
    }
    return response.status(200).json({ "Message": `Pessoa ${cpf} removida da fila de Vacinação!!!` });
});

module.exports = routes2;