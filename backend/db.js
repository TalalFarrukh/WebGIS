const { Client } = require('pg')
require("dotenv").config()

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  port: process.env.PG_PORT,
}

const proConfig = process.env.DATABASE_URL

const client = new Client(
    process.env.NODE_ENV === "production" ? proConfig : devConfig
)
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Database!");
});

module.exports = client; 