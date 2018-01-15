<template>
  <div class="Lookup">
    <h1>{{ title }}</h1>
    <md-field md-inline>
      <label>Placeholder</label>
      <md-input v-model="initial"></md-input>
    </md-field>
    <h2>Results</h2>
    <agritable />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Agriboard',
  data () {
    return {
      title: 'Lookup',
      initial: '',
      type: null,
      withLabel: null,
      inline: null,
      number: null,
      textarea: null,
      autogrow: null,
      disabled: null
    };
  },
});
</script>

<style lang="scss" scoped>

.md-field {
  margin: auto;
}

</style>

