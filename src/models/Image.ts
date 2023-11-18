"use strict";

const {DataTypes, Model, sequelize} = require('../db');
import { Gallery } from "./Gallery";
import { GalleryTag } from "./GalleryTag";
class Image extends Model {}

Image.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    key: {
        type: DataTypes.STRING,
    },
    GalleryId: {
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
//Image.belongsTo(Gallery)
Image.Gallery = Image.hasOne(Gallery,  {sourceKey: "GalleryId", as: "gallery", foreignKey: 'id', onUpdate: 'cascade'})
Image.GalleryTag = Image.belongsToMany(GalleryTag, { through: Gallery, throughAssociations: {
    // 1️⃣ The name of the association going from the source model (Person)
    // to the through model (LikedToot)
    fromSource: Image,
    
    // 2️⃣ The name of the association going from the through model (LikedToot) 
    // to the source model (Person)
    toSource: GalleryTag,
    
    // 3️⃣ The name of the association going from the target model (Toot)
    // to the through model (LikedToot)
    fromTarget: 'id',

    // 4️⃣ The name of the association going from the through model (LikedToot)
    // to the target model (Toot)
    toTarget: 'gallery_id',
  },} ); 
export {Image}
