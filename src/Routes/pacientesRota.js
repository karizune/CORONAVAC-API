const { Router, request } = require("express");
const pacienteServico = require("../Services/pacienteService.js");
const autenticacaoJWT = require("../Services/authService.js");
const { validate } = require("../Validators/validators.js");
const {
  PacienteValidationRules,RegistraUsuarioRules
} = require("../Validators/pacienteValidators.js");

const routes = Router();

//ok
routes.get("/", async (request, response) => {
  const pacienteRetorno = await pacienteServico.buscaPaciente();
  return response.json(pacienteRetorno);
});

//ok
routes.get(
  "/:cpf",
  autenticacaoJWT.verificarToken,
  async (request, response) => {
    const { cpf } = request.params;
    const pacienteRetorno = await pacienteServico.buscaPacientePorCpf(cpf);
    return response.json(pacienteRetorno);
  }
);

// login funcionando corretamente (SEM JWT)
routes.post(
  "/Login",
  async (request, response) => {
    const { email, senha } = request.body;
    const usuario = { email, senha};
    let pacienteRetorno;
    pacienteRetorno = await pacienteServico.buscaUsuarioPaciente(usuario);
    if (pacienteRetorno != null){
    return response.status(200).json({ "auth":true, pacienteRetorno });
    }
    return response.status(404).json({ "Falha no Login": "Usuário ou senha incorretos" });
  }
);

// 
routes.post("/Register", RegistraUsuarioRules(), validate, async (request, response) => {
    const {
      nome,
      email,
      senha,
    } = request.body;

    const novoUsuario = {
      nome,
      email,
      senha,
    };
    const usuarioRetorno = await pacienteServico.insereUsuario(novoUsuario);
    if (usuarioRetorno == null) {
      return response.status(500).json({ ERROR: "CPF Paciente já existe. Paciente não inserido" });
    }
    return response.status(201).json({ usuarioRetorno });
  }
);






//post section
//insere um novo paciente
routes.post(
  "/",
  PacienteValidationRules(),
  validate,
  async (request, response) => {
    const {
      nome,
      cpf,
      altura,
      peso,
      imc,
      classificacao,
      dataNascimento,
      cidade,
      UF,
      listaComorbidades,
      JaTeveCovid,
      email,
      senha,
    } = request.body;

    const novoPaciente = {
      nome,
      cpf,
      altura,
      peso,
      imc,
      classificacao,
      dataNascimento,
      cidade,
      UF,
      listaComorbidades,
      JaTeveCovid,
      email,
      senha,
    };
    const pacienteRetorno = await pacienteServico.inserePaciente(novoPaciente);
    if (pacienteRetorno === null) {
      response
        .status(500)
        .json({ ERROR: "CPF Paciente já existe. Paciente do not be inserted" });
    }
    return response.status(201).json({ pacienteRetorno });
  }
);

//put section
routes.put("/:cpf", async (request, response) => {
  const { cpf } = request.params;
  const {
    nome,
    altura,
    peso,
    dataNascimento,
    cidade,
    UF,
    listaComorbidades,
    JaTeveCovid,
  } = request.body;
  const pacienteAtualizar = {
    nome,
    cpf,
    nome,
    altura,
    peso,
    dataNascimento,
    cidade,
    UF,
    listaComorbidades,
    JaTeveCovid,
    email,
    senha,
  };
  const pacienteRetorno = await pacienteServico.atualizaPaciente(
    pacienteAtualizar
  );
  if (!pacienteRetorno) {
    return response.status(404).json({ error: "Paciente não encontado!" });
  }
  return response.status(200).json({ ok: "Paciente Atualizado!" });
});

//delete section (NOT WORKING)
routes.delete(
  "/:cpf",
  autenticacaoJWT.verificarToken,
  async (request, response) => {
    const { cpf } = request.params;
    const pacienteRetorno = await pacienteServico.removePaciente(cpf);
    if (!pacienteRetorno) {
      return response.status(404).json({ error: "Paciente não encontrado!!" });
    }
    return response.status(200).json({ Message: `Paciente ${cpf} removido` });
  }
);

module.exports = routes;
