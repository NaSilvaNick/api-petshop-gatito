import express from "express";
import bodyParser from "body-parser";
import config from "config";
import roteador from "./rotas/fornecedores/index.js";

const app = express();

app.use(bodyParser.json())

app.use("/api/fornecedores", roteador);

app.listen(
    config.get("api.port"),
    () => console.log(`A API está funcionando na porta ${config.get("api.port")}`)
)

export default app;