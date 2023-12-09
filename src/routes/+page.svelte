<script>
	// import Counter from './components/Counter.svelte';
	// import OpenRoom from "./OpenRoom.svelte";

    let isModalOpen = false;

    function openModal() {
        isModalOpen = true;
    }
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Welcome to your new SvelteKit app try editing <strong>src/routes/+page.svelte</strong>.
	</h1>
	<a href='/openroom' class="button">Open Room</a>
	<!-- <MyModal isOpen={isModalOpen} /> -->
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>