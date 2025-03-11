import { Sequelize } from "sequelize";

const db = new Sequelize('db_notes', 'root', 'bebas', {
    host: '34.69.221.185', //klo udah deploy pake ip server database
    dialect: 'mysql'
})

export default db
