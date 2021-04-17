const { body, validationResult } = require('express-validator')
const VacinaValidationRules = () => {
    return [
        body('email').isEmail().withMessage("E-mail inválido"),
        body('cpf').isLength({ min: 11, max: 11 }).withMessage("Tamanho deve ser de 11 caracteres"),
        body('email').notEmpty().withMessage("E-mail obrigatório!!"),
        body('cpf').notEmpty().withMessage("CPF obrigatório!!"),
        body('nome').notEmpty().withMessage("Nome obrigatório!!"),
        body('nome').isLength({ min: 5, max: 100 }).withMessage("Mínimo 5 caracteres e Máximo 100 caracteres"),
        body('senha').notEmpty().withMessage("Senha obrigatória!!"),
        
    
    ]
}

module.exports = {
    VacinaValidationRules,
}