# BossaBox API

Esta é uma API para gerenciar ferramentas com seus respectivos links, descrições e tags. Foi-se utilizado o conceito de api REST com Node + Express + PostgreSQL. O frameword Jest foi utilizado para a realização dos testes na API.

## Para executar a aplicação, siga os passos abaixo

- Instale o Node e o gerenciador de pacotes yarn na sua máquina;
- No diretório raiz, instale as depedências do projeto (checar scripts abaixo);
- Configure o Docker [a link](https://docs.docker.com/install/linux/docker-ce/ubuntu/);
- Crie o container responsável pelo banco de dados:

```bash
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

- Rode o projeto (checar scripts abaixo).

## Scripts

No diretório raiz do projeto, instale as depedências do projeto;

```bash
yarn install
```

Rodar o projeto em development mode

```bash
yarn dev
```

Rodar os testes da API

```bash
yarn tes
```
