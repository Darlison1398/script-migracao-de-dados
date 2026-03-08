const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Gt/1098",
  database: "bancoantigo",
  port: 5432
});

async function getSites(limit, offset) {
  const query = `
    SELECT id, name, url
    FROM sites
    ORDER BY id
    LIMIT $1 OFFSET $2
  `;

  const result = await pool.query(query, [limit, offset]);
  return result.rows;
}

module.exports = {
  getSites
};