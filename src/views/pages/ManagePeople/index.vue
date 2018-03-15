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
    
    <md-dialog :md-active.sync="showAddDialog">
      <md-dialog-title>Create New User</md-dialog-title>
      <!-- ---------------- -->
       <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-layout-item md-size-50 md-small-size-100">

          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('firstName')">
                  <label for="first-name">First Name</label>
                  <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.firstName" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
                  <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid first name</span>
                </md-field>
              </div>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-card-actions>
            <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
          </md-card-actions>
        </md-card>

        <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
      </form>
      <!-- ---------------- -->
      <md-dialog-actions>
        <md-button class="md-primary" @click="showAddDialog = false">Cancel</md-button>
        <md-button class="md-primary" @click="showAddDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

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
    getValidationClass: function (fieldName: any): any {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    addUser: function () {
      
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
