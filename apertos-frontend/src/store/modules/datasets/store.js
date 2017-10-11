/* eslint-disable no-param-reassign */
/**
 * @author Dennis Ritter
 * @description Vuex store for the datasets module
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Module Constants
/**
 * @description The Default amount of Datasets per page.
 * @type {number}
 */
const RESULTS_PER_PAGE = 10;

// Datasets Module State
const state = {
  /**
   * @property datasets
   * @type Array
   * @description An array of datasets.
   * @example datasets = [{
   *  categories: [{ id: 'energy', title: 'energy' }, ..],
   *  description: 'This is dataset1',
   *  distributions: [{}],
   *  distributionFormats: ['csv', 'pdf'],
   *  id: 'abc123qwe345',
   *  idName: 'dataset-1',
   *  language: 'EN',
   *  licence: 'ABC Licence',
   *  modificationDate: '2002-02-02T00:00',
   *  publisher: 'Publisher1',
   *  releaseDate: '2001-01-01T00:00',
   *  tags: ['tag1', 'tag2'],
   *  title: 'dataset1',
   * }, {...}, ]
   */
  datasets: [],
  searchParameters: {
    // Text entered in the search input field
    query: '',
    limit: RESULTS_PER_PAGE,
    offset: 0,
    // The Facets to filter for
    facets: [],
  },
  /**
   * @property availableFacets
   * @type JSON
   * @description The set union of all available facets for the .
   * @example availableFacets = [
   *  {
   *    items: [{
   *      count: 42,
   *      title: 'facet1',
   *      idName: 'facet-1',
   *    }, {..}],
   *    title: 'tags',
   *  }, {..}]
   */
  availableFacets: [],
  page: 1,
  // The total number of datasets available with last request
  datasetsCount: 0,
  // The Service that implemented server requests for Datasets
  service: null,
};

const getters = {
  getDatasets: state => state.datasets,
  getDatasetsCount: state => state.datasetsCount,
  getQuery: state => state.searchParameters.query,
  getLimit: state => state.searchParameters.limit,
  getOffset: state => state.searchParameters.offset,
  getFacets: state => state.searchParameters.facets,
  getAvailableFacets: state => state.availableFacets,
  getPage: state => state.page,
  getService: state => state.service,
};

const actions = {
  /**
   * @description Load all datasets matching the given parameters.
   * @param commit
   * @param state
   * @param options {Object} - Given search parameters
   * @param options.query {String} - The given query string
   * @param options.facets {Array} - The active facets
   * @param options.limit {Number} - The maximum amount of datasets to fetch
   * @param options.offset {Number} - The number of datasets to skip
   * @param options.append {Boolean} - Decides whether current datasets in state will be replaced or fetched datasets appended.
   */
  loadDatasets(
    { commit, state },
    {
      query = getters.getQuery(state),
      facets = getters.getFacets(state),
      limit = RESULTS_PER_PAGE,
      offset = (getters.getPage(state) - 1) * limit,
      append = false,
    },
    ) {
    return new Promise((resolve, reject) => {
      commit('SET_OFFSET', offset);
      const service = getters.getService(state);
      service.get(query, facets, limit, offset)
      .then((response) => {
        commit('SET_AVAILABLE_FACETS', response.availableFacets);
        commit('SET_DATASETS_COUNT', response.datasetsCount);
        if (append) commit('ADD_DATASETS', response.datasets);
        else commit('SET_DATASETS', response.datasets);
        resolve();
      })
      .catch((error) => {
// eslint-disable-next-line no-console
        console.error(error);
        reject(error);
      });
    });
  },
  /**
   * @description Loads more datasets.
   * @param commit
   * @param state
   * @param {number} amount - The amount of datasets to add.
   */
// eslint-disable-next-line no-unused-vars
  loadAdditionalDatasets({ commit, state }, amount = RESULTS_PER_PAGE) {
    const offset = getters.getOffset(state) + amount;
    commit('SET_OFFSET', offset);
    const datasetsCount = getters.getDatasetsCount(state);
    // If there are no more Datasets to load, cancel.
    if (offset < datasetsCount) {
      actions.loadDatasets({ commit, state }, { offset, append: true });
    }
  },
  /**
   * @description Handles page changes by through URL query.
   * @param commit
   * @param state
   * @param page {String} The given page number as a String
   */
  setPage({ commit, state }, page) {
    commit('SET_PAGE', page);
  },
  /**
   * @description Replace the current state facets by the given facets
   * @param commit
   * @param facets {Array} - The given facets
   */
  setFacets({ commit }, facets) {
    if (facets) commit('SET_FACETS', facets);
  },
  /**
   * @description Add the given facet to the states facets.
   * @param commit
   * @param params {Object} - The wrapped action parameters.
   * @param params.field {String} - The field of the given facet
   * @param params.facet {String} - The facet to add
   */
  addFacet({ commit }, { field, facet }) {
    commit('ADD_FACET', { field, facet });
  },
  /**
   * @description Remove the given facet from the states facets.
   * @param commit
   * @param params {Object} - The wrapped action parameters.
   * @param params.field {String} - The field of the given facet
   * @param params.facet {String} - The facet to remove
   */
  removeFacet({ commit }, { field, facet }) {
    commit('REMOVE_FACET', { field, facet });
  },
  /**
   * @description Replace the current state query by the given query
   * @param commit
   * @param query {String} - The given query
   */
  setQuery({ commit }, query) {
    commit('SET_QUERY', query);
  },
  /**
   * @description Increases the limit that is stored in the state
   * @param commit
   * @param state
   * @param amount {Number} - The amount to add to the current state limit
   */
  incLimit({ commit, state }, amount = RESULTS_PER_PAGE) {
    const limit = getters.getLimit(state) + amount;
    commit('SET_LIMIT', limit);
  },
  /**
   * @description Sets the Service to use when loading data.
   * @param commit
   * @param service - The service to use.
   */
  useService({ commit }, service) {
    commit('SET_SERVICE', service);
  },
};

const mutations = {
  SET_DATASETS(state, data) {
    state.datasets = data;
  },
  ADD_DATASETS(state, data) {
    state.datasets = state.datasets.concat(data);
  },
  SET_LIMIT(state, limit) {
    state.searchParameters.limit = limit;
  },
  SET_OFFSET(state, offset) {
    state.searchParameters.offset = offset;
  },
  SET_FACETS(state, facets) {
    state.searchParameters.facets = facets;
  },
  ADD_FACET(state, { field, facet }) {
    // If the facetField is not defined in state..
    if (!Object.prototype.hasOwnProperty.call(state.searchParameters.facets, field)) {
      // ..define it by assigning an array containing {value} in it
      state.searchParameters.facets[field] = [facet];
    } else {
      state.searchParameters.facets[field].push(facet);
    }
  },
  REMOVE_FACET(state, { field, facet }) {
    const index = state.searchParameters.facets[field].indexOf(facet);
    state.searchParameters.facets[field].splice(index, 1);
  },
  SET_AVAILABLE_FACETS(state, facets) {
    state.availableFacets = facets;
  },
  SET_DATASETS_COUNT(state, datasetsCount) {
    state.datasetsCount = datasetsCount;
  },
  SET_PAGE(state, page) {
    state.page = page;
  },
  SET_QUERY(state, query) {
    state.searchParameters.query = query;
  },
  SET_SERVICE(state, service) {
    state.service = service;
  },
};

const module = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};

export default module;
