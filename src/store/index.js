import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import weathAPI from './weathAPI'
import cryptoAPI from './cryptoAPI'
import townList from './townList'

export default new Vuex.Store({
modules: {
    weathAPI,
    cryptoAPI,
    townList
}
});