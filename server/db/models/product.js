const Sequelize = require('sequelize');
const db = require('../db');

// OB/AZ: consider more validations (e.g. unique title), NOT URGENT
const Product = db.define('product', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    price: {
        // OB/AZ: to avoid floating point woes, consider 1) DECIMAL which is kind of for this; 2) INTEGER and measure in cents
        type: Sequelize.FLOAT,
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