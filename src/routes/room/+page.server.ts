import { getRoomName } from '$lib/server/session';
import { getRoom } from '$lib/server/database';
import type { Room } from '$lib/room.js';

export async function load({ url }) {
    const query = url.searchParams;
    const sessionId = query.get('sid');

    if (sessionId !== undefined && sessionId!.length > 0) {
        const name = getRoomName(sessionId as string);
        const room = getRoom(name) as Room;

        if (room !== undefined) {
            console.log(`room name: ${room.name} | created: ${room.created}`);

            return {
                room: {
                    name: room.name,
                    created: room.created,
                },
            };
        }
        else {
            // error
        }
    }



}
