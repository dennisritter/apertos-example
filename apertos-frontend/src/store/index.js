/**
 * @author Dennis Ritter
 * @description The Main vuex store.
 */

import Vue from 'vue';
import Vuex from 'vuex';
// Import store modules
import datasets from './modules/datasets/store';
import datasetDetails from './modules/dataset-details/store';
import distributionDetails from './modules/distribution-details/store';
import datastoreVisualisation from './modules/data-visualisation/datastore-visualisation/store';

Vue.use(Vuex);


const state = {};

const actions = {};

const mutations = {};

const getters = {
  /**
   * @description Returns the current route (name).
   * @param state
   */
  getCurrentRoute: state => state.route,
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    datasets,
    datasetDetails,
    distributionDetails,
    datastoreVisualisation,
  },
});

