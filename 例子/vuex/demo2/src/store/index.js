import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters' 
import * as actions from './actions' 
import * as mutations from './mutations' 
Vue.use(Vuex)
const state = {
  count: 0
}
/* 跟下面等效
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
*/
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
export default store