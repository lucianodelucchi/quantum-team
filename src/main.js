import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		quantumApi: 'https://cors-anywhere.herokuapp.com/http://random.openqu.org/api/rand?size=4'
		/*http://random.openqu.org/api/rand?size=4 will return something like
		{
			"result": [
				0.49009711073946605, 
				0.006116551581331657, 
				0.050656291202329166, 
				0.908841977573196
			]
		}
		*/
	}
});

export default app;