const vacinaRepositorio = require('../data/vacinaRepositorio');

module.exports.buscaSolicitacoesVacina = async function(){
    return vacinaRepositorio.buscaSolicitacoesVacina();
}

module.exports.buscaSolicitacaoPorCpf =  function (cpf){
    return vacinaRepositorio.buscaSolicitacaoPorCpf(cpf);
}

module.exports.inserePacienteParaVacina = async function (novaVacinacao){
    const vacinaRetorno = vacinaRepositorio.buscaSolicitacaoPorCpf(novaVacinacao.cpf);
    if (vacinaRetorno.length == 0) {
    return null;
    }
    return vacinaRepositorio.inserePacienteParaVacina(novaVacinacao);
}

module.exports.atualizaVacinacao = async function (atualizaVacinacao){
    const vacinaRetorno = await vacinaRepositorio.buscaSolicitacaoPorCpf(atualizaVacinacao.cpf);
    if (vacinaRetorno.length == 0){
        return false;
    }
    const resultadoVacina = await vacinaRepositorio.atualizaVacinacao(atualizaVacinacao);
    return true;
}

module.exports.removeVacinacao =  async function (cpf){
    const vacinaRetorno = await vacinaRepositorio.buscaSolicitacaoPorCpf(cpf);
    if (vacinaRetorno.length == 0){
      return false;
    }
    const resultadoVacina = await vacinaRepositorio.removeVacinacao(cpf);
    return true;
}
  
module.exports.verificaEmailSenha = function (email, senha) {
    return vacinaRepositorio.verificaEmailSenha(email, senha);
}

module.exports.buscaAlunoPorEmail = function (email) {
    return vacinaRepositorio.buscaAlunoPorEmail(email);
}