<template>
  <div class="columns dataset-details is-marginless">
    <div class="column is-offset-1 is-7">
      <section class="card">
        <div class="card-header">
          <h1 class="title card-header-title title is-3">{{ getTitle }}</h1>
        </div>
        <div class="description card-content">
          <h2 class="title is-4">Description</h2>
          <p>{{ getDescription || '-' }}</p>
        </div>
        <div class="section distributions card-content">
          <h2 class="title is-4">Distributions</h2>
          <table class="table is-striped is-narrow">
            <thead>
            <tr>
              <th>Name</th>
              <th>Format</th>
              <th>Created</th>
              <th>Modified</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="distribution in getDistributions">
              <td>{{ distribution.title }}</td>
              <td>{{ distribution.format }}</td>
              <td>{{ distribution.releaseDate | formatUS}}</td>
              <td>{{ distribution.modificationDate | fromNow }}</td>
              <td>
                <a @click="$router.push({ path: `${$route.path}/distributions/${distribution.id}` })">
                  <i class="material-icons is-primary">find_in_page</i>
                </a>
              </td>
              <td>
                <a v-bind:href="distribution.downloadUrl" download>
                  <i class="material-icons is-primary">file_download</i>
                </a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <div class="column is-3">
      <aside class="metadata box">
        <slot name="metadata-slot"
              :categories="getCategories"
              :description="getDescription"
              :distributions="getDistributions"
              :distributionFormats="getDistributionFormats"
              :id="getID"
              :idName="getIdName"
              :language="getLanguage"
              :license="getLicense"
              :modificationDate="getModificationDate"
              :publisher="getPublisher"
              :releaseDate="getReleaseDate"
              :tags="getTags"
              :title="getTitle"
              >
          <dl>
            <dt>Publisher</dt>
            <dd>{{ getPublisher|| '-' }}</dd>
            <dt>License</dt>
            <dd>{{ getLicense|| '-' }}</dd>
            <dt>Created</dt>
            <dd>{{ getReleaseDate | formatUS }}</dd>
            <dt>Last modification</dt>
            <dd>{{ getModificationDate | fromNow }}</dd>
            <dt>Tags</dt>
            <dd class="tag is-primary" v-for="tag in getTags">{{ tag }}</dd>
          </dl>
        </slot>
      </aside>
    </div>
  </div>
</template>

<script>
  // import Actions and Getters from Store Module
  import { mapActions, mapGetters } from 'vuex';
  // import filters
  import dateFilters from '../filters/dateFilters';

  export default {
    name: 'datasetDetails',
    dependencies: 'DatasetService',
    data() {
      return {};
    },
    computed: {
      // import store-getters
      ...mapGetters('datasetDetails', [
        'getCategories',
        'getDescription',
        'getDistributions',
        'getDistributionFormats',
        'getID',
        'getIdName',
        'getLanguage',
        'getLicense',
        'getModificationDate',
        'getPublisher',
        'getReleaseDate',
        'getTags',
        'getTitle',
      ]),
    },
    methods: {
      // import store-actions
      ...mapActions('datasetDetails', [
        'loadDatasetDetails',
        'useService',
      ]),
    },
    filters: {
      formatUS: dateFilters.formatUS,
      fromNow: dateFilters.fromNow,
    },
    watch: {},
    created() {
      this.useService(this.DatasetService);
      this.loadDatasetDetails(this.$route.params.ds_id);
    },
    mounted() {},
  };
</script>

<style lang="scss" scoped>
  @import '../styles/variables/all';

  .dataset-details {
    padding: $datasetdetails_padding;
    .box {
      box-shadow: $datasetdetails-box_box-shadow;
    }
    .card {
      box-shadow: $datasetdetails-box_box-shadow;
      .card-content {
        background-color: $datasetdetails-card-content_background-color;
        color: $datasetdetails-card-content_color;
        font-size: $datasetdetails-card-content_font-size;
        font-weight: $datasetdetails-card-content_font-weight;
        padding: $datasetdetails-card-content_padding;
      }
      .card-header-title {
        background-color: $datasetdetails-card-title_background-color;
        color: $datasetdetails-card-title_color;
        font-size: $datasetdetails-card-title_font-size;
        font-weight: $datasetdetails-card-title_font-weight;
        padding: $datasetdetails-card-title_padding;
      }
    }
    .distributions {
      overflow-x: auto;
    }
    .metadata {
      background-color: $datasetdetails-metadata-list_background-color;
      color: $datasetdetails-metadata-list_color;
      font-size: $datasetdetails-metadata-list_font-size;
      padding: $datasetdetails-metadata-list_padding;
      dt {
        font-weight: $datasetdetails-metadata-list-key_font-weight;
        &:not(:first-child) {
          margin: $datasetdetails-metadata-list-key_margin;
        }
      }
      .tag {
        border-radius: $datasetdetails-metadata-list-tag_border-radius;
        margin: $datasetdetails-metadata-list-tag_margin;
      }
    }
  }
</style>
