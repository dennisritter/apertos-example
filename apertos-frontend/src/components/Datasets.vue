<template>
  <article class="datasets columns is-marginless">
    <div class="hero search--size-small is-hidden-tablet">
      <div class="hero-body">
        <input class="input searchbar is-medium"
               type="search"
               placeholder="Search Datasets"
               v-model="query"
               @keyup.enter="loadDatasets({service: DatasetsService})">
      </div>
    </div>
    <dataset-facets class="column is-3 is-offset-1"/>
    <section class="column is-7">
      <input class="input searchbar is-medium is-hidden-mobile"
             type="search"
             placeholder="Search Datasets"
             v-model="query"
             @keyup.enter="loadDatasets({service: DatasetsService})">
      <div class="dataset box columns" v-for="dataset in getDatasets"
           @click="$router.push({ path: `${$route.path}/${dataset.idName}` })">
        <div class="column is-7 is-paddingless">
          <h2 class="title is-5">{{ dataset.title }}</h2>
          <p class="description">{{ dataset.description || 'There is no description for this dataset.' }}</p>
        </div>
        <div class="column is-offset-1 is-4 is-paddingless">
            <span class="tag" v-for="format in removeDuplicatesOf(dataset.distributionFormats)">
                {{ format }}
            </span>
          <dl>
            <dt>created</dt>
            <dd>{{ dataset.releaseDate | formatUS }}</dd>
            <dt>updated</dt>
            <dd>{{ dataset.modificationDate | fromNow }}</dd>
          </dl>
        </div>
      </div>
    </section>
    <button class="button is-primary scroll-top" @click="scrollTo(0)">Scroll top</button>
  </article>
</template>

