<template>
  <div class='ManagePeople'>
    <div class="add-button">
      <md-button 
        @click="onAddClick" 
        class="md-fab md-primary md-fab-bottom-right md-fixed add-user-button"
        v-if="this.$store.state.user.type === 'admins'"
      >
        <md-icon>add</md-icon>
      </md-button>
    </div>
    <md-table class="table" v-model="filteredPeople" md-sort="name" md-sort-order="asc" md-card @md-selected="onSelect">
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

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" md-auto-select>
        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Phone Number" md-sort-by="phoneNumber">{{ item.phoneNumber }}</md-table-cell>
        <md-table-cell md-label="Category" md-sort-by="category">{{ item.category }}</md-table-cell>
      </md-table-row>
    </md-table>

    <div class="create-dialog-wrapper">
      <md-dialog v-if="form" :md-active.sync="showAddDialog">
        <md-dialog-title>Create New User</md-dialog-title>
        
        <md-dialog-content>
          <div class="md-gutter">
            <div class="md-layout-item md-small-size-100">
              <h3 class="md-subheading"><b>Category</b></h3>
              <md-radio v-model="form.category" value="farmer">Farmer</md-radio>
              <md-radio v-model="form.category" value="trader">Trader</md-radio>
              <md-radio v-model="form.category" value="admin">Admin</md-radio>
              <md-radio v-model="form.category" value="monitor">Monitor</md-radio>      
            </div>
          </div>

          <div class="md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>First Name</label>
                <md-input v-model="form.firstName" v-validate="'required'" type="text" name="first-name" id="first-name" autocomplete="given-name" />
                <span v-show="errors.has('first-name')" class="help is-danger">{{ errors.first('first-name') }}</span>
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
                <md-input v-model="form.lastName" v-validate="'required'" type="text" name="last-name" id="last-name" autocomplete="last-name" />
                <span v-show="errors.has('last-name')" class="help is-danger">{{ errors.first('last-name') }}</span>
              </md-field>
            </div>
          </div>

          <div class="md-gutter" v-if="form.category == 'admin' || form.category == 'monitor' || form.category == 'trader'">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Username</label>
                <md-input v-model="form.username" v-validate="'required'" type="text" name="username" id="username" autocomplete="username" />
                <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>     
              </md-field>
              <md-field>
                <label>Password</label>
                <md-input v-model="form.password" v-validate="'required'" type="password" name="password"></md-input>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
              </md-field>
            </div>
          </div>

          <div class="md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Phone Number</label>
                <md-input v-model="form.phoneNumber" v-validate="'required'" type="text" name="phone-number" id="phone-number" autocomplete="phone-number" />
                <span v-show="errors.has('phone-number')" class="help is-danger">{{ errors.first('phone-number') }}</span>                
              </md-field>
            </div>
          </div>

          <div class="md-gutter" v-if="form.category == 'farmer'">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Notes</label>
                <md-input v-model="form.notes" name="notes" id="notes" autocomplete="notes" />
              </md-field>
            </div>
          </div>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="onCancelCreate">Cancel</md-button>
          <md-button class="md-primary" @click="onSaveCreate">Create</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
    
    <div class="view-dialog-wrapper">
      <md-dialog v-if="selectedRow" :md-active.sync="showViewDialog">
        <md-dialog-title>{{ selectedRow.name }}</md-dialog-title>
          <md-dialog-content>
            <div class="md-subhead">
              <md-icon>access_time</md-icon>
              <span>Last Modified: {{ selectedRow.lastModified }}</span>
            </div>
            <h3><b>Phone Number</b></h3>
            {{ selectedRow.phoneNumber }}
            <h3><b>Category</b></h3>
            {{ selectedRow.category }}
            <h3 v-if="selectedRow.category === 'farmer' && selectedRow.notes"><b>Notes</b></h3>
            {{ selectedRow.notes }}
          </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="onCancelView">Cancel</md-button>
          <md-button class="md-primary" @click="onEditClick">Edit</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>

    <div class="edit-dialog-wrapper">
      <md-dialog v-if="selectedRow" :md-active.sync="showEditDialog">
        <md-dialog-title>Edit User</md-dialog-title>
        <md-dialog-content>

          <div class="md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>First Name</label>
                <md-input v-model="selectedRow.firstName" v-validate="'required'" type="text" name="first-name" id="first-name" autocomplete="given-name" />
                <span v-show="errors.has('first-name')" class="help is-danger">{{ errors.first('first-name') }}</span>
              </md-field>
            </div>
          </div>

          <div class="md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Middle Name</label>
                <md-input v-model="selectedRow.middleName" name="middle-name" id="middle-name" autocomplete="middle-name" />
              </md-field>
            </div>
          </div>

          <div class="md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Last Name</label>
                <md-input v-model="selectedRow.lastName" v-validate="'required'" type="text" name="last-name" id="last-name" autocomplete="last-name" />
                <span v-show="errors.has('last-name')" class="help is-danger">{{ errors.first('last-name') }}</span>
              </md-field>
            </div>
          </div>

          <div class="md-gutter" v-if="selectedRow.category == 'admin' || selectedRow.category == 'monitor' || selectedRow.category == 'trader'">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Username</label>
                <md-input v-model="selectedRow.username" v-validate="'required'" type="text" name="username" id="username" autocomplete="username" />
                <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>     
              </md-field>
              <md-field>
                <label>Password</label>
                <md-input v-model="selectedRow.password" v-validate="'required'" type="password" name="password"></md-input>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
              </md-field>
            </div>
          </div>

          <div class="md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Phone Number</label>
                <md-input v-model="selectedRow.phoneNumber" v-validate="'required'" type="text" name="phone-number" id="phone-number" autocomplete="phone-number" />
                <span v-show="errors.has('phone-number')" class="help is-danger">{{ errors.first('phone-number') }}</span>                
              </md-field>
            </div>
          </div>

          <div class="md-gutter" v-if="selectedRow.category == 'farmer'">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Notes</label>
                <md-input v-model="selectedRow.notes" name="notes" id="notes" autocomplete="notes" />
              </md-field>
            </div>
          </div>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="onCancelEdit">Cancel</md-button>
          <md-button class="md-primary" @click="onSaveEdit">Save</md-button>
        </md-dialog-actions>
      </md-dialog>

    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { mapState, mapGetters } from 'vuex';
