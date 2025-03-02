import { Sequelize } from "sequelize";

const db = new Sequelize('db_notes', 'root', '', {
    host: 'localhost', //klo udah deploy pake ip server database
    dialect: 'mysql'
})

export default db