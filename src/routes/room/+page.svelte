<!-- room/+page.svelte -->
<script lang="ts">
    import type { Room } from "../../db/schema";

    // This should match the structure of the object returned by load function
    export let data: { room: Room };
</script>

<!-- Display the room name -->
<section>
    {#if data && data.room}
        <h1>welcome to {data.room.name}</h1>
    {:else}
        <h1>error - room not found</h1>
    {/if}
</section>
