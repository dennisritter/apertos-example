<template>
  <div class="distribution-details">
    <div class="columns is-marginless">
      <div class="column is-offset-1 is-7">
        <section class="card">
          <div class="card-header">
            <h1 class="title card-header-title title is-3">{{ getTitle }}</h1>
          </div>
          <div class="description card-content">
            <h2 class="title is-4">Description</h2>
            <p>{{ getDescription || '-' }}</p>
          </div>
        </section>
      </div>
      <div class="column is-3">
        <aside class="metadata box">
          <dl>
            <dt>Format</dt>
            <dd>{{ getFormat || '-' }}</dd>
            <dt>Created</dt>
            <dd>{{ getReleaseDate | formatUS }}</dd>
            <dt>Last modification</dt>
            <dd>{{ getModificationDate | fromNow }}</dd>
          </dl>
        </aside>
      </div>
    </div>
    <div class="columns is-marginless" v-if="getUrlType === 'datastore'">
      <div class="column is-offset-1 is-10">
        <section class="data-visualisation box">
          <datastore-line-chart :dist-id="$route.params.dist_id" :dist-title="getTitle"/>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  // import Actions and Getters from Store Module
  import { mapActions, mapGetters } from 'vuex';
  // import nested components
  import DatastoreLineChart from '@/components/data-visualisation/DatastoreLineChart';
  // import filters
  import dateFilters from '../filters/dateFilters';

  export default {
    name: 'distributionDetails',
    dependencies: 'DistributionService',
    components: {
      datastoreLineChart: DatastoreLineChart,
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters('distributionDetails', [
        'getAccessUrl',
        'getDescription',
        'getFormat',
        'getId',
        'getLicence',
        'getModificationDate',
        'getReleaseDate',
        'getTitle',
        'getDownloadUrl',
        'getUrlType',
      ]),
    },
    methods: {
      ...mapActions('distributionDetails', [
        'loadDistributionDetails',
        'useService',
      ]),
    },
    filters: {
      formatUS: dateFilters.formatUS,
      fromNow: dateFilters.fromNow,
    },
    watch: {},
    created() {
      this.useService(this.DistributionService);
      this.loadDistributionDetails(this.$route.params.dist_id);
    },
    mounted() {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/variables/all';

  .distribution-details {
    padding: $distributiondetails_padding;
    .box {
      box-shadow: $distributiondetails-box_box-shadow;
    }
    .card {
      box-shadow: $distributiondetails-box_box-shadow;
      .card-content {
        background-color: $distributiondetails-card-content_background-color;
        color: $distributiondetails-card-content_color;
        font-size: $distributiondetails-card-content_font-size;
        font-weight: $distributiondetails-card-content_font-weight;
        padding: $distributiondetails-card-content_padding;
      }
      .card-header-title {
        background-color: $distributiondetails-card-title_background-color;
        color: $distributiondetails-card-title_color;
        font-size: $distributiondetails-card-title_font-size;
        font-weight: $distributiondetails-card-title_font-weight;
        padding: $distributiondetails-card-title_padding;
      }
    }
    .metadata {
      background-color: $distributiondetails-metadata-list_background-color;
      color: $distributiondetails-metadata-list_color;
      font-size: $distributiondetails-metadata-list_font-size;
      padding: $distributiondetails-metadata-list_padding;
      dt {
        font-weight: $distributiondetails-metadata-list-key_font-weight;
        &:not(:first-child) {
          margin: $distributiondetails-metadata-list-key_margin;
        }
      }
      .tag {
        border-radius: $distributiondetails-metadata-list-tag_border-radius;
        &:not(:last-child) {
          margin: $distributiondetails-metadata-list-tag_margin;
        }
      }
    }
  }
</style>
