const { migrateSitesnovos } = require("./services/migrationAntigaService");

async function main() {
  try {
    console.log("Iniciando processo de migração...");
    await migrateSitesnovos();
    console.log("Migração concluída com sucesso.");
  } catch (error) {
    console.error("Erro durante a migração:", error);
  }
}

main();