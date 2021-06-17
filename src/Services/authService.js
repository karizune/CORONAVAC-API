require("dotenv").config({ path: "./src/Config/.env" });
const jwt = require("jsonwebtoken");
const pacienteServico = require("./pacienteService");

module.exports.verificarToken = async (request, response, next) => {
  try {
    const token = request.header("Authorization").split(" ");
    if (token == undefined) {
      throw new Error();
    }
    const data = jwt.verify(token[1], process.env.JWT_KEY);
    const paciente = await pacienteServico.buscaPacientePorEmail(data.email);
    if (!paciente) {
      throw new Error();
    }
    request.user = paciente;
    request.token = token;
    next();
  } catch (error) {
    response.status(401).send({ error: "Não Autorizado" });
  }
};

module.exports.gerarToken = (email) => {
  if (email == null) {
    return { auth: false, token: null, message: "Error" };
  }
  const token = jwt.sign({ email: email }, process.env.JWT_KEY);
  return { auth: true, token: token, message: "OK!!" };
};

module.exports.verificaEmailSenha = async (email, senha) => {
  const paciente = await pacienteServico.verificaEmailSenha(email, senha);
  if (paciente != undefined) {
    return paciente.email;
  }
  return null;
};
