/** Experimental NVD3 Line Chart example file using mockdata */
<template>
  <div class="datastore-visualisation">
    <svg id="chart" width="100%" height="500px" ref="svg">
    </svg>
  </div>
</template>

<script>
  /* eslint-disable max-len,no-console */
  import { mapActions, mapGetters } from 'vuex';
  import * as d3 from 'd3';
  import nv from 'nvd3';

  export default {
    name: 'nvd3DLineChartExample',
    dependencies: 'DatastoreService',
    props: {
      distId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        data: {
          dates: [],
          values: [],
        },
      };
    },
    computed: {
      ...mapGetters('datastoreVisualisation', [
        'getId',
        'getRecords',
      ]),
      getData() {
        const records = this.getRecords;
        const dates = [];
        const values = [];
        for (const record of records) {
          dates.push(new Date(record.date));
          values.push(record.value);
        }
        // Sort dates before using them.
        // Sometimes Dates do not appear in the right order which leads to weird behaviour in the chart
        dates.sort((a, b) => b - a);
        return { dates, values };
      },
//      padded() {
//        const width = this.width - this.margin.left - this.margin.right;
//        const height = this.height - this.margin.top - this.margin.bottom;
//        return { width, height };
//      },
    },
    methods: {
      ...mapActions('datastoreVisualisation', [
        'loadData',
        'useService',
      ]),
//      translateAxis({ x, y }) {
//        return { transform: `translate(${x}px, ${y}px)` };
//      },
      createChart() {
        nv.addGraph(() => {
          const chart = nv.models.lineChart()
          .useInteractiveGuideline(true);
          chart.xAxis
          .axisLabel('Time (year)')
          .tickFormat(d3.format('d'));
          chart.yAxis
          .axisLabel('Value (thousands)')
          .tickFormat(d3.format('d'));

          const data = [
            // {key:"Baden-Württemberg", values:[{y: 10223}, {y: 10260}, {y: 10285}, {y: 10297}, {y: 10324}, {y: 10359}, {y: 10408}, {y: 10463}, {y: 10496}, {y: 10512}, {y: 10521}, {y: 10519}, {y: 10514}, {y: 10506}, {y: 10491}, {y: 10480}, {y: 10495}, {y: 10541}, {y: 10600}, {y: 10674}, {y: 10798}]},
            // {key:"Bayern", values:[{y: 11917}, {y: 11970}, {y: 11999}, {y: 12013}, {y: 12050}, {y: 12114}, {y: 12193}, {y: 12264}, {y: 12304}, {y: 12325}, {y: 12340}, {y: 12358}, {y: 12376}, {y: 12383}, {y: 12370}, {y: 12373}, {y: 12413}, {y: 12481}, {y: 12562}, {y: 12648}, {y: 12768}]},
            {
              key: 'Berlin',
              values: [{ y: 3434 }, { y: 3418 }, { y: 3386 }, { y: 3346 }, { y: 3317 }, { y: 3299 }, { y: 3290 }, { y: 3286 }, { y: 3277 }, { y: 3266 }, { y: 3260 }, { y: 3260 }, { y: 3261 }, { y: 3266 }, { y: 3269 }, { y: 3274 }, { y: 3302 }, { y: 3351 }, { y: 3399 }, { y: 3446 }, { y: 3495 }],
            },
            // {key:"Brandenburg", values:[{y: 2531}, {y: 2537}, {y: 2550}, {y: 2566}, {y: 2577}, {y: 2581}, {y: 2574}, {y: 2562}, {y: 2551}, {y: 2542}, {y: 2532}, {y: 2520}, {y: 2506}, {y: 2492}, {y: 2478}, {y: 2466}, {y: 2457}, {y: 2451}, {y: 2449}, {y: 2454}, {y: 2471}]},
            // {key:"Bremen", values:[{y: 678}, {y: 676},{y: 673}, {y: 667}, {y: 662}, {y: 657}, {y: 655}, {y: 656}, {y: 657}, {y: 657}, {y: 657}, {y: 657}, {y: 656}, {y: 654}, {y: 653}, {y: 652}, {y: 652}, {y: 653}, {y: 656}, {y: 660}, {y: 667}]},
            // {key:"Hamburg", values:[{y: 1689}, {y: 1686}, {y: 1681}, {y: 1673}, {y: 1669}, {y: 1673}, {y: 1679}, {y: 1682}, {y: 1682}, {y: 1681}, {y: 1681}, {y: 1687}, {y: 1696}, {y: 1701}, {y: 1699}, {y: 1702}, {y: 1712}, {y: 1726}, {y: 1740}, {y: 1755}, {y: 1775}]},
            // {key:"Hessen", values:[{y: 5972}, {y: 5990}, {y: 5996}, {y: 5996}, {y: 6001}, {y: 6013}, {y: 6021}, {y: 6028}, {y: 6029}, {y: 6027}, {y: 6023}, {y: 6008}, {y: 5993}, {y: 5983}, {y: 5973}, {y: 5969}, {y: 5982}, {y: 6005}, {y: 6031}, {y: 6070}, {y: 6135}]},
            // {key:"Mecklenburg-Vorpommern", values:[{y: 1822}, {y: 1813}, {y: 1804}, {y: 1794}, {y: 1783}, {y: 1770}, {y: 1754}, {y: 1737}, {y: 1721}, {y: 1708}, {y: 1694}, {y: 1679}, {y: 1664}, {y: 1648}, {y: 1632}, {y: 1620}, {y: 1611}, {y: 1604}, {y: 1598}, {y: 1598}, {y: 1606}]},
            // {key:"Niedersachsen", values:[{y: 7715}, {y: 7757}, {y: 7782}, {y: 7801}, {y: 7820}, {y: 7843}, {y: 7864}, {y: 7883}, {y: 7894}, {y: 7896}, {y: 7890}, {y: 7875}, {y: 7858}, {y: 7834}, {y: 7807}, {y: 7787}, {y: 7777}, {y: 7777}, {y: 7785}, {y: 7809}, {y: 7877}]},
            // {key:"Nordrhein-Westfalen", values:[{y: 17780}, {y: 17831}, {y: 17857}, {y: 17856}, {y: 17854}, {y: 17856}, {y: 17867}, {y: 17886}, {y: 17885}, {y: 17871}, {y: 17846}, {y: 17808}, {y: 17764}, {y: 17702}, {y: 17625}, {y: 17566}, {y: 17545}, {y: 17550}, {y: 17563}, {y: 17605}, {y: 17752}]},
            // {key:"Rheinland-Pfalz", values:[{y: 3962}, {y: 3986}, {y: 4006}, {y: 4018}, {y: 4024}, {y: 4028}, {y: 4037}, {y: 4048}, {y: 4052}, {y: 4053}, {y: 4053}, {y: 4048}, {y: 4041}, {y: 4029}, {y: 4012}, {y: 3999}, {y: 3992}, {y: 3990}, {y: 3992}, {y: 4003}, {y: 4032}]},
            // {key:"Saarland", values:[{y: 1080}, {y: 1079}, {y: 1077}, {y: 1071}, {y: 1066}, {y: 1062}, {y: 1059}, {y: 1056}, {y: 1053}, {y: 1048}, {y: 1042}, {y: 1034}, {y: 1027}, {y: 1020}, {y: 1012}, {y: 1005}, {y: 1000}, {y: 996}, {y: 993}, {y: 990}, {y: 992}]},
            // {key:"Sachsen", values:[{y: 4557}, {y: 4533}, {y: 4506}, {y: 4474}, {y: 4438}, {y: 4402}, {y: 4360}, {y: 4317}, {y: 4282}, {y: 4251}, {y: 4223}, {y: 4196}, {y: 4166}, {y: 4133}, {y: 4103}, {y: 4078}, {y: 4060}, {y: 4052}, {y: 4048}, {y: 4051}, {y: 4070}]},
            // {key:"Sachsen-Anhalt", values:[{y: 2741}, {y: 2721}, {y: 2700}, {y: 2674}, {y: 2646}, {y: 2614}, {y: 2578}, {y: 2543}, {y: 2512}, {y: 2483}, {y: 2454}, {y: 2426}, {y: 2396}, {y: 2364}, {y: 2334}, {y: 2309}, {y: 2287}, {y: 2268}, {y: 2252}, {y: 2240}, {y: 2241}]},
            // {key:"Schleswig-Holstein", values:[{y: 2706}, {y: 2721}, {y: 2735}, {y: 2745}, {y: 2754}, {y: 2765}, {y: 2777}, {y: 2789}, {y: 2797}, {y: 2801}, {y: 2805}, {y: 2806}, {y: 2807}, {y: 2805}, {y: 2801}, {y: 2800}, {y: 2801}, {y: 2804}, {y: 2811}, {y: 2823}, {y: 2845}]},
            // {key:"Thüringen", values:[{y: 2502}, {y: 2486}, {y: 2472}, {y: 2456}, {y: 2439}, {y: 2421}, {y: 2400}, {y: 2379}, {y: 2358}, {y: 2337}, {y: 2316}, {y: 2292}, {y: 2267}, {y: 2244}, {y: 2222}, {y: 2204}, {y: 2188}, {y: 2176}, {y: 2166}, {y: 2159}, {y: 2164}]},
            // {key:"Länder insgesamt", values:[{y: 81308}, {y: 81466}, {y: 81510}, {y: 81446}, {y: 81422}, {y: 81457}, {y: 81517}, {y: 81578}, {y: 81549}, {y: 81456}, {y: 81337}, {y: 81173}, {y: 80992}, {y: 80764}, {y: 80483}, {y: 80284}, {y: 80275}, {y: 80426}, {y: 80646}, {y: 80983}, {y: 81687}]},
          ];

          for (let i = 1995; i < 2016; i += 1) {
            const index = i - 1995;
            data.forEach((e) => {
// eslint-disable-next-line no-param-reassign
              e.values[index].x = i;
            });
          }
          d3.select('#chart')
          .datum(data)
          .transition().duration(500)
          .call(chart);
          nv.utils.windowResize(chart.update);
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
          this.createChart();
        });
      } else if (this.$route.params.dist_id) {
        this.loadData(this.$route.params.dist_id).then(() => {
          this.createChart();
        });
      }
    },
    beforeDestroy() {
    },
    watch: {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/variables/all';

</style>
