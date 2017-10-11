<template>
  <div>
    <top/>
    <router-view></router-view>
  </div>
</template>

<script>
  import Top from './components/Top';

  export default {
    name: 'app',
    components: {
      top: Top,
    },
  };
</script>

<style lang="scss">
  // Normalizes default css rules. See: https://github.com/necolas/normalize.css
  @import './styles/utils/normalize.css';

  * {
    box-sizing: border-box
  }
</style>
