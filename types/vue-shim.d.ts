import Vue, { ComponentOptions } from 'vue';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    $TokenService?: string;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $TokenService: string;
  }
}
