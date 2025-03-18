import { mysqlTable, serial, varchar, int, boolean, DatetimeFsp, MySqlTimestamp, timestamp } from 'drizzle-orm/mysql-core';

// Define your schema
export const gallery = mysqlTable('gallery', {
    id:  varchar('id', { length: 36 }).primaryKey(),
    name: varchar('name', {length: 40}).notNull(),
    description: varchar('description', {length: 40}).notNull(),
    code: varchar('code', {length: 40}),
//    createdAt:timestamp().defaultNow(),
    //  updatedAt: timestamp().defaultNow(),
})