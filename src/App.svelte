<script>
	import { onMount } from 'svelte'
	import Widget from './Widget.svelte'
	import captures from './captures'

	let current = 0
	let capturesCount = captures.length - 1
	let show = false

	$: capture = captures[current]

	onMount(runNotifications)

	function runNotifications() {
		// Sleep (ZZzzz)
		setTimeout(() => {
			show = true

			setTimeout(() => {
				show = false
				current = current < capturesCount ? current + 1 : 0
				runNotifications()
			}, 5000)
		}, 3000)
	}
</script>

{#if show}
<Widget capture="{capture}"/>
{/if}

<style>
:global(*) {
	-webkit-box-sizing: border-box;
	   -moz-box-sizing: border-box;
			box-sizing: border-box;
}

:global(*:before),
:global(*:after) {
	-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
			box-sizing: border-box;
}
</style>