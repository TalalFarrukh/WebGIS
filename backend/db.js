const { Client } = require('pg')
require("dotenv").config()

const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  port: process.env.PG_PORT,
}

const proConfig = 'postgres://bbdmahbnyjecsj:869c863bf7eb796c8a653a5b47a5ecf6fa4777a833f247816f5fc75ad2895da6@ec2-3-223-169-166.compute-1.amazonaws.com:5432/ds7kr27i20hnu'

const client = new Client(
    process.env.NODE_ENV === "production" ? proConfig : devConfig
)
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected to Database!");
});

module.exports = client; 