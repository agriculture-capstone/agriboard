<template>
  <div class="logo">
    <svg class="icon" viewBox="0 0 24 24" :style="[iconSize, fill]">
      <path class="icon-path" d="M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M19.5,9.5L21.46,12H17V9.5M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8Z" />
    </svg>
    <h1 class="md-title title" :style="[titleSize, titleSpacing, logoColor]">{{ computedTitle }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as R from 'ramda';

export default Vue.component('logo', {
  name: 'logo',

  props: {
    title: {
      type: String,
      required: false,
    },
    size: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: '#ffffff',
    },
  },

  data () {
    return {
      defaultTitle: 'Agriboard',
    };
  },

  computed: {
    computedTitle (): string {
      return this.title || this.defaultTitle;
    },
    titleSize (): any {
      return {
        fontSize: `${this.size}px`,
      };
    },
    iconSize (): any {
      return {
        height: `${this.size}px`,
        width: `${this.size}px`,
      };
    },
    titleSpacing (): any {
      const minSpacing = 2;
      const divideBy = 15;
      const spacing = R.max(
        minSpacing,
        R.pipe(
          R.divide(R.__, divideBy),
          Math.floor,
        )(this.size),
      );

      return {
        letterSpacing: `${spacing}px`,
      };
    },
    fill (): any {
      return {
        fill: this.color,
      };
    },
    logoColor (): any {
      return {
        color: this.color,
      };
    },
  },
});
</script>


<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;

  .title {
    font-family: 'Fjalla One', sans-serif;
    padding: 10px;
    vertical-align: center;
    justify-self: center;
    align-self: center;
  }
}
</style>
