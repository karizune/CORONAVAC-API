const vacinaRepositorio = require('../models/vacina.js');

module.exports.buscaSolicitacoesVacina = async function () {
    return await vacinaRepositorio.find();
}

module.exports.buscaPacientePorCpf = async function (cpf){
    return await vacinaRepositorio.find({ cpf });
}


module.exports.buscaSolicitacaoPorCpf = async function (cpf){
    return await vacinaRepositorio.find({ cpf });
}

module.exports.inserePacienteParaVacina = async function (novaVacinacao){
    const {nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf} = novaVacinacao;
    const retornoVacina = await vacinaRepositorio.create({nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao,cpf});
    return retornoVacina;
}

module.exports.atualizaVacinacao = async function (atualizaVacinacao){
    const {nome, dataSolicitacao, dataPrevista, nroDose, flTomou, dataVacinacao, cpf} = atualizaVacinacao;
    const vacinaAtualizada = await vacinaRepositorio.updateOne(
        { cpf },
        {
            $set:
            {
                 nome
            }
        }
        );
    return vacinaAtualizada;
}

module.exports.removeVacinacao = async function (cpf) {
    return vacinaRepositorio.deleteOne({ cpf });
}

module.exports.verificaEmailSenha = async function (email, senha) {
    return await vacinaRepositorio.findOne({ email, senha });
}
