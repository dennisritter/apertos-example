/** A component to wrap all components that should be present in the HTML-header
    note: When naming this component 'Header' instead of 'Top' the page will break.
    Native HTML-Tag names are not allowed for Vue components. **/

<template>
    <header>
      <topbar class="is-hidden-mobile"/>
      <navbar/>
    </header>
</template>

<script>
  import Topbar from './Topbar';
  import Navbar from './Navbar';

  export default {
    name: 'top',
    components: {
      topbar: Topbar,
      navbar: Navbar,
    },
  };
</script>

<style scoped>

</style>
