import { mysqlTable, serial, varchar, int, boolean, DatetimeFsp, MySqlTimestamp, timestamp, tinyint } from 'drizzle-orm/mysql-core';

// Define your schema
export const image = mysqlTable('image', {
    id:  varchar('id', { length: 36 }).primaryKey(),
    key: varchar('key', {length: 255}).notNull(),
    GalleryId: varchar('GalleryId', {length: 255}).notNull(),
    name: varchar('name', {length: 255}).notNull(),
    primaryImage: tinyint('primaryImage'),
    description: varchar('description', {length: 255}),
    active: int('active'),
    orientation: int('orientation'),
//    createdAt:timestamp().defaultNow(),
    //  updatedAt: timestamp().defaultNow(),
})

