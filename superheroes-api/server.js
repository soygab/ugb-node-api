// Ponto de entrada da aplicação: sobe o servidor HTTP
const app = require("./src/app");
const sequelize = require("./src/database/database");

const PORT = 3000;

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server rodando em http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Erro ao sincronizar o banco de dados:", error);
        process.exit(1); // encerra o processo, pois a API não funciona sem o banco
    });
