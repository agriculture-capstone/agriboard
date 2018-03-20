<template>
  <div class='ManagePeople'>
    <div class="add-button">
      <md-button @click="showAddDialog = true" class="md-fab md-primary md-fab-bottom-right md-fixed add-user-button">
        <md-icon>add</md-icon>
      </md-button>
    </div>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card @md-selected="onSelect">
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">People</h1>
        </div>
        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search" v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <h2 class="error md-subheader">{{error}}</h2>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" md-auto-select>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Phone Number" md-sort-by="phoneNumber">{{ item.phoneNumber }}</md-table-cell>
        <md-table-cell md-label="Category" md-sort-by="peopleCategory">{{ item.peopleCategory }}</md-table-cell>
        <md-table-cell md-label="Last Modified" md-sort-by="lastModified">{{ item.lastModified }}</md-table-cell>
      </md-table-row>
    </md-table>

    <div class="create-dialog-wrapper">
      <md-dialog :md-active.sync="showAddDialog">
        <md-dialog-title>Create New User</md-dialog-title>
        <md-dialog-content>
          <div class="md-layout-item md-size-100 md-small-size-100">
              
              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>First Name</label>
                    <md-input v-model="form.firstName" name="first-name" id="first-name" autocomplete="given-name" />
                  </md-field>
                </div>
              </div>

              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>Middle Name</label>
                    <md-input v-model="form.middleName" name="middle-name" id="middle-name" autocomplete="middle-name" />
                  </md-field>
                </div>
              </div>

              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>Last Name</label>
                    <md-input v-model="form.lastName" name="last-name" id="last-name" autocomplete="last-name" />
                  </md-field>
                </div>
              </div>

              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>Phone Number</label>
                    <md-input v-model="form.phoneNumber" name="phone-number" id="phone-number" autocomplete="phone-number" />
                  </md-field>
                </div>
              </div>

              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <h3 class="md-subheading"><b>Category</b></h3>
                  <md-radio v-model="form.peopleCategory" value="farmers">Farmer</md-radio>
                  <md-radio v-model="form.peopleCategory" value="traders">Trader</md-radio>
                  <md-radio v-model="form.peopleCategory" value="admins">Admin</md-radio>
                </div>
              </div>

              <div class="md-gutter" v-if="form.peopleCategory == 'farmers'">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>Notes</label>
                    <md-input v-model="form.notes" name="notes" id="notes" autocomplete="notes" />
                  </md-field>
                </div>
              </div>
          </div>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showAddDialog = false">Cancel</md-button>
          <md-button class="md-primary" @click="showAddDialog = false">Create</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
    
    <div class="view-dialog-wrapper">
      <md-dialog :md-active.sync="showViewDialog">
        <md-dialog-title>User Details</md-dialog-title>
        <div class="md-layout md-size-100 md-small-size-100">
          <md-card-header class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <span class="md-headline">{{ selected.name }}</span>
            <div class="md-subhead">
              <md-icon>access_time</md-icon>
              <span>Last Modified: {{ selected.lastModified }}</span>
            </div>
          </md-card-header>
          <md-card-content class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
            <h3 class="md-subheading"><b>Phone Number</b></h3>
            {{ selected.phoneNumber }}
            <h3 class="md-subheading"><b>Category</b></h3>
            {{ selected.peopleCategory }}
          </md-card-content>
        </div>
        <md-dialog-actions>
          <md-button class="md-info" @click="showViewDialog = false">Cancel</md-button>
          <md-button class="md-primary" @click="showViewDialog = false, showEditDialog = true">Edit</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>

    <div class="edit-dialog-wrapper">
      <md-dialog :md-active.sync="showEditDialog">
        <md-dialog-title>Edit User</md-dialog-title>
        <md-dialog-content>
          <div class="md-layout md-size-100 md-small-size-100">
            <md-card-content class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">

              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>First Name</label>
                    <md-input v-model="selected.firstName" name="first-name" id="first-name" autocomplete="given-name" />
                  </md-field>
                </div>
              </div>

              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>Middle Name</label>
                    <md-input v-model="selected.middleName" name="middle-name" id="middle-name" autocomplete="middle-name" />
                  </md-field>
                </div>
              </div>

              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>Last Name</label>
                    <md-input v-model="selected.lastName" name="last-name" id="last-name" autocomplete="last-name" />
                  </md-field>
                </div>
              </div>

              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field>
                    <label>Phone Number</label>
                    <md-input v-model="selected.phoneNumber" name="phone-number" id="phone-number" autocomplete="phone-number" />
                  </md-field>
                </div>
              </div>
              
              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <h3 class="md-subheading"><b>Category</b></h3>
                  <md-radio v-model="selected.peopleCategory" value="farmers">Farmer</md-radio>
                  <md-radio v-model="selected.peopleCategory" value="traders">Trader</md-radio>
                  <md-radio v-model="selected.peopleCategory" value="admins">Admin</md-radio>
                </div>
              </div>

              <div class="md-gutter" v-if="selected.peopleCategory == 'farmers'">
                  <div class="md-layout-item md-small-size-100">
                    <md-field>
                      <label>Notes</label>
                      <md-input v-model="selected.notes" name="notes" id="notes" autocomplete="notes" />
                    </md-field>
                  </div>
                </div>

              <div class="md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <div class="md-subhead">
                    <md-icon>access_time</md-icon>
                    <span>Last Modified: {{ selected.lastModified }}</span>
                  </div>
                </div>
              </div>

            </md-card-content>
          </div>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-info" @click="showEditDialog = false">Cancel</md-button>
          <md-button class="md-primary" @click="showEditDialog = false">Save</md-button>
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
    onSelect: function (item: any) {
      this.selected = item;
      this.showViewDialog = true;
    }
    
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
              firstName: person.firstName,
              middleName: person.middleName,
              lastName: person.lastName,
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
      selected: {},
      showAddDialog: false,
      showViewDialog: false,
      showEditDialog: false,
      form: {
        peopleCategory: '',
        firstName: '',
        middleName: '',
        lastName: '',
        phoneNumber: '',
        notes: '',
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
  // width: 768px;
  padding-left: 3%;
  padding-right: 3%;
  // display: inline-block;
}

// .md-dialog-content {
//   display: inline-block;
// }

.md-layout-item {
  &:after {
    width: 100%;
    height: 100%;
    display: block;
  }
}

// .add-button {
//   position:relative;
//   z-index:1000;
// }

.error {
  text-align: center;
  margin: auto;
  color: red;
}
</style>
