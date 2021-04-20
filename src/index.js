const express = require("express");
const cors = require("cors");
const cmd = require("cli-color");

const routes = require("./routes/pacientesRota");
const routes2 = require("./routes/vacinaRota");
const Authroutes = require("./routes/authRota");
const connectDB = require("./infra/database");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/auth", Authroutes);
app.use("/paciente", routes);
app.use("/vacina", routes2);

module.exports = app.listen(process.env.PORT || 3333, () => {
  console.log(cmd.greenBright("Servidor rodando ", cmd.blueBright("(☞ﾟヮﾟ)☞")));
});
