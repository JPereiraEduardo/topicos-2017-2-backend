const Sequelize = require('sequelize');

const config = {
    dialect: 'sqlite',
    storage: './banco.sqlite',
    define: {
        freezeTableName: true, //Desativa o  plural
        timestamps: false, // Desativa a criação de colunas automaticas
    }
};

const sequelize = new Sequelize(null, null, null, config);

const Todo = sequelize.define('todo', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    title: Sequelize.STRING(50),
    description: Sequelize.STRING(300),
    completed: Sequelize.BOOLEAN,
    creation_date: Sequelize.DATE,

});

module.exports = {
    sequelize,
    Todo,
}