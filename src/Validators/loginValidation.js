const { body, validationResult } = require("express-validator");
const { validarCPF } = require("../Validators/cpfValidator");
const pacienteServico = require("../Services/pacienteService");
//funcao aplica validação


const LoginValidationRules = () =>{
    let errors = [
        body("email").notEmpty().withMessage("Email obrigatório"),
        body("email").isEmail().withMessage("Email inválido"),
        body("senha").notEmpty().withMessage("Senha obrigatória")
    ]

    return errors 
}



module.exports = {
    LoginValidationRules
};
