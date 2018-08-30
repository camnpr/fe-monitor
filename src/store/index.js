/*
 * @Author: camnpr 
 * @Date: 2018-08-29 17:16:05 
 * @Last Modified by: camnpr
 * @Last Modified time: 2018-08-29 17:19:10
 */

import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app, 			//app:app,
    user,
    permission
  },
  getters: getters
});

export default store