import type { Room } from "$lib/room";

// In a real app, this data would live in a database, rather than in memory. But for now, we cheat.
const db = new Map();

export function enterRoom(name: string, password: string): Room | undefined {
	const hashedPassword = Bun.password.hashSync(password);

	// Create room if it doesn't already exist
	if (!doesRoomExist(name)) {
		const newRoom = { id: crypto.randomUUID(), name: name, password: hashedPassword, created: Date.now };
		console.log('newRoom', newRoom);
		db.set(newRoom.name, [{
			room: newRoom
		}]);
	}

	// Get, authenticate, and return room
	const room = db.get(name) as Room;
	console.log('gotRoom', room);
	if (room && Bun.password.verifySync(password, room.password)) {
		return room;
	}
	return undefined;
}

export function getRoom(name: string): Room | undefined {
	if (doesRoomExist(name)) {
		const room = db.get(name) as Room;
		return room;
	}
	return undefined;
}

export function destroyRoom(name: string): boolean {
	if (!doesRoomExist(name)) {
		return false;
	}
	db.delete(name);
	return true;
}

function doesRoomExist(name: string): boolean {
	const room = db.has(name);
	if (room) {
		return true;
	}
	return false;
}

// async function hashPassword(password: string): Promise<string> {
// 	return await Bun.password.hash(password);
// }