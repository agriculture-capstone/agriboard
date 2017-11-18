import Vue from 'vue';
import Hello from '@/views/pages/Hello.vue';
import 'mocha';
import { expect } from 'chai';

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const constructor = Vue.extend(Hello);
    const vm = new constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js PWA');
  });
});
