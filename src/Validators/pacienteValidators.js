const { body, validationResult } = require("express-validator");
const { validarCPF } = require("../Validators/cpfValidator");
const pacienteServico = require("../Services/pacienteService");
//funcao aplica validação

const RegistraUsuarioRules = () => {
  
  const Errors = [
    body("nome")
      .notEmpty()
      .withMessage("Nome é obrigatório"),

    body("email")
      .isEmail()
      .notEmpty()
      .withMessage("Email inválido/obrigatório"),

    body("senha")
      .notEmpty()
      .withMessage("Senha obrigatória"),

    body("email")
      .custom(async (email)=>{
        await pacienteServico.buscaPacientePorEmail(email).then((response)=>{
          if(response != null){
            throw new Error("Email já cadastrado");
          }
        });
        return false;
    })
  ]
  
  return Errors;
}




const PacienteValidationRules = () => {
  return [
    body("nome").notEmpty().withMessage("Nome: obrigatório!!"),
    body("nome")
      .isLength({ min: 4, max: 100 })
      .withMessage("Nome: Mínimo 4 caracteres e Máximo 100 caracteres"),
    body("cpf")
      .isLength({ min: 11, max: 11 })
      .withMessage("CPF deve ter tamanho de 11 caracteres"),
    body("cpf").notEmpty().withMessage("CPF: obrigatório"),
    body("cpf").custom((value) => {
        if (!validarCPF(value)) throw new Error("CPF: inválido!");
        return true;
      })
      .withMessage("Cpf: inválido"),
    body("cpf").custom(async (value) => {
      const resultadoPaciente = await pacienteServico.buscaPacientePorCpf(
        value
      );
      if (resultadoPaciente != null) {
        return json({"Erro":"CPF já existe, cadastro não permitido!"});
      }
      return true;
    }),
    body("email")
    .custom(async (value) => {
      const resultadoPaciente = await pacienteServico.buscaPacientePorEmail(
        value
      );
      if (resultadoPaciente != null) {
        return false
      }
      return true;
    })
    .withMessage("Email já existe , cadastro não permitido"),
    body("email").isEmail().withMessage("E-mail: inválido"),
    body("email").notEmpty().withMessage("E-mail: obrigatório!!"),
    body("peso")
      .notEmpty()
      .isLength({ min: 1, max: Infinity })
      .withMessage("Peso: Obrigatório"),
    body("altura")
      .notEmpty()
      .isLength({ min: 1, max: Infinity })
      .withMessage("Altura: obritatório"),
    body("senha").notEmpty().withMessage("Senha: obrigatória!!"),





    /*
    body("dataNascimento")
      .notEmpty()
      .withMessage("Data de Nascimento é obrigatória!!"),
    */



  ];
};

module.exports = {
  PacienteValidationRules,
  RegistraUsuarioRules
};
