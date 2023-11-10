"use strict";

import { Gallery } from "./Gallery";
import { Tag } from "./Tag";
const {DataTypes, Model, sequelize} = require('../db');

class GalleryTag extends Model {}

GalleryTag.init({
    tag_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    gallery_id: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    }
}, {
    modelName: 'GalleryTag', sequelize: sequelize, tableName:"gallery_tag"
});

//GalleryTag.hasOne(Tag, {
  //  foreignKey:  {
    //    name: 'tag_id'
  //  }
//});

GalleryTag.Tag = Tag.hasMany(GalleryTag,  {sourceKey: "id", as: "gallery_tag",  foreignKey: 'tag_id', onUpdate: 'cascade'})
///Tag.GalleryTag = Tag.hasMany(GalleryTag,  {sourceKey: "id", as: "gallery_tag",  foreignKey: 'tag_id', onUpdate: 'cascade'})

//User.TeamUser = User.hasMany(TeamUser, {as: 'teams', foreignKey: 'UserId', onUpdate: 'cascade'});
//User.Access = User.hasOne(Access, {sourceKey: "AccessId", as: 'access', foreignKey: 'slug', onUpdate: 'cascade'});


//Tag.belongsTo(GalleryTag);
/*Tag.hasOne(GalleryTag, {
    foreignKey:  {
        name: 'tag_id'
    }
});
GalleryTag.belongsTo(Tag);
*/
export {GalleryTag}
