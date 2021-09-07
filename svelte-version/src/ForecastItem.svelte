<script>
    export let data
    let weekNames=[
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
"Sunday"]

let date = weekNames[new Date(data.date).getDay()]
</script>

<button class="forecast-day flex-col">
    <span>{date}</span>
    <img src={data.day.condition.icon} alt="">
    <span>{data.day.avgtemp_c}</span>
</button>


<style>
    .forecast-day{
        padding: 1rem;
        border: none;
        background-color: #303F9F;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #EEE;
    }
    .forecast-day:hover{
        background-color: rgba(1, 6, 10, 0.13);
    }
    img{
        width: 4rem;
        filter: drop-shadow(3px 3px 10px #333);
  -webkit-filter: drop-shadow(3px 3px 10px #333);
    }
</style>