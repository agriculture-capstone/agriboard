<template>
  <md-toolbar id="toolbar">
    <!-- Left Button -->
    <md-button class="md-icon-button left-button" @click="handleLeftButtonClicked">
      <md-icon class="left-icon">{{leftIcon}}</md-icon>
    </md-button>
    <!-- Title -->
    <h3 class="md-title">{{title}}</h3>
    <!-- Right Buttons -->
    <div class="md-toolbar-section-end right-buttons" v-for="rightButton in rightButtons" :key="rightButton.name">
      <md-button v-if="rightButton.icon" :class="generateRightIconButtonClasses(rightButton.name)" @click="onRightButtonClicked(rightButton)">
        <md-icon>{{rightButton.icon}}</md-icon>
      </md-button>
      <md-button :class="generateRightTextButtonClasses(rightButton.name)" @click="onRightButtonClicked(rightButton)" v-else>
        {{rightButton.name}}
      </md-button>
    </div>
  </md-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';

import { RootState } from '@/store/types';
import { MutationType as AppMutation, SetDrawerShownPayload } from '@/store/modules/drawer/types';
import Icon from '@/models/icons';
import { RightButton, RightButtonType } from '@/models/toolbar/rightButton';

const name = 'toolbar';

export default Vue.component(name, {
  name,

  computed: {

    leftIcon(): Icon {
      return (this.$store.state.drawer.drawerLocked) ? Icon.ARROW_BACK : Icon.MENU;
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
      this.$store.commit(AppMutation.SET_DRAWER_SHOWN, payload);
    },

    /*-------------------- Actions --------------------*/

    /*-------------------- Methods --------------------*/

    /**
     * Handle one of the right buttons being clicked
     *
     * @param rightButton - Definition for right button
     */
    onRightButtonClicked(rightButton: RightButton) {
      if (rightButton.type === RightButtonType.MUTATION) {
        this.$store.commit(rightButton.mutation);
      } else if (rightButton.type === RightButtonType.ACTION) {
        this.$store.dispatch(rightButton.action);
      } else {
        throw new Error('Invalid right button state');
      }
    },

    /**
     * Handle clicks to the left button (menu|back) based on icon type
    */
    handleLeftButtonClicked() {
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
     * Generate classes for a right icon button
     *
     * @param name - Name of button
     */
    generateRightIconButtonClasses(name: string) {
      return this.generateRightButtonClasses(name, 'md-icon-button', 'icon-button');
    },

    /**
     * Generate classes for a right text button
     *
     * @param name - Name of button
     */
    generateRightTextButtonClasses(name: string) {
      return this.generateRightButtonClasses(name, 'text-button');
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

    generateRightButtonClasses(name: string, ...extraClasses: string[]) {
      const classNames = [
        ...extraClasses,
        'right-button',
        `${name}-button`,
      ];

      return classNames.join(' ');
    },
  },
});
</script>
