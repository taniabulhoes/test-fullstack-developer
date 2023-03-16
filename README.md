[![Tania Bulhoes Logo](https://images.squarespace-cdn.com/content/v1/625f0af3cbf96235f8de8b4a/539097a0-548d-4a84-a5fa-6cbbad1964a0/Tania_bulhoes_Logo_Horizontal_Positivo_RGB.png?format=1500w)](https://tbi.taniabulhoes.com.br/)

>- Todos os interessados que fizerem Pull Request receberão um feedback da Tania Bulhões.<br>
>- Essa prova consiste em testar seus conhecimentos em desenvolvimento de fullstack web applications.
>- Estamos priorizando desenvolvedores com proficiência na stack NodeJS + React, portanto no momento não avaliaremos PRs em que o Dev entregue uma solução que utiliza uma stack diferente para desenvolvê-la.

### Requisitos
- [React](https://reactjs.org/docs/getting-started.html)
- NodeJS
- SQL Database (Postgres, Mysql, MariaDB)
- Utilizar Typescript
- Arquitetura MVC para a API
- Repositório Github
- Instruções no README.md do repositório para rodar a aplicação de forma local

### Desejáveis
- Utilizar [NextJS](https://nextjs.org/) para o desenvolvimeto do frontend da aplicação
- Tela de cadastro de usuário com os seguintes campos:
  - Nome
  - E-mail
  - Senha
- Campo de busca de tarefas (por título) na tela de listagem
- Testes unitários
- Link hospedado para homologação (Pode ser um preview da Vercel, caso utilize o NextJS como framework para desenvolvimento)

## Como participar?
1. Clone este repositório
2. Crie uma branch com o seguinte padrão de nomeclatura `devtest-{seu_primeiro_nome}-{seu_sobrenome}`. (Ex:. `devtest-fulado-detal`)
3. Durante seu seu desenvolvimento, vá realizando commits nessa sua nova branch
4. Após finalizar a prova, crie um Pull Request da sua branch para a `main` para ser analisado por nós. :D
> Na descrição do PR, deixe qualquer diretiva necessária para rodar o projeto (Comandos para rodar a aplicação, testes, etc), bem como dependências (banco de dados, etc) localmente. <br>

## Detalhes da prova
A prova consiste em criar uma aplicação web simples de **To Do List (Lista de tarefas)**.

Sinta-se à vontade para utilizar quaisquer libs que desejar (Axios, Dio, TypeORM, Sequelize, etc).

O software deve ser dividido em 3 camadas isoladas:
>
>**- Banco de dados:**
>  - Deve ser relacional e só pode ser acessado a partir do backend, nunca diretamente da camada de frontend
>
>**- Backend:**
 > - Deve se comunicar com o banco de dados e expor os recursos necessários para a camada de frontend através de endpoints de uma REST API.
>
>**- Frontend:**
 > - Deve se comunicar com o backend através da API desenvolvida e entregar a experiência do software ao usuário.

A aplicação deve conter no mínimo 4 telas, sendo 3 delas privadas e 1 pública. Sendo elas:
  - Tela de Login **(Pública)**
  - Tela de Listagem de Tarefas **(Privada)**
    - Nesta tela devemos ser capazes de excluir uma tarefa
  - Tela de Cadastro de uma Nova Tarefa **(Privada)**
  - Tela de Ediçao de uma Nova Tarefa **(Privada)**
    - Nesta tela devemos ser capazes de excluir uma tarefa

### Diretivas importantes:
- Todos os dados devem ser salvos em um banco de dados relacional de sua escolha.
- As telas privadas só podem ser acessadas na aplicação após login.

### Funcionalidades
Deve conter no app as seguintes funcionalidades:

1. Navegação com dados do usuário e itens de menu
2. Listagem de tarefas
3. Criação de nova tarefa
4. Edição e exclusão de tarefa
5. Exibir alerta de confirmaçao de exclusão
6. Exibir Toaster feedbacks para erros que acontecerem na aplicação
7. Utilizar alguma estrutura para gerenciamento de estado global da aplicação (Context API, Redux, Hooks, etc)
8. OAuth via JWT token no fluxo de login do usuário
9. Autenticação JWT token em todos os endpoints privados da API

*Obs.: Não é obrigatório criar página de cadastro de usuário, mas caso seja feito, será considerado um diferencial*

*Obs2.: Sinta-se livre para implementar o estilo visual que preferir, utilizando qualquer framework css de sua preferência (styles-components, ant, material, bootstrap, etc). Avaliaremos apenas se a experiência de navegação do usuário está simples, objetiva e fluida*

## Dúvidas?
> caua.rezende@taniabulhoes.com.br <br>
> Company Presentation: https://tbi.taniabulhoes.com.br/ <br>
> Ecommerce: https://www.taniabulhoes.com.br/ <br>

### Desde já agradecemos seu interesse em fazer parte do time TB e boa sorte! ;)
