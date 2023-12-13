import { int, varchar, datetime, mysqlTable, uniqueIndex, serial } from 'drizzle-orm/mysql-core';

export const Rooms = mysqlTable('Room', {
  id: serial("id").primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  created: datetime('created'),
}, (Room) => ({
  nameIndex: uniqueIndex('name_idx').on(Room.name),
}));
export type Room = typeof Rooms.$inferSelect;
export type NewRoom = typeof Rooms.$inferInsert;

export const Sessions = mysqlTable('Session', {
  id: serial("id").primaryKey(),
  roomId: int('roomId').notNull(),
});
export type Session = typeof Sessions.$inferSelect;
export type NewSession = typeof Sessions.$inferInsert;