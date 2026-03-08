const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Gt/1098",
  database: "banconovo",
  port: 5432
});

async function findByUrl(url) {
  const result = await pool.query(
    "SELECT id FROM sites WHERE url = $1",
    [url]
  );

  return result.rows[0];
}

async function insertSite(site) {
  await pool.query(
    `
    INSERT INTO sites (name, url, status, created_at)
    VALUES ($1, $2, $3, $4)
    `,
    [site.name, site.url, site.status, site.created_at]
  );
}

module.exports = {
  findByUrl,
  insertSite
};