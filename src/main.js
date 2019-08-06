import App from './App.svelte';

const target = document.createElement('div')
document.body.appendChild(target)

new App({ target })