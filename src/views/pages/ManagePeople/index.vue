<template>
  <div class='ManagePeople'>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">People</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search" v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Phone Number" md-sort-by="phoneNumber">{{ item.phoneNumber }}</md-table-cell>
        <md-table-cell md-label="Category" md-sort-by="category">{{ item.category }}</md-table-cell>
        <md-table-cell md-label="Last Modified" md-sort-by="lastModified">{{ item.lastModified }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

interface Person {
  name: string;
  phoneNumber: string;
  category: string;
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
  created: function created() {
    this.searched = this.people;
  },
  data () {
    return {
      search: null,
      searched: [],
      people: [
        {
          name: 'Shawna Dubbin',
          phoneNumber: '(029) 263-8652',
          category: 'Farmer',
          lastModified: 'January 2, 2018 02:25:51.098',
        },
        {
          name: 'Odette Demageard',
          phoneNumber: '(029) 019-2534',
          category: 'Farmer',
          lastModified: 'September 15, 2017 03:25:50.345',
        },
        {
          name: 'Vera Taleworth',
          phoneNumber: '(234) 023-9487',
          category: 'Farmer',
          lastModified: 'January 24, 2017 03:25:50.464',
        },
        {
          name: 'Lonnie Izkovitz',
          phoneNumber: '(029) 209-3834',
          category: 'Trader',
          lastModified: 'February 26, 2017 03:25:50.098',
        },
        {
          name: 'Thatcher Stave',
          phoneNumber: '(029) 263-7487',
          category: 'Trader',
          lastModified: 'November 25, 2017 03:25:50.465',
        },
        {
          name: 'Karim Chipping',
          phoneNumber: '(029) 263-7487',
          category: 'Trader',
          lastModified: 'January 6, 2018 08:23:50.198',
        },
        {
          name: 'Helge Holyard',
          phoneNumber: '(029) 263-7487',
          category: 'Farmer',
          lastModified: 'February 27, 2017 08:55:20.375',
        },
        {
          name: 'Rod Titterton',
          phoneNumber: '(122) 029-3841',
          category: 'Trader',
          lastModified: 'August 18, 2017 23:55:20.953',
        },
        {
          name: 'Gawen Applewhite',
          phoneNumber: '(028) 123-4209',
          category: 'Farmer',
          lastModified: 'May 1, 2017 23:23:20.123',
        },
        {
          name: 'Nero Mulgrew',
          phoneNumber: '(028) 123-4209',
          category: 'Farmer',
          lastModified: 'January 18, 2018 23:23:20.364',
        },
        {
          name: 'Cybill Rimington',
          phoneNumber: '(028) 123-4567',
          category: 'Farmer',
          lastModified: 'September 23, 2017 00:57:43.954',
        },
      ],
    };
  },
});
</script>

<style lang='scss' scoped>
.md-field {
  max-width: 300px;
}

.md-title {
  text-align: left;
  font-size: 2em;
  padding: 1rem;
  line-height: 3em;
}

.md-content {
  height: 1vh;
}

</style>