const pacienteRepositorio = require('../Data/pacienteRepositorio.js');
const calculadoraImc = require ('../util/imc');

module.exports.buscaPaciente = async function(){
  return pacienteRepositorio.buscaPaciente();
}

module.exports.buscaPacientePorCpf = async function(cpf){
  return await pacienteRepositorio.buscaPacientePorCpf(cpf);
}

module.exports.inserePaciente = async function(novoPaciente){
  const pacienteRetorno = await pacienteRepositorio.buscaPaciente(novoPaciente.cpf);
    if (pacienteRetorno.length != 0) {
      return null;
    }
    const {peso,altura} = novoPaciente;
    let imc = calculadoraImc.imc(peso,altura);
    let classificacao = calculadoraImc.classificacao(imc);
    novoPaciente.imc = imc;
    novoPaciente.classificacao = classificacao; 
  return pacienteRepositorio.inserePaciente(novoPaciente);
}

module.exports.atualizaPaciente = async function(atualizaPaciente){
  const pacienteRetorno = await pacienteRepositorio.buscaPacientePorCpf(atualizaPaciente.cpf);
  if (pacienteRetorno.length == 0){
  return false;
  }
  
  const resultadoPaciente = await pacienteRepositorio.atualizaPaciente(atualizaPaciente);
  return true;
}

module.exports.removePaciente =  async function(cpf){
  const pacienteRetorno = await pacienteRepositorio.buscaPacientePorCpf(cpf);
  if (pacienteRetorno.length == 0){
    return false;
  }
  
  const resultadoPaciente = await pacienteRepositorio.removePaciente(cpf);
  return true;
}

module.exports.buscaPacientePorEmail = async function(email){
  return await pacienteRepositorio.buscaPacientePorEmail(email);
}

module.exports.verificaEmailSenha= function(email , senha){
  return pacienteRepositorio.verificaEmailSenha(email, senha);
}
    




  