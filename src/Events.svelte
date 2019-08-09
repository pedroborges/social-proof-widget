<script>
	import { onMount } from 'svelte'

	export let url = null

	let events = []

	onMount(() => {
		fetch(url)
			.then(res => res.json())
			.then(({ data }) => events = data)
	})
</script>

{#if events.length}
	<slot events={events} />
{/if}