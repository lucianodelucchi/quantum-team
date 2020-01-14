<script>
  import { onMount } from "svelte";
  import { fly } from 'svelte/transition';

  import jQuery from "jquery";

  export let quantumApi;

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  async function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
	  let seed = await getSeed();
      // Pick a remaining element...
      randomIndex = Math.floor(seed * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  let seed = {};

  function getSeed() {
    return jQuery
      .getJSON(quantumApi + "?callback=?")
      .then(data => data.result[0])
      .catch(e => {
        console.warn("error while calling the API, fall back to Math.random()");
        return Math.random();
      });
  }

  let player1 = "Fredy";
  let player2 = "Javi";
  let player3 = "Luciano";
  let player4 = "Stefano";

  let team1 = [];
  let team2 = [];

  $: canBuildTeams = player1 !== "" && player2 !== "" && player3 !== "" && player4 !== "";

  async function handleClick(event) {
	team1 = []
	team2 = []

    const players = [player1, player2, player3, player4];
	const shuffledPlayers = await shuffle(players);
	
	team1 = shuffledPlayers.slice(0, 2);
	team2 = shuffledPlayers.slice(2, 4);
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>The Quantum* Team builder</h1>
  <input type="text" bind:value={player1} />
  <input type="text" bind:value={player2} />
  <input type="text" bind:value={player3} />
  <input type="text" bind:value={player4} />
  <button on:click={handleClick} disabled={!canBuildTeams}>Build teams</button>
  
  {#if team1.some(()=>true) && team2.some(()=>true)}
	<div transition:fly="{{ y: 200, duration: 2000 }}">
		<p>Team 1: {team1}</p>
		<p>Team 2: {team2}</p>
	</div>	
  {/if}

  <h4>{quantumApi}</h4>
  <small>*It may use JS Math.random() when API is not available 🤷‍♂️</small>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</main>
