<script lang="ts">
	// export let isOpen = false;

	function go() {
		alert("you clicked the button");
	}
</script>

<div>
	<!-- <label for="txtRoomName">Enter a room name:</label>
	<input id="txtRoomName" class="textbox"  /> -->


	<form method="POST">
		<label>
			Room name:
			<input name="room" type="text">
		</label>
		<label>
			Password:
			<input name="password" type="password">
		</label>
		<button id="btnGo" on:click={go}>Go</button>
	</form>
</div>
<!-- {#if isOpen}
<div class="modal">
    This is a modal
    <button on:click={closeModal} class="button">Close Modal</button>
</div>
{/if} -->

<!-- <button on:click={() => (count -= 1)} aria-label="Decrease the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5" />
		</svg>
	</button>

	<div class="counter-viewport">
		<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
			<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
			<strong>{Math.floor($displayed_count)}</strong>
		</div>
	</div>

	<button on:click={() => (count += 1)} aria-label="Increase the counter by one">
		<svg aria-hidden="true" viewBox="0 0 1 1">
			<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" />
		</svg>
	</button> -->
