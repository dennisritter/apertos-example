import { mount, shallow } from 'avoriaz';
import sinon from 'sinon';
import Vuex from 'vuex';
import Datasets from '@/components/Datasets';
import Vue from 'vue';

Vue.use(Vuex);

describe('Datasets.vue', () => {
  // Store Variables
  let actions = {};
  let getters = {};
  let store = {};
  // $route stub
  const $route = { query: { query: '' } };
  // Create a mock-store
  beforeEach(() => {
    actions = {
      loadDatasets: sinon.stub(),
      loadAdditionalDatasets: sinon.stub(),
      setQuery: sinon.stub(),
      setPage: sinon.stub(),
      useService: sinon.stub(),
      addFacet: sinon.stub(),
      setFacets: sinon.stub(),
    };
    getters = {
      getDatasets: () => [
        {
          categories: [],
          description: 'nice description for a dataset',
          distributions: [
            {
              accessUrl: 'www.mock.com',
              format: 'nice-format',
              description: 'nice description for dist1',
              id: 'dist1',
              modificationDate: '2010-01-01T00:00:00-0800',
              releaseDate: '2000-01-01T00:00:00-0800',
              title: 'Distribution 1',
              url: 'www.mock.com',
              urlType: 'no type',
            },
            {
              accessUrl: 'www.mock.com',
              format: 'format-x',
              description: 'nice description for dist2',
              id: 'dist2',
              modificationDate: '2010-01-01T00:00:00-0800',
              releaseDate: '2000-01-01T00:00:00-0800',
              title: 'Distribution 2',
              url: 'www.mock.com',
              urlType: 'no type',
            },
          ],
          distributionFormats: ['nice-format', 'format-x'],
          id: 'ds1',
          idName: 'ds1',
          licence: 'best licence',
          modificationDate: '2010-01-01T00:00:00-0800',
          publisher: 'Peter Petersen',
          releaseDate: '2000-01-01T00:00:00-0800',
          tags: ['awesome', 'mockdata'],
          title: 'Dataset 1',
        },
      ],
      getLimit: () => 0,
      getOffset: () => 0,
      getPage: () => 1,
      getAvailableFacets: () => [
        {
          title: 'testField1',
          items: ['t1Facet1', 't1Facet2', 't1Facet3'],
        },
        {
          title: 'testField2',
          items: ['t2Facet1', 't2Facet2', 't2Facet3'],
        }],
    };
    store = new Vuex.Store({
      modules: {
        datasets: {
          namespaced: true,
          state: {},
          actions,
          getters,
        },
      },
    });
  });
  it('called action useService() once when mounted', () => {
    shallow(Datasets, {
      store,
      globals: {
        $route,
      },
    });
    expect(actions.useService.calledOnce).to.equal(true);
  });
  it('called action loadDatasets() once when mounted', () => {
    shallow(Datasets, {
      store,
      globals: {
        $route,
      },
    });
    Vue.nextTick(() => {
      expect(actions.loadDatasets.calledOnce).to.equal(true);
    });
  });
  it('called method initPage() and action setPage() once when mounted', () => {
    const spy = sinon.spy(Datasets.methods, 'initPage');
    shallow(Datasets, {
      store,
      globals: {
        $route,
      },
    });
    expect(spy.called).to.equal(true);
    Vue.nextTick(() => {
      expect(actions.setPage.calledOnce).to.equal(true);
    });
  });
  it('called method initQuery() and action setQuery() once when mounted', () => {
    const spy = sinon.spy(Datasets.methods, 'initQuery');
    shallow(Datasets, {
      store,
      globals: {
        $route,
      },
    });
    expect(spy.called).to.equal(true);
    expect(actions.setQuery.calledOnce).to.equal(true);
  });
  it('called method initFacets() once when mounted', () => {
    const spy = sinon.spy(Datasets.methods, 'initFacets');
    shallow(Datasets, {
      store,
      globals: {
        $route,
      },
    });
    Vue.nextTick(() => {
      expect(spy.called).to.equal(true);
    });
  });
});
