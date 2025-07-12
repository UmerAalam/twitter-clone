// db.js
import postgres from "postgres";

const sql = postgres({
  port: 5432,
  host: "localhost",
  user: "postgres",
  password: "password",
  database: "tweets",
}); // will use psql environment variables

export default sql;
