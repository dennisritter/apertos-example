<!--  Represents the 'About' page. -->
<template>
  <div class="about">
    <div class="column is-offset-one-quarter is-half">
      <slot name="about-content-slot">
      <!-- This slot can be filled by editing ~/src/components/custom/CustomAbout.vue -->
      <!-- See https://vuejs.org/v2/guide/components.html#Content-Distribution-with-Slots to learn how to use slots -->
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'about',
  };
</script>

<style>
  .about article {
    margin: auto auto 3em auto
  }
</style>
