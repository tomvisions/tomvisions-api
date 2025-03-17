import { mysqlTable, serial, varchar, int, boolean, DatetimeFsp, MySqlTimestamp, timestamp } from 'drizzle-orm/mysql-core';



// Define your schema
export const galleryTag = mysqlTable('gallery_tag', {
    GalleryId:  varchar('GalleryId', { length: 40 }).notNull(),
    TagId: varchar('TagId', {length: 40}).notNull(),
//    createdAt:timestamp().defaultNow(),
    //  updatedAt: timestamp().defaultNow(),
})