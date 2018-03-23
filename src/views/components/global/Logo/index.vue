<template>
  <h1 class="md-title title">{{ computedTitle }}</h1>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.component('logo', {
  name: 'logo',

  props: {
    title: {
      type: String,
      required: false,
    },
  },

  data () {
    return {
      defaultTitle: 'Agriboard',
    };
  },

  computed: {
    computedTitle (): string {
      return this.title || this.defaultTitle;
    },
  },
});
</script>


<style lang="scss" scoped>
.title {
  font-family: 'Fjalla One', sans-serif;
  letter-spacing: 1.3px;
}
</style>
