const jwt = require('jsonwebtoken');
const pacienteServico = require('../Services/pacienteService');

module.exports.verificarToken = async (request, response, next) => {
    const token = request.header('Authorization').split(' ');
    try {
        if (token == undefined)
            throw new Error();
        console.log('token ' + token[1]);
        const data = jwt.verify(token[1], process.env.JWT_KEY);

        const paciente = await pacienteServico.buscaPacientePorEmail(data.email);
        if (!paciente) {
            throw new Error();
        }
        request.user = paciente;
        request.token = token;
        next();
    }
    catch (error) {
        response.status(401).send({ 'error': 'Not Authorized' })
    }

}

module.exports.gerarToken = (email, senha) => {
   
    const paciente = pacienteServico.verificaEmailSenha(email, senha);
    if (paciente == null) {
        return ({ auth: false, token: null, message: "Error"});;
    }
    const token = jwt.sign({ email: paciente.email }, process.env.JWT_KEY);
    return ({ auth: true, token: token, message : "OK!!" });
}
