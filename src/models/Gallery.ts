"use strict";

const {DataTypes, Model, sequelize} = require('../db');
import { Image } from ".";
import { GalleryTag } from "./GalleryTag";
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
//GalleryTag.Tag = Tag.hasMany(GalleryTag,  {sourceKey: "id", as: "gallery_tag",  foreignKey: 'tag_id', onUpdate: 'cascade'})
Gallery.GalleryTag = GalleryTag.hasMany(Gallery,  {sourceKey: "gallery_id", as: "gallery_tag",  foreignKey: 'id', onUpdate: 'cascade'})


export {Gallery}
