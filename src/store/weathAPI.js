import axios from "axios"

export default {
    state: {
        /*
            Следующие параметры хочу получать: 
                    погода.основная(описание)
                    main.temp_min(мин и макс темпа)
                    main.temp_max
                    main.pressure(Давление)
                    main.humidity(влажность)
                    icon(значок погоды)
        */
       WeatherNow: {
            description: '',
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            humidity: 0,
            icon: ""
       }
    },
    mutations: {
        setWeather: (state, item) => {
            state.WeatherNow.description = item.weather[0].description;
            state.WeatherNow.temp_min = Math.round(item.main.temp_min - 273);
            state.WeatherNow.temp_max = Math.round(item.main.temp_max - 273);
            state.WeatherNow.pressure = item.main.pressure;
            state.WeatherNow.humidity = item.main.humidity;
            state.WeatherNow.icon = item.weather[0].icon;
        }
    },
    actions: {
        /*
            q=Chelyabinsk
            и после через запятую указываем регион(в данном случае ru)
            как будет выглядеть запрос на поиск данных на текущий денёк в Челябинске(апи ключ уже добавлен, он в конце ID=)
            
            Chelyabinsk,ru&APPID=5948fd9227ade17558f52fd9554e0cb9

            запрос также можно делать без добавления кода страны:

            Chelyabinsk&APPID=5948fd9227ade17558f52fd9554e0cb9

            APPID=5948fd9227ade17558f52fd9554e0cb9 - key

            {"cod":"404","message":"Internal error"} - так возращается ошибка

            "api.openweathermap.org/data/2.5/weather?q="+NameTown+region+"&APPID="+key
            */
        loadWeather: async(ctx, RegionAndTown) => {
                let key = "5948fd9227ade17558f52fd9554e0cb9";            
                let response;
                //RegionAndTown - может прийти либо как строка, либо как объект, в зависимости от того что выбрал пользователь(нажал enter при вводе или кликнул по варианту из выпадающего списка)
                if(typeof RegionAndTown != 'string') {
                    try {
                        response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${RegionAndTown.name},${RegionAndTown.address.country_code}&APPID=${key}`);
                    } catch(err) {
                        response = err.response;
                        return response.status
                    }
                } else {
                    try {
                        response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${RegionAndTown}&APPID=${key}`);
                    } catch(err) {
                        response = err.response;
                        return response.status
                    }
                }
                if(response.status == 200) {
                    ctx.commit('setWeather', response.data);
                    return response.status;
                } else {
                    return response.message;
                }            
        }
    },
    getters: {
        getWeather: state => state.WeatherNow,
    }
}