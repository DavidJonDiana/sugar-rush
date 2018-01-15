const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://www.fillmurray.com/200/300',
        validate: {
            isUrl: true
        }
    },
    inventoryQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Product;
