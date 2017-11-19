import Vue from 'vue';
import 'mocha';
import * as expect from 'expect';
import { shallow } from 'vue-test-utils';

import Hello from '@/views/pages/Hello.vue';

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const wrapper = shallow(Hello);
    expect(wrapper.find('.hello h1').text()).toMatch('Welcome to Your Vue.js PWA');
  });
});
