<template>
    <div class="main">            
        <div class="header_cont">       
            <div class="header" @click="SortValue(col = false)">
                <span :class="styleForName">Названию</span> 
            </div>
            <div class="header" @click="SortValue(col = true)">
                <span :class="styleForPrice">Стоимости</span>
            </div>
        </div> 
        
        <b-row v-for="(infoCript, index) in SortBy" :key="infoCript.id" class="cript_cont" v-b-modal.modal-graph @click="InfoCurrence(index)">
            <b-col xl="3" md="3">
                <img class="icon_cript" :src="infoCript.iconUrl" alt="не найдено"/>
                {{ infoCript.name }}
            </b-col>
            <b-col xl="4" md="4" class="prog_cont">
                <div class="progress_cript" :style="'width:'+infoCript.progress+'%;'"></div>
            </b-col>
            <b-col xl="2" md="2">
                {{ infoCript.price.toFixed(2) }}$
            </b-col>
        </b-row>
        <!--модалка с графиком изменения цен за 24 часа-->
        <b-modal id="modal-graph" size="xl">
            <p class="modal_header">График за 24 часа: {{ aboutCoin.name }}</p>
            <div>
                <Graph :sparkline="this.aboutCoin.sparkline" :timeIntervalerval="timeInterval" class="graph"/>
            </div>
        </b-modal>
    </div>
</template>

<script>
//хачу сделать вкладочки где выбираешь тебе нужен интервал в час или именно в каждые 5 минут
import { mapActions, mapGetters } from 'vuex';
import Graph from './Graph.vue';

export default {
    name: "cryptoAPI",
    data () {
        return {
            sortedColumn: false,
            styleForName: "sort_header ",
            styleForPrice: "sort_header ",
            aboutCoin: {},
            timeInterval: []
        }
    },
    methods: {
        ...mapActions(['loadCrypto']),
        //сортировка
        SortValue: function(col) {
            this.sortedColumn = col;
        },
        InfoCurrence: function(id) {
            this.aboutCoin =  this.getCript[id];
            //получаю текущее время
            const timeNow = new Date();
            //храню час текущий
            const hour = timeNow.getHours();
            //я хочу передавать вместе с минутами данные
            let min = timeNow.getMinutes();
            if(min < 10) {
                min = '0'+min;
            }
            for(let i = 0; i<24; i++) {
                //никакие махинации не требуются
                if(i==0) {
                    this.timeInterval[i] = hour+':'+min;
                } else {
                    //в противном случае значения часа будут отрицательными, а мне это не нужно
                    if((hour-i) < 0) {
                        this.timeInterval[i] = 23-(hour-i)*-1+':'+min;
                    } else {
                        this.timeInterval[i] = hour-i+':'+min
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters(['getCript']),
        
        SortBy: function() {
            let SortArray = [];
            Object.assign(SortArray, this.getCript);
            if(this.sortedColumn == false) {
                this.styleForName += " focus_header ";
                this.styleForPrice = "sort_header ";
                return SortArray.sort((a,b) => { return a.name > b.name ? 1 : -1;})
            } else {
                this.styleForPrice += " focus_header ";
                this.styleForName = "sort_header "; 
                return SortArray;
            }
        },
    },
    components: {
        Graph
    },
    async mounted() {
        await this.loadCrypto();
    },
}
</script>

<style scoped>
.main {
    padding-top: 75px;
    text-align: left;
}
.row {
    padding: 0;
    margin: 0;
}
.icon_cript{
    width: 25px;
    height: 25px;
}
.cript_cont{
    display: flex;
    justify-content: center;
    margin-top: 5px;
}
.sort_header{
    color: black;
    font-size: 120%;
}
.sort_header:hover{
    cursor: pointer;
    text-decoration: underline;
}
.focus_header {
    text-decoration: underline;
}
.progress_cript{
    background-color: rgb(80, 41, 80);
    height: 4px;
    margin-top: 7px;
    border-radius: 2px;
    border: 1px solid rgb(80, 41, 80);
}
.prog_cont{
    display: flex;
    justify-content: left;
}
.header {
    margin: 5px;
    padding: 5px;
}
.header_cont{
    display: flex;
    justify-content: center;
}
.graph{
    min-height: 300px;
}
</style>