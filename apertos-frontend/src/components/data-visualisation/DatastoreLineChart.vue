/** Experimental NVD3 Line Chart example using Datastore Data if present is a dataset */
<template>
  <div class="datastore-visualisation">
    <svg id="chart" width="100%" height="500px" ref="svg">
    </svg>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import * as d3 from 'd3';
  import nv from 'nvd3';

  export default {
    name: 'datastoreLineChart',
    dependencies: 'DatastoreService',
    props: {
      distId: {
        type: String,
        required: true,
      },
      distTitle: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        startDate: 0,
        endDate: 0,
        deltaMilliseconds: 1000,
      };
    },
    computed: {
      ...mapGetters('datastoreVisualisation', [
        'getId',
        'getRecords',
      ]),
      /**
       * @description Returns the data to show in this line chart prepared for NVD3.js
       * @returns {Array}
       */
      getNVData() {
        const records = this.getRecords;
        const nvData = [{ key: this.distTitle, values: [] }];
        records.forEach((record, index) => {
          nvData[0].values.push({});
          nvData[0].values[index].x = new Date(record.date);
          nvData[0].values[index].y = record.value;
        });
        // Sort dates before using them.
        // Sometimes Dates do not appear in the right order which leads to weird behaviour in the chart
        nvData[0].values.sort((a, b) => a.x - b.x);
        this.startDate = nvData[0].values[0].x;
        const lastIndex = nvData[0].values.length - 1;
        this.endDate = nvData[0].values[lastIndex].x;
        return nvData;
      },
    },
    methods: {
      ...mapActions('datastoreVisualisation', [
        'loadData',
        'useService',
      ]),
      /**
       * @description Creates a Line Chart representing the given data.
       * @param data {Array}
       */
      createChart(data) {
        nv.addGraph(() => {
          const chart = nv.models.lineChart()
          .useInteractiveGuideline(true);
          chart.xAxis
          .axisLabel('Date')
          .tickFormat((d) => {
            const format = d3.time.format('%X');
            return format(new Date(d));
          })
          .rotateLabels(-45);
          chart.yAxis
          .axisLabel('Value')
          .tickFormat(d3.format('.02f'));
          d3.select('#chart')
          .datum(data)
          .transition().duration(500)
          .call(chart);
          nv.utils.windowResize(chart.update);
          this.chart = chart;
          return chart;
        });
      },
    },
    created() {
      this.useService(this.DatastoreService);
    },
    mounted() {
      if (this.distId) {
        this.loadData(this.distId).then(() => {
          this.createChart(this.getNVData);
        });
      } else if (this.$route.params.dist_id) {
        this.loadData(this.$route.params.dist_id).then(() => {
          this.createChart(this.getNVData);
        });
      }
    },
    beforeDestroy() {},
    watch: {},
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/variables/all';

</style>
