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
      <div>
        <md-button @click="showAddDialog = true" class="md-fab md-primary md-fab-bottom-right md-fixed add-user-button">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Phone Number" md-sort-by="phoneNumber">{{ item.phoneNumber }}</md-table-cell>
        <md-table-cell md-label="Category" md-sort-by="peopleCategory">{{ item.peopleCategory }}</md-table-cell>
        <md-table-cell md-label="Last Modified" md-sort-by="lastModified">{{ item.lastModified }}</md-table-cell>
      </md-table-row>
    </md-table>
    
    <div class="dialog-wrapper">
      <md-dialog :md-active.sync="showAddDialog">
        <md-dialog-title>Create New User</md-dialog-title>
            
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>First Name</label>
              <md-input v-model="form.firstName" name="first-name" id="first-name" autocomplete="given-name" />
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="form.lastName" name="last-name" id="last-name" autocomplete="last-name" />
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>Phone Number</label>
              <md-input v-model="form.phoneNumber" name="phone-number" id="phone-number" autocomplete="phone-number" />
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field>
              <label>Email</label>
              <md-input v-model="form.email" name="email" id="email" autocomplete="email" />
            </md-field>
          </div>
        </div>

        <div class="md-layout md-gutter">
          <md-field>
            <md-select v-model="form.type" name="user-type" id="user-type" placeholder="User Type">
              <md-option value="farmer">Farmer</md-option>
              <md-option value="trader">Trader</md-option>
              <md-option value="admin">Admin</md-option>
            </md-select>
          </md-field>
        </div>

        <md-dialog-actions>
          <md-button class="md-info" @click="showAddDialog = false">Cancel</md-button>
          <md-button class="md-primary" @click="showAddDialog = false">Create</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
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
      showAddDialog: false,
      form: {
        type: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
      },
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

.md-dialog {
  // max-width: 768px;
  width: 768px;  
}

.card-content {
  width: 768px;
}

.md-layout-item {
  &:after {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.error {
  text-align: center;
  margin: auto;
  color: red;
}
</style>
