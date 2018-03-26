<template>
  <div class='ManagePeople'>
    <md-table class="table" v-model="filteredPeople" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <md-icon class="md-size-2x icon">supervisor_account</md-icon>
          <h1 class="md-title">People</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search" v-model="search" />
        </md-field>
      </md-table-toolbar>
      <h2 class="error md-subheader">{{error}}</h2>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Phone Number" md-sort-by="phoneNumber">{{ item.phoneNumber }}</md-table-cell>
        <md-table-cell md-label="Category" md-sort-by="peopleCategory">{{ item.category }}</md-table-cell>
      </md-table-row>
    </md-table>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';
import * as R from 'ramda';
import * as Fuse from 'fuse.js';

import { RootState, Person } from '@/store/types';

export default Vue.extend({
  name: 'ManagePeople',
  data () {
    return {
      search: '',
      error: '',
    };
  },
  computed: {
    people (): Person[] {
      return this.$store.getters['people'];
    },
    filteredPeople (): Person[] {
      return this.search === ''
        ? this.people
        : this.fuse.search(this.search)
        ;
    },
    fuse (): Fuse {
      return new Fuse(this.people, {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'name',
          'category',
          'phoneNumber',
        ],
      });
    },
  },
});
</script>

<style lang='scss' scoped>
@import 'src/styles.scss';
.md-field {
  max-width: 300px;
}

.md-title {
  text-align: left;
  font-size: 2em;
  padding: 1rem 0rem;
  line-height: 3em;
  margin: 0px 10px !important;
}

.error {
  text-align: center;
  margin: auto;
  color: red;
}

.table {
  padding: 0vh  2vw;
}

.icon {
  color: $icon-color !important;
}
</style>
