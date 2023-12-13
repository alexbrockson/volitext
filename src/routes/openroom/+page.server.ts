import type { Actions } from './$types';
import { enterRoom, createSession } from '$lib/server/database';
import { redirect } from '@sveltejs/kit';
import type { Room } from '../../db/schema';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const roomName = data.get('room');
        const password = data.get('password');
        if (roomName && password) {
            const room = await enterRoom(roomName as string, password as string) as Room;
            const sessionId = await createSession(room.id);
            throw redirect(303, './room?sid=' + sessionId);
        }
        return { success: true };
    }
} satisfies Actions;