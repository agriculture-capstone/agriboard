<template>
  <div class='ManagePeople'>
    <div class="add-button">
      <md-button @click="showAddDialog = true" class="md-fab md-primary md-fab-bottom-right md-fixed add-user-button">
        <md-icon>add</md-icon>
      </md-button>
    </div>
    <md-table class="table" v-model="filteredPeople" md-sort="name" md-sort-order="asc" md-card md-fixed-header @md-selected="onSelect">
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
        <md-table-cell md-label="Category" md-sort-by="peopleCategory">{{ item.peopleCategory }}</md-table-cell>
      </md-table-row>
    </md-table>

    <div class="create-dialog-wrapper">
      <md-dialog :md-active.sync="showAddDialog">
        <md-dialog-title>Create New User</md-dialog-title>
        
        <md-dialog-content>
          <div class="md-gutter">
            <div class="md-layout-item md-small-size-100">
              <h3 class="md-subheading"><b>Category</b></h3>
              <md-radio v-model="form.peopleCategory" value="farmers">Farmer</md-radio>
              <md-radio v-model="form.peopleCategory" value="traders">Trader</md-radio>
              <md-radio v-model="form.peopleCategory" value="admins">Admin</md-radio>
              <md-radio v-model="form.peopleCategory" value="monitors">Monitor</md-radio>                 
            </div>
          </div>

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

          <div class="md-gutter" v-if="form.peopleCategory == 'admins' || form.peopleCategory == 'monitors'">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Username</label>
                <md-input v-model="form.username" name="username" id="username" autocomplete="username" />
              </md-field>
            </div>
          </div>

          <div class="md-gutter" v-if="form.peopleCategory == 'admins' || form.peopleCategory == 'monitors'">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Password</label>
                <md-input v-model="form.password" type="password"></md-input>
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

          <div class="md-gutter" v-if="form.peopleCategory == 'farmers'">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Notes</label>
                <md-input v-model="form.notes" name="notes" id="notes" autocomplete="notes" />
              </md-field>
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
      <md-dialog :md-active.sync="showViewDialog" @md-closed="onViewClose">
        <md-dialog-title>{{ selected.name }}</md-dialog-title>
          <md-dialog-content>
            <div class="md-subhead">
              <md-icon>access_time</md-icon>
              <span>Last Modified: {{ selected.lastModified }}</span>
            </div>
            <h3><b>Phone Number</b></h3>
            {{ selected.phoneNumber }}
            <h3><b>Category</b></h3>
            {{ selected.peopleCategory }}
            <h3 v-if="selected.peopleCategory === 'farmers' && selected.notes"><b>Notes</b></h3>
            {{ selected.notes }}
          </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="onDialogCancel">Cancel</md-button>
          <md-button class="md-primary" @click="showViewDialog = false, showEditDialog = true">Edit</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>

    <div class="edit-dialog-wrapper">
      <md-dialog :md-active.sync="showEditDialog">
        <md-dialog-title>Edit User</md-dialog-title>
        <md-dialog-content>
          <div class="md-gutter">
            <div class="md-layout-item md-small-size-100">
              <h3 class="md-subheading"><b>Category</b></h3>
              <md-radio v-model="selected.peopleCategory" value="farmers">Farmer</md-radio>
              <md-radio v-model="selected.peopleCategory" value="traders">Trader</md-radio>
              <md-radio v-model="selected.peopleCategory" value="admins">Admin</md-radio>
              <md-radio v-model="selected.peopleCategory" value="monitors">Monitor</md-radio>  
            </div>
          </div>

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

          <div class="md-gutter" v-if="selected.peopleCategory == 'admins' || selected.peopleCategory == 'monitors'">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Username</label>
                <md-input v-model="selected.username" name="username" id="username" autocomplete="username" />
              </md-field>
            </div>
          </div>

          <div class="md-gutter" v-if="selected.peopleCategory == 'admins' || selected.peopleCategory == 'monitors'">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label>Password</label>
                <md-input v-model="selected.password" type="password"></md-input>
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

          <div class="md-gutter" v-if="selected.peopleCategory == 'farmers'">
              <div class="md-layout-item md-small-size-100">
                <md-field>
                  <label>Notes</label>
                  <md-input v-model="selected.notes" name="notes" id="notes" autocomplete="notes" />
                </md-field>
              </div>
            </div>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showEditDialog = false">Cancel</md-button>
          <md-button class="md-primary" @click="showEditDialog = false">Save</md-button>
        </md-dialog-actions>
      </md-dialog>

    </div>
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
  data() {
    return {
      search: '',
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
        username: '',
        password: '',
        phoneNumber: '',
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
        threshold: 0.7,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['name', 'peopleCategory', 'phoneNumber'],
      });
    },
  },
  methods: {
    onSelect(item: any) {
      this.selected = item;
      this.showViewDialog = true;
    },
    onDialogCancel() {
      // this.selected = {};
      // this.showViewDialog = false;
    },
    onViewClose() {
      // this.selected = {};
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

.error {
  text-align: center;
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
