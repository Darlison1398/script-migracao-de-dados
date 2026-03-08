const { migrateSites } = require("./services/migrationService");
//const { migrateSitesnovos }= require ("./services/migrationService");

async function main() {
  try {
    console.log("Iniciando processo de migração...");
    await migrateSites();
    console.log("Migração concluída com sucesso.");
  } catch (error) {
    console.error("Erro durante a migração:", error);
  }
}

main();