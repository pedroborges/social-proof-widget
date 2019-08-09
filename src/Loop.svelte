<script>
	import { onDestroy, onMount } from 'svelte'

	export let
		items = [],
		rewind = true,
		displayTime = 8,
		startDelay = 6,
		timeBetween = 4
	
	let current = 0
	let display = false
	let timeout = null

	$: total = items.length - 1

	onMount(start)
	onDestroy(stop)

	function next() {
		timeout = setTimeout(toggle, timeBetween * 1000)
	}

	function shouldStop() {
		! rewind && current === 0 && stop()
	}

	function start() {
		timeout = setTimeout(toggle, startDelay * 1000)
	}

	function stop() {
		if (timeout) {
			display = false
			clearTimeout(timeout)
			timeout = null
		}
	}

	function toggle() {
		display = true

		timeout = setTimeout(() => {
			display = false
			current = current < total ? current + 1 : 0
			next()
			shouldStop()
		}, displayTime * 1000)
	}
</script>

{#if display}
	<slot item="{items[current]}" current="{current}" />
{/if}