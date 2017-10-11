/* eslint-disable import/first,import/newline-after-import */
// import IE Promise polyfill
import 'babel-polyfill';
import 'es6-promise/auto';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import vue-router
import router from './router';
// import vue-inject
import injector from 'vue-inject';
// import vuex store
import store from './store/index';
// import vuex-router-sync. see: https://github.com/vuejs/vuex-router-sync
import { sync } from 'vuex-router-sync';

// import customized Bulma Design Framework
// Docs: http://bulma.io/documentation/overview/start/
require('./styles/custom-bulma.sass');

Vue.config.productionTip = false;

// Tell Vue about vue-inject
Vue.use(injector);
require('./services/services');

// Sync store and router
sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
});
