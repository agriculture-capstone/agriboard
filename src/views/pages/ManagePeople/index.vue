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
        <md-table-cell md-label="Category" md-sort-by="peopleCategory">{{ item.peopleCategory }}</md-table-cell>
        <md-table-cell md-label="Last Modified" md-sort-by="lastModified">{{ item.lastModified }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
const axios = require('axios');

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
  created: async function created() {
    const self = this;

    // get people types
    const personCategories: any[] = [];
    await axios.get('http://172.17.0.2:9090/people/categories')
      .then(async function (response: any) {
        response.data.forEach(function (category: any) {
          personCategories.push(category.name);
        });
      })
      .catch(async function (error: any) {
        console.log(error.message);
      });

    // get all people
    personCategories.forEach(async function (category: string) {
      // get all people of particular category
      axios.get('http://172.17.0.2:9090/people/' + category)
        .then(async function (response: any) {
          // construct each person
          response.data.forEach(function (person: any) {
            // construct full name
            const fullName: string =
              `${person.firstName} ${person.middleName} ${person.lastName}`;

            // construct phone number
            let fullPhone: string = '';
            if (person.phoneCountry) {
              fullPhone += `+${person.phoneCountry}`;
            }
            if (person.phoneArea) {
              fullPhone += ` (${person.phoneArea})`;
            }
            if (person.phoneNumber) {
              fullPhone += ` ${person.phoneNumber.slice(0, 3)}-${person.phoneNumber.slice(3)}`;
            }

            self.people.push({
              name: fullName,
              phoneNumber: fullPhone,
              peopleCategory: person.peopleCategory,
              lastModified: new Date(person.lastModified).toUTCString(),
            });
          });
        })
        .catch(async function (error: any) {
          console.log(error.message);
        });
    });

    // update list
    self.searched = self.people;
  },
  data () {
    return {
      search: null,
      searched: [],
      people: [],
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
