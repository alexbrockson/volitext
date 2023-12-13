import { getRoomByName, getRoomBySessionId } from '$lib/server/database';
import type { Room, Session } from '../../db/schema.js';

export async function load({ url }) {
    const query = url.searchParams;
    const sessionId = query.get('sid');

    if (sessionId !== undefined && sessionId!.length > 0) {
        const room = await getRoomBySessionId(Number(sessionId));
        if (room) {
            // console.log(`room name: ${room.name} | created: ${room.created}`);
            return {
                room: {
                    name: room.name,
                    created: room.created,
                },
            };
        }
        else {
            console.error('something went wrong');
        }
    }
}