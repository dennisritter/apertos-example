<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-center">
        <a class="nav-item is-tab is-hidden-mobile" v-bind:class="{'is-active': currentRoute.name === 'Home'}"
           @click="$router.push({ path: `/home` })">
          <i class="material-icons">home</i>
          Home
        </a>
        <a class="nav-item is-tab is-hidden-mobile" v-bind:class="{'is-active': currentRoute.name === 'About'}"
           @click="$router.push({ path: `/about` })">
          <i class="material-icons">info</i>
          About
        </a>
        <a class="nav-item is-tab is-hidden-mobile" v-bind:class="{'is-active': currentRoute.name === 'Datasets'}"
           @click="$router.push({ path: `/datasets` })">
          <i class="material-icons">storage</i>
          Data
        </a>
      </div>
      <div class="nav-left is-hidden-tablet">
        <span class="image-wrapper">
          <a @click="$router.push({ path: `/home` })">
            <img class="navbar-logo" src="../assets/img/fokus_85mm_CMYK_2016.svg"
                 alt="Logo of the Fraunhofer Institute for Open Communication Systems"/>
          </a>
          <a @click="$router.push({ path: `/home` })">
            <img class="navbar-logo" src="../assets/img/ids-logo.png"
                 alt="Logo of the Industrial Data Space project"/>
          </a>
        </span>
      </div>
      <span class="nav-toggle" @click="toggleMenu()">
          <i class="material-icons icon--menu" v-if="!menuIsActive">menu</i>
          <i class="material-icons icon--menu" v-if="menuIsActive">close</i>
      </span>
      <div class="nav-right nav-menu" v-bind:class="{'is-active': menuIsActive}" v-if="menuIsActive">
        <a class="nav-item is-tab is-hidden-tablet" @click="$router.push({ path: `/home` }); menuIsActive = false">
          <i class="material-icons">home</i>
          Home
        </a>
        <a class="nav-item is-tab is-hidden-tablet" @click="$router.push({ path: `/about` }); menuIsActive = false">
          <i class="material-icons">info</i>
          About
        </a>
        <a class="nav-item is-tab is-hidden-tablet" @click="$router.push({ path: `/datasets` }); menuIsActive = false">
          <i class="material-icons">storage</i>
          Data
        </a>
        <a class="nav-item is-tab is-hidden-tablet" @click="$router.push({ path: `/impressum` }); menuIsActive = false">
          <i class="material-icons">import_contacts</i>
          Impressum
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: 'topnav',
    computed: {
      /**
       * @description Returns the name of the currennt route.
       * @return {String}
       */
      currentRoute() {
        return this.$store.getters.getCurrentRoute;
      },
    },
    data() {
      return {
        menuIsActive: false,
      };
    },
    methods: {
      /**
       * @description Toggles whether the mobile menu is active currently.
       */
      toggleMenu() {
        this.menuIsActive = !this.menuIsActive;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../styles/variables/all';

  .icon--menu {
    line-height: 2;
  }

  img.navbar-logo {
    margin: 0;
    padding: .5em;
    height: 100%;
  }
  span.image-wrapper {
    text-align: left;
  }
  .nav-left {
    overflow: hidden;
  }

  .nav {
    background-color: $navbar_background-color;
    color: $navbar_background-color-invert;
    .nav-item.is-tab {
      color: $navbar-nav-item_color;
      background-color: $navbar-nav-item_background_color;
      &:hover {
        border-bottom-color: $navbar-nav-item--hover_border-color;
        background-color: $navbar-nav-item--hover_background-color;
      }
      &.is-tab.is-active {
        border-bottom-color: $navbar-nav-item--active_border-color;
        color: $navbar-nav-item--active_color;
      }
      i {
        margin: 0 .5em 0 0;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .nav {
      background-color: $navbar_background-color--mobile;
      color: $navbar_color--mobile;
      .nav-toggle:hover {
        background-color: $navbar-nav-toggle--hover--mobile;
      }
    }
  }
</style>
