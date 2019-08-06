<script>
	import { fly } from 'svelte/transition'
	import { formatDistanceToNow } from 'date-fns'

	export let capture = {}

	const hasLocation = capture.region || capture.city
	const region = capture.region && !isNaN(capture.region) ? capture.region : capture.country
	const location = `${capture.city}${region && `, ${region}`}`
	const timeAgo = formatDistanceToNow(new Date(capture.timestamp), {
		includeSeconds: false,
		addSuffix: true,
	})
</script>

<div class="wrapper" transition:fly="{{ y: 40, duration: 500 }}">
	<div class="inner-wrapper">
		<div class="widget">
			<div class="icon"></div>
			<div class="content">
				<div class="subject">
					{ capture.firstName || 'Someone' }
					{#if hasLocation }
					<span>from {location}</span>
					{/if}
				</div>
				<div class="action">signed up for Social Proof</div>
				<time class="time" datetime="{capture.timestamp}">{timeAgo.replace('about ', '')}</time>
			</div>
		</div>
	</div>
</div>

<style>
.wrapper {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
	z-index: 1000000;
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
	font-style: normal;
	font-weight: 400;
	line-height: 1.5;
	letter-spacing: normal;
	text-rendering: optimizeLegibility;
	font-feature-settings: "kern" 1,"dlig" 1,"opbd" 1,"ss01" 1;
}

.inner-wrapper {
	overflow: hidden;
	padding-top: 5px;
}

.widget { /* lENR2qKhV4Ug2qKh5bC1_0 */
	align-items: center;
	display: grid;
	grid-template-columns: 56px 1fr;
	grid-gap: 16px;
	position: relative;
	box-sizing: border-box;
	border-top: 1px solid rgba(216, 217, 226, 0.5);
	box-shadow: 10px 20px 40px 0 rgba(36, 35, 40, 0.1);
	padding: 16px;
	height: 88px;
	pointer-events: auto;
	overflow: hidden;
	background-color: #fff;
	line-height: 1em;
}

@media screen and (min-width: 480px) {
	.widget {
		width: 352px;
		margin: 0 0 10px 10px;
		border-radius: 50px;
		border: 1px solid rgba(216, 217, 226, 0.5);
	}
}

.icon {
	border-radius: 50%;
	width: 56px;
	height: 56px;
	background: #90cdf4;
	box-shadow: rgba(0, 149, 247, 0.4);
}

.subject {
	display: inline-block;
	line-height: 1.2;
	font-size: 14px;
	font-weight: 500;
	color: #2c5282;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow-x: hidden;
	max-width: 220px;
	vertical-align: middle;
}

.subject span {
	color: #718096;
}

.action {
	margin-top: 4px;
	line-height: 1.2;
	font-size: 14px;
	font-weight: 300;
	color: #718096;
	max-height: 1.2em;
	overflow: hidden;
}

.time {
	display: inline-block;
	margin-right: 4px;
	line-height: 11px;
	font-size: 11px;
	font-weight: 300;
	color: #a0aec0;
}
</style>