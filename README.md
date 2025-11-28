# Simples Escolha

## Description (from wiki)

Uma Api para pequenas eleições e auditoria

projeto para a disiciplina Topicos Especiais

## Deploy


## Quick Start

```bash
# Clone the repository
git 
```

```bash
# Go to the project directory
cd 
```

```bash
# Install dependencies
npm install
```


## Details


## Checklist

- [x] **RA1 - Projetar e desenvolver uma API funcional utilizando o framework NestJS.**

  - [x] **ID1:** Configurar corretamente o ambiente de desenvolvimento e criar a API utilizando NestJS, com rotas e controladores que seguem a arquitetura modular.
  - [x] **ID2:**~~ Aplicar boas práticas de organização da lógica de negócios, garantindo que os services contenham a lógica de negócio e sejam chamados pelos controladores, separando responsabilidades corretamente.~~ A lógica de negócio foi isolada em um repositório separado para ser reutilizada em outros projetos, mas a API ainda segue boas práticas de organização.
  - [x] **ID3:** Utilizar providers e configurar adequadamente a injeção de dependência no NestJS, garantindo uma arquitetura modular e escalável.
  - [x] **ID4:** Demonstrar habilidade de criar e manipular rotas HTTP, manipulando parâmetros de rota, query e body, lidando corretamente com requisições e respostas.
  - [x] **ID5:** Aplicar boas práticas de tratamento de erros, utilizando filtros globais e personalizando as mensagens de erro para garantir respostas claras e consistentes.
  - [x] **ID6:** Criar classes DTO (Data Transfer Objects) para garantir a validação e consistência dos dados em diferentes endpoints, utilizando pipes para validar entradas de dados.
  - [x] **ID7:** Aplicar corretamente pipes de validação no NestJS, verificando entradas inválidas e assegurando a integridade dos dados transmitidos.

- [x] **RA2 - Implementar persistência de dados com um banco de dados relacional utilizando Prisma ou TypeORM.**

  - [x] **ID8:** Modelar corretamente os dados da aplicação, definindo entidades, suas relações e campos necessários, refletidos em um Diagrama de Entidade-Relacionamento (ERD).
  - [x] **ID9:** Configurar e conectar a API a um banco de dados relacional (PostgreSQL, MySQL, etc.) utilizando Prisma ou TypeORM.
  - [x] **ID11:** Implementar corretamente as operações CRUD (Create, Read, Update, Delete) para pelo menos uma entidade no projeto, utilizando NestJS.

- [] **RA3 - Realizar testes automatizados para garantir a qualidade da API.**

  - [] **ID12:** Implementar testes automatizados (unitários ou de integração) utilizando Jest, validando funcionalidades críticas da API.
  - [] **ID13:** Garantir a cobertura de testes para, pelo menos, as principais rotas e serviços da API, incluindo operações CRUD.

- [] **RA4 - Gerar a documentação da API e realizar o deploy em um ambiente de produção.**

  - [x] **ID14:** Integrar corretamente o Swagger à API, gerando a documentação completa e interativa dos endpoints, parâmetros e respostas da API, com eemplos de requisições e respostas.
  - [] **ID15:** Realizar o deploy da API em uma plataforma de hospedagem na nuvem (e.: Render.com, Heroku, Vercel, etc.), garantindo que a API esteja acessível publicamente.
  - [x] **ID16:** Garantir que a API funcione corretamente no ambiente de produção, incluindo a documentação Swagger e o banco de dados.
  - [x] **ID17:** Realizar a configuração correta de variáveis de ambiente usando o ConfigModule do NestJS.
  - [] **ID18:** Implementar corretamente o versionamento de APIs REST no NestJS, assegurando que diferentes versões da API possam coeistir.

- [x] **RA5 - Implementar autenticação, autorização e segurança em APIs utilizando JWT, Guards, Middleware e Interceptadores.**
  - [x] **ID19:** Configurar a autenticação na API utilizando JWT (JSON Web Tokens).
  - [x] **ID20:** Implementar controle de acesso baseado em roles e níveis de permissão, utilizando Guards para verificar permissões em rotas específicas.
  - [x] **ID21:** Configurar e utilizar middleware para manipular requisições antes que elas cheguem aos controladores, realizando tarefas como autenticação, logging ou tratamento de CORS.
  - [x] **ID22:** Implementar interceptadores para realizar logging ou modificar as respostas antes de enviá-las ao cliente.
#
