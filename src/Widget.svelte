<script>
	import { onMount } from 'svelte'
	import Events from './Events.svelte'
	import Loop from './Loop.svelte'
	import Notification from './Notification.svelte'

	export let api

	let site = {}
	$: settings = site.settings

	onMount(() => {
		fetch(api)
			.then(res => res.json())
			.then(({ data }) => site = data)
	})

	const isMobile = () => window.screen.width < 480

	const isVisible = () => isMobile()
		? settings.mobile.isVisible
		: settings.desktop.isVisible
		
	const isTop = () => isMobile()
		? settings.mobile.position.includes('top')
		: settings.desktop.position.includes('top')	
		
	const isRight = () => isMobile()
		? true
		: settings.desktop.position.includes('right')
</script>

{#if settings && isVisible()}
	<Events url="{site.events}" let:events>
		<Loop
			items="{events}"
			rewind="{settings.loop}"
			startDelay="{settings.startDelay}"
			timeBetween="{settings.timeBetween}"
			displayTime="{settings.displayTime}"
			let:item="{event}"
			let:current
		>
			{#if event}
				<Notification
					image="{event.image_url}"
					message="{event.message}"
					timestamp="{event.created_at}"
					url="{event.url}"
					mobile="{isMobile()}"
					right="{isRight()}"
					top="{isTop()}"
					shadow="{settings.shadow}"
				/>
			{/if}
		</Loop>
	</Events>
{/if}