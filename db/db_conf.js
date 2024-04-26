const { Sequelize } = require("sequelize");
require('dotenv').config({ path: './config/.env' });

/** *-*-*-* DATABASE CONFIGURATION *-*-*-* **/
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    }
);
/** *-*-*-* END DATABASE CONFIGURATION *-*-*-* **/

/** *-*-*-* DATABASE CONNECTION *-*-*-* **/
db.authenticate().then(() => {
    console.log("Database connection has been established successfully.");
}).catch((err) => {
    console.error("Unable to connect to the database:", err);
})
/** *-*-*-* END DATABASE CONNECTION *-*-*-* **/

module.exports = db;