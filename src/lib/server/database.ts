import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { eq } from 'drizzle-orm';
import { Rooms, Sessions } from "../../db/schema";
import type { Room, NewRoom, Session, NewSession } from "../../db/schema";

const connection = connect({ host: process.env["DATABASE_HOST"], username: process.env["DATABASE_USERNAME"], password: process.env["DATABASE_PASSWORD"] });
const db = drizzle(connection);
// await db.delete(Rooms);
// await db.delete(Sessions);

export async function enterRoom(name: string, password: string): Promise<Room | undefined> {

	// Create room if it doesn't already exist
	if (! await doesRoomExist(name)) {
		const hashedPassword = Bun.password.hashSync(password);
		try {
			const newRoom: NewRoom = { name: name, password: hashedPassword, id: undefined, created: undefined };
			await db.insert(Rooms).values(newRoom);
		} catch (error) {
			console.error('Error during database operations:', error);
			return undefined;
		}
	}

	// Get room by name, authenticate via password, and return room
	const room = await getRoomByName(name);
	if (room) {
		if (Bun.password.verifySync(password, room.password)){
			return room;
		}
		console.log('invalid password');
	}
	return undefined;
}

export async function getRoomByName(name: string): Promise<Room | undefined> {
	// console.log('getRoomByName - name: ' + name);
	const rooms = await db.select().from(Rooms).where(eq(Rooms.name, name));
	if (rooms.length === 1) {
		return rooms[0];
	}
	return undefined;
}

async function doesRoomExist(name: string): Promise<boolean> {
	// console.log('doesRoomExist- name: ' + name);
	const room = await getRoomByName(name);
	if (room) {
		return true;
	}
	return false;
}

export async function getRoomById(roomId: number): Promise<Room | undefined> {
	// console.log('getRoomById - roomId: ' + roomId);
	const rooms = await db.select().from(Rooms).where(eq(Rooms.id, roomId));
	if (rooms.length === 1) {
		return rooms[0];
	}
	return undefined;
}

export async function createSession(roomId: number): Promise<number | undefined> {
	// console.log('createSession - roomId: ' + roomId);
	try {
		const newSession: NewSession = { roomId: roomId };
		const newSessionId = (await db.insert(Sessions).values(newSession)).insertId;
		return Number(newSessionId);
	} catch (error) {
		console.error('Error during database operations:', error);
		return undefined;
	}
}

export async function getRoomBySessionId(sessionId: number): Promise<Room | undefined> {
	// console.log('getRoomBySessionId - sessionId: ' + sessionId);
	const sessions = await db.select().from(Sessions).where(eq(Sessions.id, sessionId));
	console.log("sessions", sessions);
	if (sessions.length === 1) {
		const room = await getRoomById(sessions[0].roomId);
		console.log('room', room);
		if (room) {
			return room;
		}
	}
	return undefined;
}