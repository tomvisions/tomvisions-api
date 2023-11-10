"use strict";

import { GalleryTag } from "./GalleryTag";

const {DataTypes, Model, sequelize} = require('../db');

class Tag extends Model {}

Tag.init({
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
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    modelName: 'Tag', sequelize: sequelize, tableName:"tag"
});

export {Tag}
