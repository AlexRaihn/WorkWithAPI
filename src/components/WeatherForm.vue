<template>
    <div class="main">  
            <div class="town-form">
                    <input placeholder="введите название города" @keyup.enter="LoadWeather(inputTown)" v-model="inputTown">
                <div class="towns-container" v-show="inputTown.length > 0">
                    <div v-for="(town, index) in getTowns" @click="LoadWeatherForClick(index)" class="tags-in-input">
                        {{ town.name}} - {{ town.address.country }}
                    </div>
                </div>
            </div>
        

        <b-row>
            <b-col xl="4" lg="4" md="4" sm="4"></b-col> 
            <b-col xl="4" lg="4" md="4" sm="4">
                <div class="card-weather">
                    <div v-if="errorStatus == '200'">
                        <img :src="`https://openweathermap.org/img/wn/${getWeather.icon}@2x.png`">
                        <p>Погода: {{ getWeather.description }} </p>
                        <p>{{ getWeather.temp_min + '&deg' }} - {{ getWeather.temp_max + '&deg' }}</p>
                        <p>Давление:  {{ getWeather.pressure }}</p>
                        <p>Влажность:  {{ getWeather.humidity }}</p>
                    </div>
                    <div v-if="errorStatus.length == 0" class="eror_message">
                        <p>Введите ваш запрос</p>
                    </div>
                    <div v-if="(errorStatus != 200) && (errorStatus)" class="eror_message">
                        <p>Ошибка: {{ errorStatus }}</p>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "WeatherForm",
    data () {
        return {
            inputTown: "",
            errorStatus: ""
        }
    },
    methods: {
        ...mapActions([
        'loadWeather', 
        'loadTowns'
        ]),

        //загрузка данных по погоде через нажатие ентер
        LoadWeather: async function() {
            this.errorStatus = await this.loadWeather(this.inputTown);
            this.inputTown = "";
        },
        //загрузка данных по погоде через клик по варианту в форме
        LoadWeatherForClick: async function(i) {
            console.log(this.getTowns[i]);
            this.errorStatus = await this.loadWeather(this.getTowns[i]);
            this.inputTown = "";
        },
        //подгрузка городов по мере ввода данных
        TownsSearch: async function() {
            await this.loadTowns(this.inputTown);
        }
    },
    computed: {
        ...mapGetters(['getWeather', 'getTowns'])
    },
    watch: {
        async inputTown() {
            await this.TownsSearch()
        }
    }
}
</script>

<style scoped>
.row {
    padding: 0;
    margin: 0;
}
.main {
    padding-top: 75px;
}
.card-weather{
    margin-top: 20px;
    background-color: rgb(255,255,255);
    border: 1px solid black;
    box-shadow: 10px 5px 5px black;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
.error_text{
    color: red;
    font-style:italic;
}
.tag_style3{
    font-size: 120%;
    font-family: 'Roboto', sans-serif;
    color:black;
    padding-left: 5px;
}
.tag_style3:hover{
    text-decoration: underline;
}
.icon_tag3{
    font-size: 100%;
}
.icon_tag3:hover{
    cursor: pointer;
}
.towns-container{
    border-left: 1px solid #a8a8a8;
    border-right: 1px solid #a8a8a8;
    border-bottom: 1px solid #a8a8a8;
    border-top: 1px solid #f0f0f0;
    position: absolute;
    top: 1.85em;
    background-color: #fff;
    width: 100%;
}
.tags-in-input:hover{
    background-color: gray;
    cursor: pointer;
}
.marger{
    margin-top: 20px;
    min-height: 50px;
}
.town-form{
    width: 20%;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    z-index: 0;
}
.eror_message{
    min-height: 200px;
    min-width: 200px;
    text-align: center;
    font-size: 110%;
}
.eror_message p{
    padding-top: 5%;
}
</style>