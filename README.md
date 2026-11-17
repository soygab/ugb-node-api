# Superheroes API

Um projeto de estudo para cadastrar super-heróis. Ele tem duas partes:

- **API (back-end):** guarda os heróis em um banco de dados e responde aos pedidos da página.
- **Página (front-end):** uma tela simples onde você vê, cadastra, edita e apaga heróis.

## O que você precisa

- [Node.js](https://nodejs.org) instalado.
- Internet, porque o visual (Tailwind) é carregado da web.

## Como rodar

Abra o terminal na pasta do projeto e rode:

```bash
cd superheroes-api
npm install
npm start
```

- `npm install` baixa as bibliotecas que o projeto usa. Só precisa rodar na primeira vez.
- `npm start` liga o servidor.

Depois, abra `http://localhost:3000` no navegador. Para desligar o servidor, aperte `Ctrl + C` no terminal.

O banco de dados (`database.sqlite`) é criado sozinho na primeira vez.

## Como usar a página

- **Cadastrar:** preencha nome, universo e poder, e clique em **Salvar**.
- **Editar:** clique em **Editar** na linha do herói, mude os dados no formulário e clique em **Salvar**.
- **Excluir:** clique em **Excluir** e confirme.
- **Cancelar:** limpa o formulário.

Os três campos são obrigatórios. Se faltar algum, aparece um aviso na tela.

## Como funciona

A página não acessa o banco direto. Ela pede as coisas para a API, e a API conversa com o banco:

```
Página (index.html)  →  API (Express)  →  Banco (SQLite)
```

Cada ação da página corresponde a uma rota da API:

| O que a página faz | Rota da API       |
|--------------------|-------------------|
| Mostrar a lista    | GET `/heroes`     |
| Cadastrar          | POST `/heroes`    |
| Editar             | PUT `/heroes/:id` |
| Excluir            | DELETE `/heroes/:id` |

Existem também `GET /heroes/:id` (busca um herói só) e `PATCH /heroes/:id` (muda só alguns campos). A página não usa essas duas, mas a API tem.

O `:id` é o número do herói. Exemplo: `/heroes/3` é o herói de id 3.

## Arquivos principais

| Arquivo                         | Para que serve                                  |
|---------------------------------|-------------------------------------------------|
| `server.js`                     | Liga o servidor e prepara o banco               |
| `src/app.js`                    | Configura o Express e entrega a página          |
| `src/routes/heroes.routes.js`   | Lista as rotas da API                           |
| `src/controllers/`              | O código que faz cada rota funcionar            |
| `src/models/`                   | Define como são os dados (Hero e Movie)         |
| `public/index.html`             | A página que você vê no navegador               |

## Tecnologias

Node.js, Express, Sequelize, SQLite, HTML, JavaScript e Tailwind CSS.
