<template>
  <div>
    <md-toolbar>
      <md-button class="md-icon-button">
        <md-icon>{{leftIcon}}</md-icon>
      </md-button>
      <h3 class="md-title" style="flex: 1">{{title}}</h3>
      <md-button class="md-icon-button">
        <md-icon>more_vert</md-icon>
      </md-button>
    </md-toolbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapMutations, mapState } from 'vuex';

import { State } from '@/vuex/types';
import { MutationTypes as AppMutations } from '@/vuex/modules/app/types';
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
      AppMutations.SET_DRAWER_OPEN,
    ]),
  },
});
</script>

