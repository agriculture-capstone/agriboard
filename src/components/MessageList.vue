<template>
    <ul>
        <li v-for="message in messages" v-bind:key="message">
            {{ message }}
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'list',
  props: ['messages']
});
</script>
