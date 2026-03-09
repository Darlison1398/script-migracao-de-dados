# Script de migração de dados

## Descrição
Script criado para migrar registros de sites do banco legado para o novo banco de dados.

## Cenário 1:
A primeira versão do script realizava a migração de forma sequencial, processando um registro por vez. Isso cria um gargalo, pois cada operação precisa esperar a anterior terminar.
 -- veja o video do teste:
 https://drive.google.com/file/d/1CJxbQyiUaOaVtQYkFhPWwZXPUEeEDple/view?usp=sharing

## Cenário 2:
Para melhorar a performance implementei processamento em batch e concorrência controlada, permitindo que múltiplas inserções sejam executadas simultaneamente. POrtanto, essas foram as novas melhorias implementadas no script refatorado:
- processamento em batch
- paralelismo controlado
- retry automático em  caso de falhas
- logs estruturados
- controle de memória

-- veja o video do teste:
https://drive.google.com/file/d/15lnIg3vMzCfHFLothbuhSmyBeOhMsju6/view?usp=sharing

# Para executar a aplicação, siga esses passos

## Requirements
- Docker
- Docker Compose

## 1° -  Run the project
dentro da pasta da aplicação, abra o terminal e roda o comando. Ele vai criar os containers, inclusive os dois bancos:
- docker compose up --build

## 2° - após isso, abra outro terminal e siga esses passos:
- entrar no container do banco legayDb:
### docker exec -it migration-project-legacy-db-1 psql -U postgres -d postgres

- execultar esse comando para criar a tabela:
CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    url VARCHAR(255)
);

- ainda dentro do container, rodar esse comando para criar 5000 registros de dados:
INSERT INTO sites (name, url)
SELECT
    'Site ' || generate_series,
    'site' || generate_series || '.com'
FROM generate_series(1,5000);

## 3° - Após isso abra outro terminal e faça o seguinte:
- entrar no container do banco newDb1 e executar esse comando para criar a tabela de sites:
### docker exec -it migration-project-new-db-1 psql -U postgres -d postgres

CREATE TABLE sites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    url VARCHAR(255) UNIQUE,
    status VARCHAR(50),
    created_at TIMESTAMP
);
- Aqui, não precisa inserir dados, pois ele vai receber dados do outro banco a partir da migração.

## 4° - Depois, retorne na aplicação e execulta esse comando no terminal
### docker compose up

esse último comando vai executar a aplicação e a migração será feita. Se caso você quiser testar versão anterior e comparar a diferença na execução em cada uma, basta abrir o projeto da branch "developer" e seguir os mesmos passos que esse.

### Vale ressaltar que nesse exemplo eu usei apenas 5000 registros e já dá pra perceber a diferença quando testado nos 2 scripts, pois no primeiro caso ele demora cerca de 4 a 5 segundos para fazer a migração. Mas no segundo caso, usando o script já refatorado, ele não demora nem 1 segundo. Isso ocorre porque o processo é execultado em lotes e não sequencial.
