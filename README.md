# Superheroes API

API REST de super-heróis feita com Node.js, Express e Sequelize (SQLite).

## Como rodar

Pré-requisito: Node.js instalado.

```bash
cd superheroes-api
npm install
npm start
```

O servidor sobe em `http://localhost:3000`. O banco (`database.sqlite`) e as tabelas são criados automaticamente na primeira execução.

Para desenvolvimento, com reinício automático ao salvar arquivos:

```bash
npm run dev
```

## Estrutura

```
superheroes-api/
├── server.js                  # Sincroniza o banco e sobe o servidor
└── src/
    ├── app.js                 # Configuração do Express, relacionamentos e middlewares
    ├── database/database.js   # Conexão com o SQLite
    ├── models/                # Hero e Movie
    ├── controllers/           # Lógica de cada endpoint
    └── routes/                # Definição das rotas
```

## Modelo Hero

| Campo      | Tipo    | Obrigatório | Observação          |
|------------|---------|-------------|---------------------|
| `id`       | inteiro | -           | Gerado pelo banco   |
| `name`     | texto   | sim         |                     |
| `universe` | texto   | sim         | Ex.: Marvel, DC     |
| `power`    | texto   | sim         |                     |

## Endpoints

| Método | Rota          | Descrição                                   | Status de sucesso |
|--------|---------------|---------------------------------------------|-------------------|
| GET    | `/heroes`     | Lista todos os heróis                       | 200               |
| GET    | `/heroes/:id` | Busca um herói pelo id                      | 200               |
| POST   | `/heroes`     | Cria um herói                               | 201               |
| PUT    | `/heroes/:id` | Substitui o herói (exige todos os campos)   | 200               |
| PATCH  | `/heroes/:id` | Atualiza só os campos enviados              | 200               |
| DELETE | `/heroes/:id` | Remove o herói                              | 204               |

Erros comuns: `400` (dados ou id inválidos), `404` (herói ou rota não encontrados) e `500` (erro interno).

## Exemplos

Criar um herói:

```bash
curl -X POST http://localhost:3000/heroes \
  -H "Content-Type: application/json" \
  -d '{"name": "Batman", "universe": "DC", "power": "Dinheiro"}'
```

Listar todos:

```bash
curl http://localhost:3000/heroes
```

Atualizar só o poder:

```bash
curl -X PATCH http://localhost:3000/heroes/1 \
  -H "Content-Type: application/json" \
  -d '{"power": "Intelecto"}'
```

Substituir por completo:

```bash
curl -X PUT http://localhost:3000/heroes/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Bruce Wayne", "universe": "DC", "power": "Intelecto"}'
```

Remover:

```bash
curl -X DELETE http://localhost:3000/heroes/1
```
