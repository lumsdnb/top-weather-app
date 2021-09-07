<script>
	const API_KEY=''
	import ForecastItem from './ForecastItem.svelte';
	import { fly, fade } from 'svelte/transition';

	import * as importedJSON from './testresult.json'
	let cityInput;
	// 	const cityInput = document.getElementById('city-input');
	// cityInput.addEventListener('keyup', (e) => {
	//   city = cityInput.value;
	//   if (e.key === 'Enter') {
	//     getWeatherForecast();
	//   }
	// });

	//just for testing
	// let fetchResult=importedJSON
	let fetchResult=''
		let country

	async function getWeatherForecast() {
	  const ENDPOINT = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityInput}&days=7&aqi=no&alerts=no`;
	  try {
		let result = await fetch(ENDPOINT)
		  .then((response) => response.json())
		  .then((data) => {
			fetchResult = data;
			fetchResult.location.country=='United States of America'?country='USA':fetchResult.location.country
		  });
	  } catch (err) {
		  alert('location not found');
		  fetchResult=''
	  }
	}

	const resetFetchResults=()=>{
		fetchResult=''
	}
	</script>

<main class="flex-col">
	{#if !fetchResult}

	<div class="form-ish" transition:fade>
		<input id="city-input" bind:value={cityInput} type="text" placeholder="enter city" />
			<button on:click={getWeatherForecast}>get forecast</button>
	</div>
	<!-- <button onclick="getWeatherForecast('darmstadt')">
		get weather forecast
    </button> -->
	{:else}
	<div class="top-card" transition:fade>
		<div class="flex-row">
			<span class="city-name">{`${fetchResult.location.name}, ${country}`}</span>
			 <button class="hamburger-icon" on:click={resetFetchResults}>|||</button>
		</div>
		<div class="flex-col center-flex">
			<img id="weather-icon" src={fetchResult.current.condition.icon} alt="weather icon" />
				<span id="weather-condition">{fetchResult.current.condition.text}</span>
		</div>
			<div class="flex-row today-details">
			<span id="temp-today">{fetchResult.current.temp_c}</span>
			<div class="flex-col">
				<span>💧<span id="humidity-today">{fetchResult.current.humidity}</span></span>
				<span>🌬️<span id="wind-today">{fetchResult.current.wind_kph}</span></span>
			</div>
			</div>
	</div>
	<div class="flex-row forecast-list" transition:fade>
		{#each fetchResult.forecast.forecastday as forecast }
			<ForecastItem data={forecast}/>
		{/each}
	</div>

	{/if}
</main>

<style>
body {
	display: grid;
	place-items: center;
	font-size: 1.2rem;
	background-color: #3F51B5;
	margin: 0;
	padding: 0;
	max-width: 10rem;
}

main{
	margin: 0;
}

.form-ish{
	display: grid;
	place-items: center;
}

#temp-today {
  font-size: 3.5rem;
}

.flex-col {
  display: flex;
  flex-direction: column;
}
.flex-row {
  display: flex;
  flex-direction: row;
}

.center-flex {
  align-items: center;
  justify-content: center;
}

#weather-icon {
  width: 10rem;
  height: 10rem;
  padding: 2rem 2rem 0 2rem;
  filter: drop-shadow(3px 3px 9px #333);
  -webkit-filter: drop-shadow(3px 3px 9px #333);
}

.today-details{
	width: 100%;
	justify-content: space-around;
	font-size: 1.5rem;
	max-width: 20rem;
}

.top-card{
	height: 70vh;
	display: grid;
	place-items: center;
}
span {
	padding: .5rem;
	filter: drop-shadow(1px 1px 1px #333);
	-webkit-filter: drop-shadow(1px 1px 1px #333);
}

.forecast-list{
	height: 30vh;
	max-width: 100vw;
	overflow-x: scroll;
	scrollbar-width: none;
	margin: 0;
	width: 100%;
}
button{
	border-radius: 2rem;
	}
	.hamburger-icon{
		background-color: transparent;
		border: none;
		color: #EEE;
		transform: rotate(90deg) scale(1.2) scaleY(0.7);
	}
</style>