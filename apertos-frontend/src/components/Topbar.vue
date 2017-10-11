<template>
  <div class="topbar columns is-marginless is-flex">
    <div class="column is-5 is-offset-1 is is-paddingless">
      <span>
        <a @click="$router.push({ path: `/home` })">
          <img class="topbar-logo" src="../assets/img/fokus_85mm_weiss.svg"
               alt="Logo of the Fraunhofer Institute for Open Communication Systems"/>
        </a>
      </span>
    </div>
    <div class="column is-5">
      <nav class="nav">
        <div class="nav-right">
          <a class="nav-item is-small" @click="$router.push({ path: `/impressum` })">
            impressum
          </a>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topbar',
    methods: {},
  };
</script>

<style lang="scss" scoped>
  @import '../styles/variables/all';

  .topbar {
    background-color: $topbar_background-color;
    height: $topbar_height;
    img.topbar-logo {
      margin: 0;
      padding: .5em;
      height: 100%;
    }
    nav {
      background-color: transparent;
      height: 100%;
      .nav-item {
        font-size: $size-small;
        color: $topbar_background-color-invert;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

</style>
