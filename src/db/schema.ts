import { integer, pgTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const Rooms = pgTable('Room', {
  id: serial("id").primaryKey(),
  name: text('name'),
  password: text('password'),
  created: timestamp('created'),
}, (Room) => ({
  nameIndex: uniqueIndex('name_idx').on(Room.name),
}));
export type Room = typeof Rooms.$inferSelect;
export type NewRoom = typeof Rooms.$inferInsert;

export const Sessions = pgTable('Session', {
  id: serial("id").primaryKey(),
  roomId: integer('roomId').references(() => Rooms.id)
});
export type Session = typeof Sessions.$inferSelect;
export type NewSession = typeof Sessions.$inferInsert;