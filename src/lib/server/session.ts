import type { Room } from "$lib/room";

type Session = {
    id: string,
    roomName: string,
    created: Date
}

// In a real app, this data would live in a database, rather than in memory. But for now, we cheat.
const db = new Map();

export function saveSession(roomName: string): string {
    const newSession = { id: crypto.randomUUID(), roomName: roomName, created: Date.now };

    db.set(newSession.id, [{
        session: newSession
    }]);

    return newSession.id;
}

export function getRoomName(sessionId: string): string {
    if (!checkSession(sessionId)) {
        return "";
    }
    else {
        const session = db.get(sessionId) as Session;
        return session.roomName;
    }
}

export function destroySession(sessionId: string): boolean {
    if (!checkSession(sessionId)) {
        return false;
    }
    db.delete(sessionId);
    return true;
}

function checkSession(sessionId: string): boolean {
    const sesh = db.has(sessionId);
    if (sesh) {
        return true;
    }
    return false;
}