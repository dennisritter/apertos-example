/* eslint-disable no-param-reassign */
/**
 * @Publisher Dennis Ritter
 * @description Vuex store for the the details of a dataset.
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// DatasetDetails Module State
/**
 * @property dataset
 * @type JSON
 * @description A dataset object.
 * @example dataset = {
   *  categories: [{ id: 'energy', title: 'energy' }, ..],
   *  description: 'This is dataset1',
   *  distributions: [{}],
   *  distributionFormats: ['csv', 'pdf'],
   *  id: 'abc123qwe345',
   *  idName: 'dataset-1',
   *  language: 'EN',
   *  license: 'ABC License',
   *  modificationDate: '2002-02-02T00:00',
   *  publisher: 'Publisher1',
   *  releaseDate: '2001-01-01T00:00',
   *  tags: ['tag1', 'tag2'],
   *  title: 'dataset1',
   * }
 */
const state = {
  dataset: {
    categories: [],
    description: '',
    /**
     * @example distributions:  [{
     * accessUrl: 'http://demo-url-to-this-resource.org/someID-123-xyz/blabla',
     * downloadUrl: 'http://demo-url-to-this-resource.org/someID-123-xyz/filename.csv',
     * description: 'A description of this distribution',
     * format: 'csv',
     * id: 'someID-123-xyz',
     * license: 'ABC License',
     * modificationDate: 2017-05-31T18:33:48.018695,
     * releaseDate: 2017-05-31T18:33:48.018695,
     * title: 'someTitle',
     * urlType: 'download',
     * },{..}]
     */
    distributions: [{}],
    id: '',
    idName: '',
    language: '',
    license: '',
    modificationDate: '',
    publisher: '',
    releaseDate: '',
    tags: [],
    title: '',
  },
  service: null,
};

const getters = {
  getCategories: state => state.dataset.categories,
  getDescription: state => state.dataset.description,
  getDistributions: state => state.dataset.distributions,
  getDistributionFormats: state => state.distributionFormats,
  getID: state => state.dataset.id,
  getIdName: state => state.dataset.idName,
  getLanguage: state => state.dataset.language,
  getLicense: state => state.dataset.license,
  getModificationDate: state => state.dataset.modificationDate,
  getPublisher: state => state.dataset.publisher,
  getReleaseDate: state => state.dataset.releaseDate,
  getTags: state => state.dataset.tags,
  getTitle: state => state.dataset.title,
  getService: state => state.service,
};

const actions = {
  /**
   * @description Loads details for the dataset with the given ID.
   * @param commit
   * @param state
   * @param id {String} The dataset ID.
   */
  loadDatasetDetails({ state, commit }, id) {
    return new Promise((resolve, reject) => {
      commit('SET_ID', id);
      const service = getters.getService(state);
      service.getSingle(id)
      .then((response) => {
        commit('SET_CATEGORIES', response.categories);
        commit('SET_DESCRIPTION', response.description);
        commit('SET_DISTRIBUTIONS', response.distributions);
        commit('SET_ID_NAME', response.idName);
        commit('SET_LANGUAGE', response.language);
        commit('SET_LICENSE', response.license);
        commit('SET_MODIFICATION_DATE', response.modificationDate);
        commit('SET_PUBLISHER', response.publisher);
        commit('SET_RELEASE_DATE', response.releaseDate);
        commit('SET_TAGS', response.tags);
        commit('SET_TITLE', response.title);
        resolve();
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.error(err);
        reject(err);
      });
    });
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
  SET_DESCRIPTION(state, description) {
    state.dataset.description = description;
  },
  SET_DISTRIBUTIONS(state, distributions) {
    state.dataset.distributions = distributions;
  },
  SET_CATEGORIES(state, categories) {
    state.dataset.categories = categories;
  },
  SET_ID(state, id) {
    state.dataset.id = id;
  },
  SET_ID_NAME(state, idName) {
    state.dataset.idName = idName;
  },
  SET_LANGUAGE(state, language) {
    state.dataset.language = language;
  },
  SET_LICENSE(state, license) {
    state.dataset.license = license;
  },
  SET_MODIFICATION_DATE(state, date) {
    state.dataset.modificationDate = date;
  },
  SET_PUBLISHER(state, publisher) {
    state.dataset.publisher = publisher;
  },
  SET_RELEASE_DATE(state, date) {
    state.dataset.releaseDate = date;
  },
  SET_TAGS(state, tags) {
    state.dataset.tags = tags;
  },
  SET_TITLE(state, title) {
    state.dataset.title = title;
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
