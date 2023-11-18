<h1 align="center">
   Api todo list Tania Bulhões 🚀 
</h1>

<p align="center">This api is an integration for sending purchase orders from the Daju order portal to TOTVS.</p>


<div align="center" dir="auto">

![Test](https://img.shields.io/static/v1?style=flat-square&logo=vitest&logoColor=white&label=Tested%20Vitest&message=0.31.4&color=6E9610)

</div>

<h1 align="center"> Como rodar o projeto</h1> 

<p align="center"></P>

## Setup application

- NodeJs 18:17.0 ou higher ✅;
- TypeScript ✅;
- Prisma ORM ✅;
- Data base Application: PostgreSQL ✅;
- Docker to containerize the developing database ✅;
- Fastfiy like router ✅;
- JWT Auth
 ✅;

#### Tech Stack

![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Fastify](https://img.shields.io/badge/Fastify-000?style=for-the-badge&logo=fastify&logoColor=white) ![Prisma](https://img.shields.io/badge/prisma-202124?style=for-the-badge&logo=Prisma&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-70961E?style=for-the-badge&logo=vitest&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-813F90?style=for-the-badge&logo=axios&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-264B7E?style=for-the-badge&logo=zod&logoColor=white) ![PostgresSQL](https://img.shields.io/badge/Postgres-fff?style=for-the-badge&logo=postgresql&logoColor=00516A) ![Ngix](https://img.shields.io/badge/Ngix-08993F?style=for-the-badge&logo=apache&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) 




#### Clone o repositório

```
https://github.com/NailsonCodens/test-fullstack-developer.git
```

#### Entre na pasta api

```
cd api
```

#### Instale as dependências

```
mpm install
```

#### Suba o container do banco de dados

```
Dcoker compose up
```

#### Rode as migrations

```
npx prisma migrate 
```

#### Gere o schema novamente do prisma

```
npx prisma generate
```

#### Faça uma cópia deste env no seu local

```

#Aplication

NODE_ENV=development
PORT=7777

#Auth
JWT_SECRET=suachave

#Token and Refresh Token
NAME_TOKEN='auth_token'
NAME_REFRESH_TOKEN='auth_refresh_token'
EXPIRES_IN_TOKEN='1d'
EXPIRES_IN_REFRESH_TOKEN='7d'

#Database
DATABASE_URL="postgresql://docker:docker@localhost:5432/todo?schema=public"

...

#Endpoints Totvs
ENDPOINT=
...
```

#### Rode em local host

```
npm run dev
```

#### Rode para produção 

```
npm run build
```

#### Rode os teste

```
npm run test
npm run test:watch
```

#### aplicações da rota

<table>
  <tr>
    <td><b>Authenticação</b></td>
    <td>POST</td>
    <td>https://taniatestpi.codens.com.br/sessions</td>
  </tr>
  <tr>
    <td><b>Refresh Token</b></td>
    <td>PATCH</td>
    <td>
      https://taniatestpi.codens.com.br/token/refresh 
    </td>
  </tr>
  <tr>
    <td><b>Cadastrar uma todo</b></td>
    <td>POST</td>
    <td>
      https://taniatestpi.codens.com.br/todos
    </td>
  </tr>
    <tr>
    <td><b>lista todas todos</b></td>
    <td>GET</td>
    <td>
      https://taniatestpi.codens.com.br/todos 
    </td>
  </tr>
  <tr>
    <td><b>lista as métricas</b></td>
    <td>GET</td>
    <td>
      https://taniatestpi.codens.com.br/todos/metrics
    </td>
  </tr>
  <tr>
    <td><b>lista uma todo</b></td>
    <td>GET</td>
    <td>
      https://taniatestpi.codens.com.br/todos/{id} 
    </td>
  </tr>
    <tr>
    <td><b>Atualiza uma todo</b></td>
    <td>PUT</td>
    <td>
      https://taniatestpi.codens.com.br/todos/{id} 
    </td>
  </tr>
  <tr>
    <td><b>Deleta uma todo</b></td>
    <td>PDLETEATCH</td>
    <td>
      https://taniatestpi.codens.com.br/todos/conclude/{id} 
    </td>
  </tr>
    <tr>
      <td><b>Conclui uma todo</b></td>
      <td>PATCH</td>
      <td>
        https://taniatestpi.codens.com.br/todos/conclude/{id} 
      </td>
  </tr>
</table>
