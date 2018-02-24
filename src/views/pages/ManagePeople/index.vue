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

      <h2 class="error md-subheader">{{error}}</h2>

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
  created: async function created() {
    // get people types
    const personCategories: any[] = [];
    await axios.get('https://boresha.live:19443/people/categories')
      .then((response: any) => {
        response.data.map((category: any) => {
          personCategories.push(category.name);
        });
      })
      .catch((error: any) => {
        console.log(error.message);
        this.error = error.message;
      });

    // get all people
    const allPeople: Promise<Person[]>[] = personCategories.map((category: string) => {
      // get all people of particular category
      return axios.get('https://boresha.live:19443/people/' + category)
        .then((response: any) => {
          // construct each person
          return response.data.map((person: any) => {
            // construct full name
            const fullName: string =
              `${person.firstName || ''} ${person.middleName || ''} ${person.lastName || ''}`;

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

            // construct person
            return {
              name: fullName,
              phoneNumber: fullPhone,
              peopleCategory: person.peopleCategory,
              lastModified: new Date(person.lastModified).toUTCString(),
            };
          });
        })
        .catch((error: any) => {
          console.log(error.message);
          this.error = error.message;
        });
    });

    const allPeopleFlat = (await Promise.all(allPeople)).reduce(function(prev: Person[], curr: Person[]) {
      return prev.concat(curr);
    });

    // update list
    this.people = allPeopleFlat;
    this.searched = this.people;
  },
  data () {
    return {
      search: null,
      searched: [],
      people: [],
      error: '',
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

.error {
  text-align: center;
  margin: auto;
  color: red;
}
</style>
