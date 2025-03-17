import { mysqlTable, serial, varchar, int, boolean, DatetimeFsp, MySqlTimestamp, timestamp } from 'drizzle-orm/mysql-core';

// Define your schema
export const tag = mysqlTable('tag', {
    id: varchar('name', {length: 20}).primaryKey(),
    name: varchar('name', {length: 255}).notNull(),
    description: varchar('description', {length: 255}).notNull(),
//    createdAt:timestamp().defaultNow(),
    //  updatedAt: timestamp().defaultNow(),
})