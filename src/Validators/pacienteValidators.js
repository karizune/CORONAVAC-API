const { body, validationResult } = require('express-validator')
const { cpf } = require('cpf-cnpj-validator');

//funcao aplica validação
const PacienteValidationRules = () => {
    return [
        body('cpf').notEmpty().withMessage("CPF obrigatório."),
        body('nome').notEmpty().withMessage("Nome obrigatório."),
        body('peso').notEmpty().withMessage("Peso é obrigatório."),
        body('senha').notEmpty().withMessage("Senha obrigatória."),
        body('email').notEmpty().withMessage("E-mail obrigatório."),
        body('altura').notEmpty().withMessage("Altura é obrigatório."),
        body('dataNascimento').notEmpty().withMessage("Data de nascimento é obrigatório."),
        body('email').isEmail().withMessage("E-mail inválido"),
        body('cpf').isLength({ min: 11, max: 11 }).withMessage("Tamanho deve ser de 11 caracteres"),
        body('nome').isLength({ min: 5, max: 100 }).withMessage("Mínimo 5 caracteres e Máximo 100 caracteres"),
        body('peso').isFloat({gt:0.0}).withMessage("Peso precisa ser maior que 0"),
        body('altura').isFloat({gt:0.0}).withMessage("Altura precisa ser maior que 0"),
    ]
}

module.exports = {
    PacienteValidationRules,
}