/**
 * Created by home on 2017/6/2.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        now_path:'skjc',
        isoline_hour:'24',
        tuceng:[]
    },
    mutations:{
        change_now_path (state,path) {
            state.now_path = path.text;
        },
        change_isoline_hour (state,hour) {
            state.isoline_hour = hour.text;
        },
        CHANGE_TUCENG (state,tuceng){
            state.tuceng = tuceng.text;
        }
    }
})