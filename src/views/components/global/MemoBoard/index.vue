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
          <p class="memo-timestamp"> {{ memo.timestamp }}</p>
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
  timestamp: string;
}

export default Vue.component(name, {
  name,
  computed: {
    memos (): Memo[] {
      return [
        {
          author: 'Enoch Tsang',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.',
          timestamp: 'Thu, 05 Apr 2018 01:49:09 GMT',
        },
        {
          author: 'Billy Bob',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.',
          timestamp: 'Thu, 05 Apr 2018 01:49:09 GMT',
        },
        {
          author: 'James Inglis',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non.',
          timestamp: 'Thu, 05 Apr 2018 01:49:09 GMT',
        },
      ];
    },
  },
});
</script>

<style lang="scss" scoped>
.MemoBoard {
  max-width: 90vw;
  width: 44rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  max-width: 90vw;
  width: 42rem;
}

.md-icon {
  margin-left: 5px;
}

.md-button {
  margin-top: 16px;
}

.memo-input {
  max-width: 90vw;
  width: 40rem;
  display: flex;
}

.md-card {
  max-width: 90vw;
  margin-bottom: 1em;
  width: 38rem;
}

.memo-timestamp {
  font-style: italic;
  text-align: right;
}
</style>
