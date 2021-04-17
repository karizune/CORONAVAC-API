module.exports.imc = function (peso, altura) {
    return  peso / (altura*altura);
}

module.exports.classificacao = function(vlrIMC) { 
    switch (vlrIMC) {
        case vlrIMC < 18.5:
            "Peso baixo"
            break;
        case vlrIMC >= 18.5 && vlrIMC < 24.9:
            "Peso normal"
            break;
        case vlrIMC >= 25.0 && vlrIMC < 29.9:
            "Sobrepeso"
        break;
        case vlrIMC >= 30.0  && vlrIMC < 34.9:
            "Obesidade de primeiro grau"
        break;
        case vlrIMC >= 35.0  && vlrIMC < 39.9:
            "Obesidade severa de segundo grau"
        break;
        case vlrIMC >= 40.0:
            "Obesidade severa de terceiro grau"
        break;
    }
}