# Nexo Backend - API de Seguros Automotivos

Backend desenvolvido em equipe para o projeto **Nexo**, uma plataforma de gestao de seguros automotivos. A API centraliza cadastro de usuarios, autenticacao, veiculos, planos de seguro e associacao entre carros e coberturas, com regras de negocio aplicadas ao contexto de seguros.

O projeto foi construido com foco em APIs REST, organizacao de entidades, validacao de dados, documentacao tecnica e deploy em ambiente cloud, alinhado a praticas usadas em aplicacoes backend corporativas.

## Links do Projeto

- Repositorio back-end: https://github.com/Grupo-05-Turma-JavaScript-08/nexo_back
- Repositorio front-end: https://github.com/Grupo-05-Turma-JavaScript-08/nexo_front
- Deploy back-end: adicionar URL do Render
- Deploy front-end: adicionar URL do Render
- Documentacao Swagger: `/swagger`

## Principais Funcionalidades

- Cadastro e autenticacao de usuarios.
- Autenticacao com JWT e criptografia de senha com bcrypt.
- CRUD de veiculos com dados como modelo, placa, valor, descricao e ano de fabricacao.
- CRUD de planos de seguro.
- Associacao entre veiculos, usuarios e seguros.
- Regras de negocio para calculo de premio e status do seguro.
- Validacao de dados com `class-validator`.
- Documentacao interativa dos endpoints com Swagger/OpenAPI.
- Configuracao de banco para desenvolvimento e producao.

## Tecnologias

- Node.js
- TypeScript
- NestJS
- TypeORM
- PostgreSQL
- MySQL
- JWT
- bcrypt
- Swagger/OpenAPI
- Postman/Insomnia
- Git/GitHub
- Render

## Contexto Tecnico

Este backend reforca competencias em desenvolvimento de APIs REST, modelagem relacional, autenticacao, integracao com frontend e documentacao de endpoints. Tambem representa uma experiencia pratica em trabalho em equipe, organizacao por modulos e entrega de funcionalidades dentro de um fluxo de projeto.

## Como Rodar Localmente

```bash
npm install
npm run start:dev
```

Para gerar a build de producao:

```bash
npm run build
npm run start:prod
```

## Variaveis de Ambiente

Em producao, o projeto usa `DATABASE_URL` para conexao com PostgreSQL:

```env
DATABASE_URL=postgresql://usuario:senha@host:porta/banco
PORT=4000
```

Em desenvolvimento, o servico `DevService` tambem aceita variaveis separadas de banco:

```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
NODE_ENV=development
```

## Deploy no Render

Configuracao recomendada para o Render:

```bash
Build Command: npm ci && npm run build
Start Command: npm run start:prod
```

## Autor

Desenvolvido em equipe no bootcamp da Generation Brasil, com participacao de Gabriel Martins no desenvolvimento backend.
