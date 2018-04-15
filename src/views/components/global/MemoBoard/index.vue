<template>
  <div class="MemoBoard">
    <h1>Memos</h1>
    <div class="memo-input" v-if="this.$store.state.user.type === 'admins'">
      <md-field>
        <md-input v-model="newMemoMessage" placeholder="Your Memo for Others"/>
      </md-field>
      <md-button class="md-icon-button" @click="dispatchNewMemo">
        <md-icon>send</md-icon>
      </md-button>
    </div>
    <div v-for="memo in memos" :key="memo.uuid">
      <md-card>
        <md-card-header>
          <div class="md-title">{{ memo.author }}</div>
        </md-card-header>
        <md-card-content>
          {{ memo.message }}
          <p class="memo-timestamp"> {{ toLocalDate(memo.datePosted) }}</p>
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
      }).filter((m: any) => m.message !== 'Hi');
    },
  },
  methods: {
    toLocalDate (date: string | Date) {
      return (date instanceof Date) ? date.toLocaleString() : new Date(date).toLocaleString();
    },
    dispatchNewMemo() {
      const newMemo : Memo = {
        authorUuid: this.$store.state.user.uuid,
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
  margin-bottom: 15px;
  width: 640px;
  overflow-x: hidden;

  .md-card-content {
    word-wrap: break-word;
  }
}

.memo-timestamp {
  font-style: italic;
  text-align: right;
}
</style>
