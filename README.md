# Car Shop

Projeto **back-end** aplicando os princípios de **Programação Orientada a Objetos** (POO) para a construção de uma API com CRUD para gerenciar uma concessionária de veículos, utilizando o banco de dados **MongoDB** através do framework do **Mongoose**.

![Demonstração](/carshopdemo.png "CarShop")

## Tecnologias

<div style="display: inline">
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">

<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">

<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">
</div>

## Execução

Aplicação utiliza o docker-compose que precisa estar na versão 1.29 ou superior.

`` docker-compose up -d ``

A partir daqui você pode rodar o container car_shop via CLI:

`` docker exec -it car_shop bash ``

Instale as dependências:

`` npm install ``

Execute o servidor express:

`` npm run dev ``

<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto no qual você pode customizar e reutilizar todas as vezes que for executar o trybe-publisher.

Para deixá-lo com a sua cara, basta alterar o seguinte arquivo da sua máquina: ~/.student-repo-publisher/custom/_NEW_README.md

É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->
