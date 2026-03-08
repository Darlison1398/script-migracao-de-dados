const legacyDb = require("../db/legacyDb");
const newDb = require("../db/newDb");
const retry = require("../utils/retry");
const logger = require("../utils/logger");

async function migrateSitesnovos() {
  const sites = await legacyDb.getSites();

  logger.info(`Total de registros encontrados: ${sites.length}`);

  for (const site of sites) {
    try {
      await retry(() =>
        newDb.insertSite({
          name: site.name,
          url: site.url,
          status: "migrated",
          created_at: new Date()
        })
      );

      logger.info(`Migrado: ${site.url}`);
    } catch (error) {
      logger.error(`Erro ao migrar ${site.url}: ${error.message}`);
    }
  }

  logger.info("Migração finalizada");
}

module.exports = {
  migrateSitesnovos
};