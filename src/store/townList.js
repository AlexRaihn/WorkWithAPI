
import axios from "axios"

export default {
    state: {
        Towns: [
        ]
    },
    mutations: {
        setTown: (state, item) => {
            state.Towns = item;
        }
    },
    actions: {
        loadTowns: async(ctx, EnteredValue) => {
            let response;
            try{
                response = await axios.get(`https://nominatim.openstreetmap.org/?addressdetails=1&q=${ EnteredValue }&format=json&limit=2`);

                if(response.status == 200) {
                    ctx.commit('setTown', response.data)
                } else {
                    console.log("Ошибка, получения данных!");
                }
            } catch(err) {
                console.log(err.message);
            }
        }
    },
    getters: {
        getTowns: state => state.Towns
    }
}