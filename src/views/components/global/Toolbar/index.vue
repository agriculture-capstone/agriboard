<template>
  <md-toolbar id="toolbar">
    <md-button class="md-icon-button" @click="onLeftButtonClick">
      <md-icon>{{leftIcon}}</md-icon>
    </md-button>
    <h3 class="md-title">{{title}}</h3>
    <div class="md-toolbar-section-end">
      <md-button class="md-icon-button">
        <md-icon>more_vert</md-icon>
      </md-button>
    </div>
  </md-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';

import { State } from '@/store/types';
import { MutationTypes as AppMutations, SetDrawerShownPayload } from '@/store/modules/app/types';
import Icon from '@/models/icons';

const name = 'toolbar';

export default Vue.component(name, {
  name,

  computed: {

    leftIcon(): Icon {
      return (this.$store.state.app.drawerLocked) ? Icon.ARROW_BACK : Icon.MENU;
    },

    title(): string {
      return this.$store.state.app.title;
    },

  },

  methods: {

    /*------------------- Mutations -------------------*/

    setDrawerShown(payload: SetDrawerShownPayload) {
      this.$store.commit(AppMutations.SET_DRAWER_SHOWN, payload);
    },

    /*-------------------- Actions --------------------*/

    /*-------------------- Methods --------------------*/

    /**
     * Handle clicks to the left button (menu|back) based on icon type
    */
    onLeftButtonClick() {
      switch (this.leftIcon) {
        case Icon.ARROW_BACK:
          this.handleBackButtonClicked();
          break;

        case Icon.MENU:
          this.handleMenuButtonClicked();
          break;

        default:
          throw new Error(`No such button: ${this.leftIcon}`);
      }
    },

    /**
     * Handle menu button being clicked
     *
     * Opens the drawer
     */
    handleMenuButtonClicked() {
      this.setDrawerShown({ open: true });
    },

    /**
     * Handle back button being clicked
     *
     * Use the router history API to go back to previous route
     */
    handleBackButtonClicked() {
      this.$router.back();
    },
  },
});
</script>
