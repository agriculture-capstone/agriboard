<template>
  <div class="MemoBoard">
    <h1>Memos</h1>
    <div class="memo-input">
      <md-field>
        <md-input v-model="newMemoMessage" placeholder="Your Memo for Others"/>
      </md-field>
      <md-button class="md-icon-button" @click="dispatchNewMemo">
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
          <p class="memo-timestamp"> {{ memo.datePosted }}</p>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Memo } from '@/store/types';

const name = 'memoboard';

export default Vue.component(name, {
  name,
  data() {
    return {
      newMemoMessage: '',
    };
  },
  computed: {
    memos (): Memo[] {
      return this.$store.state.memo.rows.sort((a: Memo, b: Memo) => {
        const first = new Date(a.datePosted);
        const second = new Date(b.datePosted);
        return second.getTime() - first.getTime();
      });
    },
  },
  methods: {
    dispatchNewMemo() {
      const newMemo : Memo = {
        authorUuid: '98f0f127-6c7f-4641-b464-447e417318d8',
        message: this.newMemoMessage,
        datePosted: new Date().toISOString(),
      };

      this.newMemoMessage = '';
      this.$store.dispatch('memo/createRow', { row: newMemo });
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
