"use strict";

const {DataTypes, Model, sequelize} = require('../db');

class Image extends Model {}

Image.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    key: {
        type: DataTypes.STRING,
    },
    gallery: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    primaryImage: {
        type: DataTypes.boolean,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    modelName: 'Image', sequelize: sequelize, tableName:"image"
});

export {Image}
