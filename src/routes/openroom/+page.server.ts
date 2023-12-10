import type { Actions } from './$types';
import { enterRoom } from '$lib/server/database';
import { saveSession } from '$lib/server/session';
import type { Room } from '$lib/room';
import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
        const roomName = data.get('room');
		const password = data.get('password');
        if (roomName && password){
            console.log(`room: ${roomName} | pw: ${password}`);
            console.log(Date.now);
            const room = enterRoom(roomName as string, password as string) as Room;
            console.log(Date.now);
            const sessionId = saveSession(room.id)
            redirect(303, 'room?sid=' + sessionId);
        }
		return { success: true };
	}
} satisfies Actions;



// export const load: PageServerLoad = async ({ cookies }) => {
// 	const user = await db.getUserFromSession(cookies.get('sessionid'));
// 	return { user };
// };