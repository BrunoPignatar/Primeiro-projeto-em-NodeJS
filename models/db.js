const Sequelize = require('sequelize')


    // Conexão com o Banco de Dados MySql
    const sequelize = new Sequelize('postapp', 'root', 'Brunopig13', {
        host: "localhost",
        dialect: 'mysql'
    })

    module.exports = {
        Sequelize: Sequelize,
        sequelize: sequelize
    }