const { body, validationResult } = require("express-validator");
const { validarCPF } = require("../Validators/cpfValidator");
const vacinaServico = require("../Services/vacinaService");

const VacinaValidationRules = () => {
  return [
    body("cpf")
      .isLength({ min: 11, max: 11 })
      .withMessage("Tamanho deve ser de 11 caracteres"),

    body("cpf").notEmpty().withMessage("CPF obrigatório!!"),

    body("nome").notEmpty().withMessage("Nome obrigatório!!"),

    body("nome")
      .isLength({ min: 5, max: 100 })
      .withMessage("Mínimo 5 caracteres e Máximo 100 caracteres"),

    body("flTomou")
      .notEmpty()
      .withMessage("Obrigatório inserir se tomou ou não a vacina!!"),

    body("cpf").notEmpty().withMessage("CPF obrigatório"),
    body("cpf")
      .custom((value) => {
        if (!validarCPF(value)) throw new Error("CPF é inválido!");
        return true;
      })
      .withMessage("Cpf inválido"),
    body("cpf").custom(async (value) => {
      const resultadoVacina = await vacinaServico.buscaSolicitacaoPorCpf(value);
      console.log(resultadoVacina);
      if (resultadoVacina != null) {
        throw new Error("CPF já existe, cadastro não permitido!");
      }
      return true;
    }),
  ];
};

module.exports = {
  VacinaValidationRules,
};
