<template>
  <div class="Lookup">
    <h1>{{ title }}</h1>
    <md-field md-inline>
      <label>Inline</label>
      <md-input v-model="inline"></md-input>
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
      initial: 'Initial Value',
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.md-field {
  margin: auto;
}
</style>
