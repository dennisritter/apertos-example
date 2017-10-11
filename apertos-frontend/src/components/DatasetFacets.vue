<template>
  <section class="dataset-facets">
    <div class="sidebar card">
      <div class="card-header">
        <h2 class="card-header-title title is-5">
          Filters
        </h2>
        <div class="card-header-icon">
          <i class="material-icons">
            filter_list
          </i>
        </div>
      </div>
      <div class="card-content facet-field is-paddingless" v-for="field in getAvailableFacets"
           v-if="field.items.length > 0">
        <div class="content is-flex">
          <h2 class="card-content title is-4">
            {{ field.title }}
          </h2>
          <div
            v-for="(facet, index) in sortByCount(field.items)"
            v-if="isExpanded(field.title) ? (index <= limits.max) : (index <= limits.min)"
            class="facet">
            <label class="facet-label is-flex" :class="{ checked: facetIsSelected(field.title, facet.idName) }">
              <input class="facet-checkbox" type="checkbox"
                     @click="facetClicked(field.title, facet.idName)">
              <span class="facet-name">
                {{ facet.title }}
              </span>
              <span class="facet-count">
                {{ facet.count }}
              </span>
            </label>
          </div>
          <button class="button--show-more" v-if="field.items.length > limits.min"
                  @click="toggleExpanded(field.title)">
            <i class="material-icons expand-more animated" v-if="!isExpanded(field.title)">expand_more</i>
            <i class="material-icons expand-less animated" v-if="isExpanded(field.title)">expand_less</i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  /* The minimum amount of facets to show for one category before hiding results */
  const MIN_FACET_LIMIT = 10;
  /* The maximum amount of facets to show for one category */
  const MAX_FACET_LIMIT = 50;

  export default {
    name: 'datasetFacets',
    data() {
      return {
        limits: {
          min: MIN_FACET_LIMIT,
          max: MAX_FACET_LIMIT,
        },
        expanded: [],
      };
    },
    computed: {
      ...mapGetters('datasets', [
        'getAvailableFacets',
      ]),
    },
    methods: {
      ...mapActions('datasets', [
        'loadDatasets',
        'toggleFacet',
        'addFacet',
        'removeFacet',
        'setPage',
      ]),
      /**
       * @description Sorts an array of facets by their count.
       * @param {Array<Object>} facets - The facets to sort
       * @param {Number} facet.count - The amount of datasets having this facet assigned
       * @param {String} facet.name - The name of this facet
       * @returns {Array<Object>}
       */
      sortByCount(facets) {
        return facets.slice().sort((a, b) => {
          const n = b.count - a.count;
          if (n !== 0) return b.count - a.count;
          else if (a.name < b.name) return -1;
          return 1;
        });
      },
      /**
       * @description Returns whether a facet-field is expanded or not.
       * @param {String} field - The given facet-field.
       * @returns {boolean}
       */
      isExpanded(field) {
        return this.expanded.indexOf(field) > -1;
      },
      /**
       * @description Expands/Collapses a facet-field.
       * @param field - The given facet-field
       */
      toggleExpanded(field) {
        const index = this.expanded.indexOf(field);
        if (index > -1) this.expanded.splice(index);
        else this.expanded.push(field);
      },
      /**
       * @description Returns whether a facet is selected or not.
       * @param field - The field of the facet to check.
       * @param facet - The facet to check.
       * @returns {boolean}
       */
      facetIsSelected(field, facet) {
        if (!Object.prototype.hasOwnProperty.call(this.$route.query, field)) {
          return false;
        }
        let qField = this.$route.query[field];
        if (!Array.isArray(qField)) qField = [qField];
        return qField.indexOf(facet) > -1;
      },
      /**
       * @description Wrapping callback-function for a click on a facet.
       * @param field - The field of the clicked facet
       * @param facet - The clicked facet
       */
      facetClicked(field, facet) {
        this.toggleFacet(field, facet);
        this.$router.replace({ query: Object.assign({}, this.$route.query, { page: 1 }) });
        this.$nextTick(() => this.loadDatasets({}));
      },
      /**
       * @description Add/Remove a facet from the routers query parameters.
       * @param field - The field of the facet
       * @param facet - The given facet
       */
      toggleFacet(field, facet) {
        if (!Object.prototype.hasOwnProperty.call(this.$route.query, [field])) {
          this.$router.push({ query: Object.assign({}, this.$route.query, { [field]: [] }) });
        }
        let facets = this.$route.query[field].slice();
        if (!Array.isArray(facets)) facets = [facets];
        const index = facets.indexOf(facet);
        if (index > -1) {
          facets.splice(index, 1);
        } else {
          facets.push(facet);
        }
        this.$router.push({ query: Object.assign({}, this.$route.query, { [field]: facets }) });
      },
    },
    watch: {},
    mounted() {
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/variables/all';

  .dataset-facets {
    .card {
      border-top: $datasetfacets_border-top;
      border-right: $datasetfacets_border-right;
      border-bottom: $datasetfacets_border-bottom;
      border-left: $datasetfacets_border-left;
      border-radius: $datasetfacets_border-radius;
      box-shadow: $datasetfacets_box-shadow;
      background-color: $datasetfacets_background-color;
      .card-header-title {
        padding: 1rem 1rem 1rem 1rem;
        margin: 0 0 0 0;
      }
      .card-header-icon {
        cursor: default;
        padding: 1rem 1rem 1rem 1rem;
      }
      .facet-field {
        h2 {
          color: $datasetfacets-facet-field-headlines_color;
          font-size: $datasetfacets-facet-field-headlines_font-size;
          font-weight: $datasetfacets-facet-field-headlines_font-weight;
          margin: 0 0 0 0;
          padding: 1rem 1rem 1rem 1rem;
        }
        .content.is-flex {
          flex-direction: column;
        }
        // Styles for the Button to show more available facets
        .button--show-more {
          background-color: $datasetfacets-facet-field-show-more-button_background-color;
          border: $datasetfacets-facet-field-show-more-button_border;
          color: $datasetfacets-facet-field-show-more-button_color;
          height: $datasetfacets-facet-field-show-more-button_height;
          outline: none;
          position: relative;
          .animated {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
          }
          &:hover {
            .animated {
              transform: translate(0, .2em);
              animation-name: move-down;
              animation-duration: 1s;
              animation-iteration-count: infinite;
              @keyframes move-down {
                0% {
                  transform: translate(0, 0)
                }
                50% {
                  transform: translate(0, .2em)
                }
                100% {
                  transform: translate(0, 0)
                }
              }
            }
          }
          .material-icons {
            font-size: $datasetfacets-facet-field-show-more-button-icon_font-size;
          }
        }
        // Styles for each facet
        .facet {
          label.facet-label {
            border-radius: $datasetfacets-facet_border-radius;
            border-top: $datasetfacets-facet_border-top;
            border-right: $datasetfacets-facet_border-right;
            border-bottom: $datasetfacets-facet_border-bottom;
            border-left: $datasetfacets-facet_border-left;
            color: $datasetfacets-facet_color;
            display: flex;
            justify-content: flex-start;
            min-height: $datasetfacets-facet_min-height;
            padding: $datasetfacets-facet_padding;
            &:hover {
              background-color: $datasetfacets-facet--hover_background-color;
              border-top: $datasetfacets-facet--hover_border-top;
              border-right: $datasetfacets-facet--hover_border-right;
              border-bottom: $datasetfacets-facet--hover_border-bottom;
              border-left: $datasetfacets-facet--hover_border-left;
              box-shadow: $datasetfacets-facet--hover_box-shadow;
              color: $datasetfacets-facet--hover_color;
              cursor: $datasetfacets-facet--hover_cursor;
              transition: $datasetfacets-facet--hover_transition;
              @media (pointer: coarse) {
                background-color: $secondary;
                transition: none;
                box-shadow: none;
                border-top: solid 1px rgba(0, 0, 0, .12);
                .facet-name {
                  color: $secondary-invert;
                }
                .facet-count {
                  color: $secondary-invert;
                }
              }
            }
            &.checked {
              background-color: $datasetfacets-facet--checked_background-color;
              border-top: $datasetfacets-facet--checked_border-top;
              color: $datasetfacets-facet--checked_color
            }
            .facet-checkbox {
              display: none;
            }
            .facet-name {
              flex-grow: 1;
              margin: auto;
              word-break: break-all;
            }
            .facet-count {
              display: $datasetfacets-facet-count_display;
              align-self: flex-end;
            }
          }
        }
      }
    }
  }
</style>
