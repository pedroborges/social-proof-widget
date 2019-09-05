import Widget from './Widget.svelte';

const target = document.createElement('div')
document.body.appendChild(target)

new Widget({
    target,
    props: {
        api: API_URL,
    },
})