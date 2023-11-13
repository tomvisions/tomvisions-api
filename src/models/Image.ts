"use strict";

const {DataTypes, Model, sequelize} = require('../db');
import { Gallery } from "./Gallery";
class Image extends Model {}

Image.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    key: {
        type: DataTypes.STRING,
    },
    gallery_id: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    primaryImage: {
        type: DataTypes.STRING.BINARY,
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

Image.Gallery = Gallery.hasOne(Image,  {sourceKey: "id", as: "image", foreignKey: 'id', onUpdate: 'cascade'})

export {Image}
