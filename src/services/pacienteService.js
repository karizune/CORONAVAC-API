const pacienteRepositorio = require("../data/pacienteRepositorio.js");
const calculadoraImc = require("../util/imc");

//its ok
module.exports.buscaPaciente = async function () {
  return pacienteRepositorio.buscaPaciente();
};

//its ok
module.exports.buscaPacientePorCpf = async function (cpf) {
  return await pacienteRepositorio.buscaPacientePorCpf(cpf);
};

//its ok
module.exports.buscaUsuarioPaciente = async function (usuario) {
  const UsuarioRetorno = await pacienteRepositorio.buscaUsuarioPaciente(usuario);
  if(UsuarioRetorno.email != undefined && UsuarioRetorno.email == usuario.email && UsuarioRetorno.senha == usuario.senha){
    return UsuarioRetorno
  }
  else{
    return null
  }
};

module.exports.buscaPacientePorEmail = async function (email) {
  return await pacienteRepositorio.buscaPacientePorEmail(email);
};

module.exports.insereUsuario = async function (novoUsuario){
  const usuarioRetorno = await pacienteRepositorio.buscaPacientePorEmail(novoUsuario.email);
  if(!usuarioRetorno){
    return pacienteRepositorio.insereUsuario(novoUsuario);
  }
  return null;
}




module.exports.inserePaciente = async function (novoPaciente) {
  const pacienteRetorno = await pacienteRepositorio.buscaPaciente(novoPaciente.cpf);
  if (!pacienteRetorno) {
    return null;
  }
  const { peso, altura } = novoPaciente;
  let imc = calculadoraImc.imc(peso, altura);
  let classificacao = calculadoraImc.classificacao(imc);
  novoPaciente.imc = imc;
  novoPaciente.classificacao = classificacao;
  return pacienteRepositorio.inserePaciente(novoPaciente);
};

module.exports.atualizaPaciente = async function (atualizaPaciente) {
  const pacienteRetorno = await pacienteRepositorio.buscaPacientePorCpf(
    atualizaPaciente.cpf
  );
  if (pacienteRetorno.length == 0) {
    return false;
  }

  const resultadoPaciente = await pacienteRepositorio.atualizaPaciente(
    atualizaPaciente
  );
  return true;
};

module.exports.removePaciente = async function (cpf) {
  const pacienteRetorno = await pacienteRepositorio.buscaPacientePorCpf(cpf);
  if (pacienteRetorno.length == 0) {
    return false;
  }

  const resultadoPaciente = await pacienteRepositorio.removePaciente(cpf);
  return true;
};

module.exports.buscaPacientePorEmail = async function (email) {
  return await pacienteRepositorio.buscaPacientePorEmail(email);
};

module.exports.verificaEmailSenha = function (email, senha) {
  return pacienteRepositorio.verificaEmailSenha(email, senha);
};
