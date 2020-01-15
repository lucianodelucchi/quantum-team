import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		quantumApi: 'https://cors-anywhere.herokuapp.com/http://random.openqu.org/api/rand'
	}
});

export default app;