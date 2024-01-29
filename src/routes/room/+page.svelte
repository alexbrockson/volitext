<script lang="ts">
    import type { Room } from "../../db/schema";
    import type { Writable } from "svelte/store";
    export let data: { room: Room };
</script>

<section>
    {#if data && data.room}
        <h1>welcome to {data.room.name}</h1>
        <textarea class="textarea" />
    {:else}
        <h1>error - room not found</h1>
    {/if}
</section>
