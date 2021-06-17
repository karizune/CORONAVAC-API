require("dotenv").config({ path: "./src/Config/.env" });

const mongoose = require("mongoose");
const cmd = require("cli-color");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(cmd.greenBright("Conectado ao cluster do MongoDB"));
  } catch (error) {
    console.error(cmd.redBright("Falha em conectar ao cluster do MongoDB"));
    process.exit(1);
  }
};

module.exports = connectDB;
