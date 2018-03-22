import Vue, { ComponentOptions } from 'vue';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $token?: string;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $token: string;
  }
}
