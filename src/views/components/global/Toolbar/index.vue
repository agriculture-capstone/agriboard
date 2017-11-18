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
import { mapMutations, mapState } from 'vuex';

import { State } from '@/store/types';
import { MutationTypes as AppMutations } from '@/store/modules/app/types';
import Icon from '@/models/icons';

const name = 'toolbar';

export default Vue.component(name, {
  name,

  computed: {
    ...mapState<State>({
      leftIcon: state => state.app.drawerLocked ? Icon.ARROW_BACK : Icon.MENU,

      title: state => state.app.title,
    }),
  },

  methods: {
    ...mapMutations([
      AppMutations.SET_DRAWER_SHOWN,
    ]),

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

    handleMenuButtonClicked() {
      this.setDrawerShown({ open: true });
    },

    handleBackButtonClicked() {
      this.$router.back();
    },
  },
});
</script>

<style lang="scss" scoped>


</style>

