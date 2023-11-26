import axios from "axios";

export default {
    state: {
        cript: [],
        loadError: "",
    },
    mutations: {
        setCript:(state, item) => {
            state.cript = item;

            const len = state.cript.length;
            for(let i = 0; i < len; i++) {
                state.cript[i].price = +(state.cript[i].price);
            }
            
            if (len > 0) {
                let maxPrice = state.cript[0].price;
                for (let i=1; i<len; i++) {
                    if (state.cript[i].price > maxPrice) {
                        maxPrice = state.cript[i].price;
                    }
                }

                for(let i = 0; i < len; i++) {
                    state.cript[i].progress = state.cript[i].price * 100 / maxPrice;
                }
            }
        },
        setLoadError: (state, val) => {
            state.loadError = val;
        },
    },
    actions: {
        //ключ к API - coinrankingaa7a93b8bd73440cea679f7be7ae8743fe5b97d258b66a39
        loadCrypto: async(ctx) => {
            let response;
            try {
                response = await axios.get("https://api.coinranking.com/v2/coins?orderBy=price&limit=10", {
                    headers: {
                        "x-access-token":"coinrankingaa7a93b8bd73440cea679f7be7ae8743fe5b97d258b66a39"
                    }
                });
                if ((response.status == 200) && (response.data.data.coins)) {
                    ctx.commit('setCript', response.data.data.coins);
                    ctx.commit('setLoadError', "")
                } else {
                    console.log(response);
                    ctx.commit('setLoadError', "Status is " + response.status);
                }
            } catch(err) {
                console.log(err);
                ctx.commit('setLoadError', err.message);
            }
        },
    },
    getters: {
        getCript: state => state.cript,
        // на будущее чтобы выводить не только в консоль
        isError: state => state.loadError && state.loadError != "",
        loadErrorMsg: state => state.loadError
    }
}