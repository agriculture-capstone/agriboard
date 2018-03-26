<template>
  <div class='ManagePeople'>
    <md-table class="table" v-model="searched" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <md-icon class="md-size-2x icon">supervisor_account</md-icon>
          <h1 class="md-title">People</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search" v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>
      <h2 class="error md-subheader">{{error}}</h2>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Phone Number" md-sort-by="phoneNumber">{{ item.phoneNumber }}</md-table-cell>
        <md-table-cell md-label="Category" md-sort-by="peopleCategory">{{ item.peopleCategory }}</md-table-cell>
      </md-table-row>
    </md-table>

  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import axios from 'axios';

interface Person {
  name: string;
  phoneNumber: string;
  peopleCategory: string;
  lastModified: string;
}

const toLower = function (text: string) {
  return text.toString().toLowerCase();
};

const searchByName = function (items: Person[], term: string) {
  if (term) {
    return items.filter(function (item) {
      return toLower(item.name).includes(toLower(term));
    });
  }

  return items;
};

export default Vue.extend({
  name: 'ManagePeople',
  methods: {
    searchOnTable: function searchOnTable() {
      this.searched = searchByName(this.people, this.search);
    },
  },
  data () {
    return {
      search: null,
      searched: [],
      error: '',
    };
  },
  computed: {
    people(): any {
      const people = this.$store.state.farmer.rows.map((row: any) => {
        // construct full name
        const fullName: string =
          `${row.firstName || ''} ${row.middleName || ''} ${row.lastName || ''}`;

        // construct phone number
        let fullPhone: string = '';
        if (row.phoneCountry) {
          fullPhone += `+${row.phoneCountry}`;
        }
        if (row.phoneArea) {
          fullPhone += ` (${row.phoneArea})`;
        }
        if (row.phoneNumber) {
          const AREA_SIZE = 3;
          fullPhone += ` ${row.phoneNumber.slice(0, AREA_SIZE)}-${row.phoneNumber.slice(AREA_SIZE)}`;
        }

        return {
          ...row, 
          name: fullName,
          phoneNumber: fullPhone,
        };
      });
      this.searched = people;
      return people;
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
