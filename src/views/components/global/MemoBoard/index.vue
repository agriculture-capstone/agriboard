<template>
  <div class="MemoBoard">
    <h1>Memos</h1>
    <div class="memo-input">
      <md-field>
        <md-input placeholder="Your Memo for Others"/>
      </md-field>
      <md-button class="md-icon-button">
        <md-icon>send</md-icon>
      </md-button>
    </div>
    <div v-for="memo in memos">
      <md-card>
        <md-card-header>
          <div class="md-title">{{ memo.author }}</div>
        </md-card-header>
        <md-card-content>
          {{ memo.message }}
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

const name = 'memoboard';

interface Memo {
  author: string;
  message: string;
}

export default Vue.component(name, {
  name,
  computed: {
    memos (): Memo[] {
      return [
        {
          author: 'Enoch Tsang',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.',
        },
        {
          author: 'Billy Bob',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.',
        },
        {
          author: 'James Inglis',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.',
        },
      ];
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.MemoBoard {
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  width: 700px;
}

.md-icon {
  margin-left: 5px;
}

.md-button {
  margin-top: 16px;
}

.memo-input {
  width: 600px;
  display: flex;
}

.md-card {
  margin: 0.5em;
  width: 550px;
}
</style>
