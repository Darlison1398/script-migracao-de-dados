const legacyDb = require("../db/legacyDb");
const newDb = require("../db/newDb");
const retry = require("../utils/retry");
const logger = require("../utils/logger");

const BATCH_SIZE = 1000;
const CONCURRENCY = 10;

async function migrateSites() {
  const sites = await legacyDb.getSites();

  logger.info(`Total de registros encontrados: ${sites.length}`);

  for (let i = 0; i < sites.length; i += BATCH_SIZE) {
    const batch = sites.slice(i, i + BATCH_SIZE);

    await processBatch(batch);

    logger.info(`Processados ${i + batch.length} registros`);
  }
}

async function processBatch(batch) {
  const queue = [...batch];

  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const site = queue.pop();

      await retry(() =>
        newDb.insertSite({
          name: site.name,
          url: site.url,
          status: "migrated",
          created_at: new Date()
        })
      );
    }
  });

  await Promise.all(workers);
}

module.exports = {
  migrateSites
};