<script>
  // Import vuex helpers
  import { mapActions, mapGetters } from 'vuex';
  // Import custom helpers
  import { debounce } from 'lodash';
  // Import components used in template
  import DatasetFacets from './DatasetFacets';
  // Import filters
  import dateFilters from '../filters/dateFilters';

  export default {
    name: 'datasets',
    dependencies: 'DatasetService',
    components: {
      datasetFacets: DatasetFacets,
    },
    data() {
      return {
        query: '',
        facetFields: [],
        onScroll: debounce(this.handleScroll, 1000),
      };
    },
    computed: {
      ...mapGetters('datasets', [
        'getDatasets',
        'getLimit',
        'getOffset',
        'getPage',
        'getAvailableFacets',
      ]),
      /**
       * @description Returns the current page.
       * @returns {Number}
       */
      page() {
        return this.$route.query.page;
      },
      /**
       * @description Returns the active facets.
       * @returns {Object}
       */
      facets() {
        const facets = {};
        for (const field of this.facetFields) {
          let urlFacets = this.$route.query[field];
          if (!urlFacets) urlFacets = [];
          else if (!Array.isArray(urlFacets)) urlFacets = [urlFacets];
          facets[field] = urlFacets;
        }
        return facets;
      },
    },
    methods: {
      ...mapActions('datasets', [
        'loadDatasets',
        'loadAdditionalDatasets',
        'setQuery',
        'setPage',
        'useService',
        'addFacet',
        'setFacets',
      ]),
      /**
       * @description Handler-function for the scroll event. Will load more Datasets when bottom of the page is reached.
       */
      handleScroll() {
        const vm = this;
        const items = this.$el.querySelectorAll('.dataset');
        const lastItem = items[items.length - 1];
        if (lastItem) {
          const lastItemPos = lastItem.getBoundingClientRect();
          if (lastItemPos.bottom - window.innerHeight <= 0) {
            vm.loadAdditionalDatasets();
          }
        }
      },
      /**
       * @description The the current scroll-level to a given point.
       * @param x {Number} - The x-position to scroll to
       * @param y {Number} - The y-position to scroll to
       */
      scrollTo(x, y) {
        window.scrollTo(x, y);
      },
      /**
       * @description Removes the duplicates of the given array
       * @param array {Array} - The array to remove duplicates from
       * @returns {Array}
       */
      removeDuplicatesOf(array) {
        // Array --> Set --> Array to remove duplicates.
        return [...new Set(array)];
      },
      /**
       * @description Determines the current page.
       */
      initPage() {
        const page = parseInt(this.$route.query.page, 10);
        if (page > 0) this.setPage(page);
        else this.setPage(1);
      },
      /**
       * @description Initialize the query String by checking the route parameters
       */
      initQuery() {
        let query = this.$route.query.query;
        if (!query) {
          query = '';
          this.setQuery('');
        }
        this.query = query;
      },
      /**
       * @descritption Initialize the active facets by checking the route parameters
       */
      initFacets() {
        const availableFacets = this.getAvailableFacets;
        for (const field of availableFacets) {
          this.facetFields.push(field.title);
          if (!Object.prototype.hasOwnProperty.call(this.$route.query, [field.title])) {
            this.$router.replace({
              query: Object.assign({}, this.$route.query, { [field.title]: [] }),
            });
          } else {
            for (const facet of this.$route.query[field.title]) {
              this.addFacet({ field: field.title, facet });
            }
          }
        }
      },
    },
    filters: {
      formatUS: dateFilters.formatUS,
      fromNow: dateFilters.fromNow,
    },
    watch: {
      // eslint-disable-next-line object-shorthand
//      page(pageStr) {
//        const page = parseInt(pageStr, 10);
//        if (page > 0) this.setPage(page);
//        this.$nextTick(() => {
//          this.loadDatasets({});
//        });
//      },
      /**
       * @descritpion Watcher for active facets
       */
      // eslint-disable-next-line object-shorthand
      facets: {
        handler(facets) {
          this.setFacets(facets);
        },
        deep: true,
      },
      /**
       * @description Watcher for the routes query params.
       * @param query
       */
      query(query) {
        this.$router.replace({ query: Object.assign({}, this.$route.query, { query }) });
        this.setQuery(query);
      },
    },
    created() {
      this.useService(this.DatasetService);
      this.initPage();
      this.initQuery();
      this.$nextTick(() => {
        this.loadDatasets({}).then(() => {
          this.initFacets();
        });
      });
      window.addEventListener('scroll', this.onScroll);
    },
    mounted() {
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/variables/all';

  .datasets {
    padding: $datasets_padding;
    .dataset {
      background-color: $datasets-dataset_background-color;
      border-top: $datasets-dataset_border-top;
      border-right: $datasets-dataset_border-right;
      border-bottom: $datasets-dataset_border-bottom;
      border-left: $datasets-dataset_border-left;
      border-radius: $datasets-dataset_border-radius;
      box-shadow: $datasets-dataset_box-shadow;
      color: $datasets-dataset_color;
      margin: $datasets-dataset_margin;
      padding: $datasets-dataset_padding;
      transition: $datasets-dataset_transition;
      &:hover {
        border-color: $datasets-dataset--hover_border-color;
        box-shadow: $datasets-dataset--hover_box-shadow;
        cursor: $datasets-dataset--hover_cursor;
      }
      dl {
        font-size: $datasets-dataset-metadata-list_font-size;
      }
      dt {
        font-weight: $datasets-dataset-metadata-list-keys_font-weight;
      }
      .tag {
        background-color: $datasets-dataset-tag_background-color;
        color: $datasets-dataset-tag_color;
        margin: $datasets-dataset-tag_margin;
      }
    }
    .hero.search--size-small {
      background-color: $datasets-searchbar--mobile_background-color;
      margin: 0;
      .hero-body {
        padding: 1rem;
      }
    }
    .scroll-top {
      position: fixed;
      bottom: .5em;
      right: 0;
    }

    .searchbar {
      border-radius: $datasets-searchbar_border-radius;
      padding: $datasets-searchbar_padding;
    }

    .title {
      color: $datasets-dataset-title_color;
      font-size: $datasets-dataset-title_font-size;
      font-weight: $datasets-dataset-title_font-weight;
    }
  }

  @media only screen and (max-width: $tablet) {
    .datasets {
      padding: 0 0 0 0;
    }
  }
</style>