import * as R from 'ramda';
import * as Bcrypt from 'bcryptjs';
import * as Fuse from 'fuse.js';
import { RootState, Person } from '@/store/types';

const saltRounds = 5;

export default Vue.extend({
  name: 'ManagePeople',
  data() {
    return {
      search: '',
      error: '',
      selectedRow: {},
      showAddDialog: false,
      showViewDialog: false,
      showEditDialog: false,
      form: {
        category: '',
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        password: '',
        phoneNumber: '',
        paymentFrequency: '',
        notes: '',
      },
    };
  },
  computed: {
    people(): Person[] {
      return this.$store.getters['people'];
    },
    filteredPeople(): Person[] {
      return this.search === '' ? this.people : this.fuse.search(this.search);
    },
    fuse(): Fuse {
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
  methods: {
    onSelect(item: any) {
      this.selectedRow = item;
      this.showViewDialog = true;
    },
    onAddClick() {
      this.showAddDialog = true;
    },
    onCancelCreate() {
      this.showAddDialog = false;
      this.resetForm();
    },
    onSaveCreate() {
      this.showAddDialog = false;
      const newPerson = this.form;
      this.createPerson(newPerson);
      this.resetForm();
    },
    onCancelView() {
      this.showViewDialog = false;
      this.selectedRow = {};
    },
    onEditClick() {
      this.showViewDialog = false;
      this.showEditDialog = true;
    },
    onCancelEdit() {
      this.showEditDialog = false;
      this.selectedRow = {};
    },
    onSaveEdit() {
      this.showEditDialog = false;
      const newPerson = this.selectedRow;
      this.updatePerson(newPerson);
      this.selectedRow = {};
    },
    createPerson(data: any) {
      let path = '';
      let newPerson = {};
      switch (data.category) {
        case 'admin':
        case 'monitor':
        case 'trader':
          newPerson = {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            phoneCountry: '',
            phoneArea: '',
            phoneNumber: data.phoneNumber,
            companyName: '',
            username: data.username,
            hash: Bcrypt.hashSync(data.password, saltRounds),
          };
          break;
        case 'farmer':
          newPerson = {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            phoneCountry: '',
            phoneArea: '',
            phoneNumber: data.phoneNumber,
            notes: data.notes,
            paymentFrequency: 'monthly',
            companyName: 'boresha',
          };
          break;
      }
      path = `${data.category}/createRow`;
      this.$store.dispatch(path, { row: newPerson });
    },
    updatePerson(data: any) {
      let path = '';
      let updatedPerson = {};
      switch (data.category) {
        case 'admin':
        case 'monitor':
        case 'trader':
          updatedPerson = {
            uuid: data.uuid,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            phoneCountry: '',
            phoneArea: '',
            phoneNumber: data.phoneNumber,
            companyName: '',
            username: data.username,
            hash: Bcrypt.hashSync(data.password, saltRounds),
          };
          break;
        case 'farmer':
          updatedPerson = {
            uuid: data.uuid,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            phoneCountry: '',
            phoneArea: '',
            phoneNumber: data.phoneNumber,
            notes: data.notes,
            paymentFrequency: 'monthly',
            companyName: 'boresha',
          };
          break;
      }
      path = `${data.category}/updateRow`;
      this.$store.dispatch(path, { row: updatedPerson });
    },
    resetForm() {
      this.form = {
        category: '',
        firstName: '',
        middleName: '',
        lastName: '',
        username: '',
        password: '',
        phoneNumber: '',
        paymentFrequency: '',
        notes: '',
      };
    },
  },
});
</script>

<style lang='scss' scoped>
@import "src/styles.scss";
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

.md-dialog-title {
  margin-bottom: 0;
  padding: 24px;
  line-height: 2em;
}

.md-dialog-content {
  display: inline-block;
}

.md-layout-item {
  &:after {
    width: 100%;
    height: 100%;
    display: block;
  }
}

.md-dialog {
  min-width: 443px;
}

.error {
  text-align: center;
  margin: auto;
  color: red;
}

.is-danger {
  margin: auto;
  color: red;
}

.table {
  padding: 0vh 2vw;
}

.icon {
  color: $icon-color !important;
}
</style>
