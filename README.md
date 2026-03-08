# Site Migration Script

## Descrição
Script responsável por migrar registros de sites do banco legado para o novo banco de dados.

## Melhorias implementadas

- processamento em batch
- paralelismo controlado
- retry automático em falhas
- logs estruturados
- controle de memória
- dockerização do projeto

## Como executar

npm install
node src/migrate.js

## Executar com Docker

docker build -t migration-script .
docker run migration-script