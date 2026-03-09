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




# Migration Project

## Requirements

- Docker
- Docker Compose

## Run the project

```bash
docker compose up --build

- entrar no container do banco legayDb e execultar esse comando para criar a tabela:
### docker exec -it migration-project-legacy-db-1 psql -U postgres -d postgres

CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    url VARCHAR(255)
);

- após isso, ainda dentro do container, rodar esse comando para criar 5000 registros de dados:
INSERT INTO sites (name, url)
SELECT
    'Site ' || generate_series,
    'site' || generate_series || '.com'
FROM generate_series(1,5000);

- entrar no container do banco newDb1 e executar esse comando para criar a tabela de sites:
### docker exec -it migration-project-new-db-1 psql -U postgres -d postgres
CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    url VARCHAR(255) UNIQUE,
    status VARCHAR(50),
    created_at TIMESTAMP
);
- Aqui, não precisa inserir dados, pois ele vai receber dados do outro banco

- depois rodar o comando
### docker compose up

-- tem o comando para "Matar" os containers
### docker compose down