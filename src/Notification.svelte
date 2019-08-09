<script>
	import { fly } from 'svelte/transition'
	import timeago from './utils/timeago'

	export let
		message = null,
		mobile = false,
		right = true,
		shadow = true,
		timestamp = null,
		top = true,
		visible = true
	
	let transition = { y: top ? -40 : 40, duration: 500 }
</script>

<div
	class="base box {top ? 'top' : 'bottom'} {right ? 'right' : 'left'}"
	transition:fly="{transition}"
>
	<div class="overflow-hidden padding">
		<div
			class="notification"
			class:border-bottom="{mobile && top}"
			class:border-top="{mobile && !top}"
			class:shadow="{shadow}"
		>
			<div class="icon"></div>
			<div class="content">
				{#if message}
				<span class="message">{@html message}</span>
				{/if}

				{#if timestamp}
				<span class="time">{timeago(timestamp)}</span>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
.box,
.box * {
	box-sizing: border-box;
}

.box:after,
.box:before,
.box *:after,
.box *:before {
	box-sizing: border-box;
}

.base {
	font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
	font-style: normal;
	font-weight: 400;
	line-height: 1.5;
	letter-spacing: normal;
	text-rendering: optimizeLegibility;
	pointer-events: none;
	position: fixed;
	left: 0;
	right: 0;
	z-index: 1000000;
}

.bottom { bottom: 0; }
.top { top: 0; }

.bottom .padding { padding-top: 30px; }
.top .padding { padding-bottom: 30px; }

.overflow-hidden {
	overflow: hidden;
}

.notification {
	align-items: center;
	display: grid;
	grid-template-columns: 56px 1fr;
	grid-gap: 16px;
	position: relative;
	padding: 16px;
	height: 88px;
	pointer-events: auto;
	overflow: hidden;
	background-color: #fff;
	line-height: 1em;
}

.border-bottom { border-bottom: 1px solid rgba(215, 215, 225, 0.5); }
.border-top { border-top: 1px solid rgba(215, 215, 225, 0.5); }
.shadow { box-shadow: 0 0 30px 0 rgba(40, 35, 40, 0.1); }

@media screen and (min-width: 480px) {
	.notification {
		width: 380px;
		border-radius: 50px;
		border: none;
	}

	.top .notification { margin-top: 16px; }
	.right .notification { margin-right: 16px; margin-left: auto; }
	.bottom .notification { margin-bottom: 16px; }
	.left .notification { margin-left: 16px; }
}

.icon {
	border-radius: 50%;
	width: 56px;
	height: 56px;
	background: #90cdf4;
	box-shadow: rgba(0, 149, 247, 0.4);
}

.message {
	color: #718096;
	display: block;
	font-size: 14px;
	font-weight: 400;
	max-height: 2.6em;
	line-height: 1.3em;
	overflow: hidden;
	position: relative;
}

.message::after {
	background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);
	content: '';
	height: 1.3em;
	width: 40%;
	text-align: right;
	position: absolute;
	bottom: 0;
	right: 0;
}

.message :global(strong) {
	color: #2c5282;
	font-weight: 600;
}

.time {
	display: block;
	margin: 2px 4px 0 0;
	line-height: 12px;
	font-size: 12px;
	font-weight: 300;
	color: #a0aec0;
}
</style>