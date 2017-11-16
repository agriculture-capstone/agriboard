<template>
  <div>
    <md-toolbar>
      <h3 class="md-title" style="flex: 1">{{title}}</h3>
      <md-button class="md-icon-button">
        <md-icon>more_vert</md-icon>
      </md-button>
    </md-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export enum NavType {
  MENU = 'menu',
  BACK = 'arrow_back',
}

const name = 'toolbar';

export default Vue.component(name, {
  name,

  props: {
    title: {
      required: true,
      type: String,
    },

    type: {
      required: false,
      default: NavType.MENU,
      validator(val: string) {
        return Object.keys(NavType).map(k => NavType[k as any]).some((navType) => {
          return val === navType;
        });
      },
    },
  },
});
</script>

