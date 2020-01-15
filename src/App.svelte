<script>
  import { slide } from "svelte/transition";

  import jQuery from "jquery";

  export let quantumApi;

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  async function shuffle(array = []) {
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

  function getSeed() {
    return jQuery
      .getJSON(quantumApi + "?callback=?")
      .then(data => {
        console.log("Got quantum seed: ", data);
        return data.result[0];
      })
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

  $: teamsCompleted = team1.some(() => true) && team2.some(() => true);

  let history = [];

  async function handleClick(event) {
    const players = [player1, player2, player3, player4];
    const shuffledPlayers = await shuffle(players);

    team1 = shuffledPlayers.slice(0, 2);
    team2 = shuffledPlayers.slice(2, 4);
    history = [{ team1, team2 }, ...history];
  }

  function reset() {
    team1 = [];
    team2 = [];
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

  div.teams {
    align-items: center;
    display: flex;
    font-size: xx-large;
    justify-content: space-evenly;
    min-height: 10rem;
  }

  section.history div.entry {
    align-items: center;
    display: flex;
    justify-content: space-evenly;
    padding: 0 30rem;
  }

  section.history div.entry div.left {
    text-align: right;
  }

  section.history div.entry div.vs {
    margin: 0 2rem;
  }
  section.history div.entry div.right {
    text-align: left;
  }

  section.history div.entry div.left,
  section.history div.entry div.right {
    width: 10rem;
  }
</style>

<main>
  <h1 on:click={reset}>The Quantum RNG<span title="It may use JS Math.random() when API is not available 🤷‍♂️">*</span> Team builder</h1>
  {#if !teamsCompleted}
    <div transition:slide>
      <input type="text" bind:value={player1} />
      <input type="text" bind:value={player2} />
      <input type="text" bind:value={player3} />
      <input type="text" bind:value={player4} />
      <button on:click={handleClick} disabled={!canBuildTeams}>
        Build teams
      </button>
    </div>
  {/if}

  {#if teamsCompleted}
    <div class="teams" transition:slide>
      <span>🎾🙆‍♂️🎾🙆‍♂️ {team1}</span>
      <span>🆚</span>
      <span>{team2} 🎾🙆‍♂️🎾🙆‍♂️</span>
    </div>
  {/if}
  <section class="history">
    <h3>History</h3>
    {#each history as { team1, team2 }}
      <div class="entry">
        <div class="left">{team1}</div>
        <div class="vs">🆚</div>
        <div class="right">{team2}</div>
      </div>
    {/each}
  </section>
  <p>
    <a href="http://random.openqu.org/">Quantum RNG API@ETH Zürich</a>
  </p>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
  <p>
    CI/CD by
    <a href="https://zeit.co/">Zeit now</a>
  </p>
</main>
