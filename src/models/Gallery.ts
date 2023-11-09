"use strict";

const {DataTypes, Model, sequelize} = require('../db');

class Gallery extends Model {}

Gallery.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    code: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    modelName: 'Gallery', sequelize: sequelize, tableName:"gallery"
});

export {Gallery}
