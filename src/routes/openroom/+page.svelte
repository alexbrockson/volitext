<script lang="ts">
	import type { PageData, ActionData } from "./$types";
	export let data: PageData;
	export let form: ActionData;
</script>

<section>
	<form method="POST">
		{#if form?.incorrect}<p class="error">invalid password</p>{/if}
		<label>
			room:
			<input name="room" type="text" required />
		</label>
		<label>
			password:
			<input name="password" type="password" required />
		</label>
		<button id="btnGo" class="vBtn">go</button>
	</form>
</section>
