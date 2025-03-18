"use strict";

import {int, mysqlTable, tinyint, varchar} from "drizzle-orm/mysql-core";

//import { Gallery } from "./Gallery";
//import { GalleryTag } from "./GalleryTag";
import { s3Mapper } from "../mapper";

export const imageWedding = mysqlTable('image', {
    id:  varchar('id', { length: 36 }).primaryKey(),
    key: varchar('key', {length: 255}).notNull(),
    GalleryId: varchar('GalleryId', {length: 255}).notNull(),
    name: varchar('name', {length: 255}).notNull(),
    orientation: int('orientation'),
//    createdAt:timestamp().defaultNow(),
    //  updatedAt: timestamp().defaultNow(),
})


/*
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

 */

