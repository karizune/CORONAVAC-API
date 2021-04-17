const { request, response } = require('express');
const express = require('express');
const app = express();
const cmd = require('cli-color');

const porta = 3333

app.use(express.json());

app.get('/hello-world', (request, response)=>{
    return response.send('Olá mundo');
});

app.get('/aluno/:nome',(request,response)=>{
    return response.send(`Olá ${request.params.nome}`)
});

app.post('/alunos',(request,response)=>{
    console.log(request.body);
    return response.json({"mensagem":`olá ${request.body.nome}`});
});


app.listen(porta);
process.stdout.write(cmd.erase.screen);
console.log(cmd.greenBright(`servidor rodando na porta: ${porta}`));