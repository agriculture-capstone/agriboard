<template>
  <div class="Lookup">
    <h1>{{ title }}</h1>
    <input type="text" name="lookup_field">
    <h2>Results</h2>
    <agritable />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Agriboard',
  methods: {
    test() {
      return 'hi';
    },
  },
  data () {
    return {
      title: 'Lookup',
      results: [
        {
          name: 'bobby safali',
          type: 'Farmer',
          dateCreated:  '01/10/2018',
          lastModified:  '01/10/2018',
        },
        {
          name: 'Alex Joe',
          type: 'Farmer',
          dateCreated:  '03/10/2017',
          lastModified:  '01/10/2018',
        },
        {
          name: 'Donna Donair',
          type: 'Trader',
          dateCreated:  '04/10/2018',
          lastModified:  '01/10/2018',
        },
      ]
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

input[type="text"]{
  font-size: 2em;
  padding: 9px;
}

</style>
