<template>
  <md-toolbar id="toolbar">
    <md-button class="md-icon-button left-button" @click="onLeftButtonClick">
      <md-icon class="left-icon">{{leftIcon}}</md-icon>
    </md-button>
    <h3 class="md-title">{{title}}</h3>
    <div class="md-toolbar-section-end right-buttons" v-for="rightButton in rightButtons" :key="rightButton.name">
      <md-button v-if="rightButton.icon" class="md-icon-button right-button icon-button" @click="onRightButtonClicked(rightButton)">
        <md-icon>{{rightButton.icon}}</md-icon>
      </md-button>
      <md-button class="right-button text-button" @click="onRightButtonClicked(rightButton)" v-else>
        {{rightButton.name}}
      </md-button>
    </div>
  </md-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';

import { State } from '@/store/types';
import { MutationTypes as AppMutations, SetDrawerShownPayload } from '@/store/modules/app/types';
import Icon from '@/models/icons';
import { RightButton } from '@/models/toolbar';

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

    rightButtons(): RightButton[] {
      return this.$store.state.toolbar.rightButtons;
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
     * Handle one of the right buttons being clicked
     *
     * @param rightButton - Definition for right button
     */
    onRightButtonClicked(rightButton: RightButton) {
      if (rightButton.type === 'mutation') {
        this.$store.commit(rightButton.mutation);
      } else if (rightButton.type === 'action') {
        this.$store.dispatch(rightButton.action);
      } else {
        throw new Error('Invalid right button state');
      }
    },

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
