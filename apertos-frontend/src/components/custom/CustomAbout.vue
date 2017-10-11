<!-- Experimental import of a Template outside of this repository -->
<template>
  <about>
    <template slot="about-content-slot">
      <!-- Add a template inside this element to customize ~/src/components/About.vue content -->
      <!-- See https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots to learn how to use slots -->
      <div ref="about"></div>
    </template>
  </about>
</template>

<script>
  import About from '@/components/About';
  import glueConfig from '../../../../glue-config';

  export default {
    // Don't change the values for 'name' or 'components'
    name: 'customAbout',
    components: {
      about: About,
    },
    data() {
      return {};
    },
    computed: {},
    methods: {},
    filters: {},
    watch: {},
    created() {},
    mounted() {
      const container = this.$refs.about;
      // Experimental import of a template defined outside of this repository via the glueConfig.js
      if (glueConfig.templates.about) container.innerHTML = glueConfig.templates.about;
      else container.innerHTML = '<p>Sorry, there is no content.</p>';
    },
  };
</script>

<style lang="scss" scoped>
  article {
    margin: auto auto 3em auto
  }
</style>
