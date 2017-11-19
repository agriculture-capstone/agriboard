import Vue from 'vue';
import Vuex from 'vuex';
import 'mocha';
import { assert, stub, SinonStub } from 'sinon';
import { expect } from 'chai';
import { shallow, Wrapper, createLocalVue } from 'vue-test-utils';

import Toolbar from '@/views/components/global/Toolbar/index.vue';
import { MutationTypes as ToolbarMutations } from '@/store/modules/toolbar/types';
import { MutationType as AppMutations } from '@/store/modules/app/types';
import Icon from '@/models/icons';
import { RightButton } from '@/models/toolbar';
import { Mutation, Action } from '@/store/types';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('components/global/Toolbar', function () {
  const TEST_TITLE = 'Test Title';
  const ICON_BUTTON = 'Icon Button';
  const TEXT_BUTTON = 'Text Button';
  const FAKE_MUTATION = 'Fake Mutation';
  const FAKE_ACTION = 'Fake Action';

  // Selectors
  const RIGHT_BUTTON_SELECTOR = '.right-button';
  const RIGHT_ICON_BUTTON_SELECTOR = '.right-button.icon-button';
  const RIGHT_TEXT_BUTTON_SELECTOR = '.right-button.text-button';
  const LEFT_BUTTON_ICON_SELECTOR = '.left-button > .left-icon';
  const TITLE_SELECTOR = '.md-title';

  let mutations: any;
  let actions: any;

  beforeEach(function () {
    mutations = {
      [ToolbarMutations.ADD_RIGHT_BUTTON]: stub(),
      [ToolbarMutations.SET_RIGHT_BUTTONS]: stub(),
      [ToolbarMutations.CLEAR_RIGHT_BUTTONS]: stub(),
      [AppMutations.SET_DRAWER_SHOWN]: stub(),
      [FAKE_MUTATION]: stub(),
    };

    actions = {
      [FAKE_ACTION]: stub(),
    };
  });

  it('should render default contents correctly', function () {
    // Setup store
    const store = createStore({
      app: {
        drawerLocked: false,
        title: TEST_TITLE,
      },
      toolbar: {
        buttons: [],
      },
    });

    // Setup wrapper
    const wrapper = shallow(Toolbar, { store, localVue });

    // Assertions
    expect(wrapper.find(TITLE_SELECTOR).text()).to.be.eq(TEST_TITLE, 'expected title to match value in store');
    expect(wrapper.findAll(RIGHT_BUTTON_SELECTOR).length).to.be.eq(0, 'expected there to be zero right buttons');
    expect(wrapper.find(LEFT_BUTTON_ICON_SELECTOR).text()).to.be.eq(Icon.MENU, 'expected left button to contain menu icon');
  });

  it('should render right buttons correctly', function () {
    // Setup store
    const store = createStore({
      app: {
        drawerLocked: false,
        title: TEST_TITLE,
      },
      toolbar: {
        rightButtons: genRightButtonState(),
      },
    });

    // Setup wrapper
    const wrapper = shallow(Toolbar, { localVue, store });

    // Assertions
    const expectedRightButtons = 2;
    const expectedRightIconButtons = 1;
    const expectedRightTextButtons = 1;
    expect(wrapper.findAll(RIGHT_BUTTON_SELECTOR).length).to.be.eq(expectedRightButtons,
      `expected there to be ${expectedRightButtons} right buttons`);
    expect(wrapper.findAll(RIGHT_ICON_BUTTON_SELECTOR).length).to.be.eq(expectedRightIconButtons,
      `expected there to be ${expectedRightIconButtons} right icon button`);
    expect(wrapper.findAll(RIGHT_TEXT_BUTTON_SELECTOR).length).to.be.eq(expectedRightTextButtons,
      `expected there to be ${expectedRightTextButtons} right text button`);

    // Click buttons
    wrapper.find(RIGHT_ICON_BUTTON_SELECTOR).trigger('click');
    wrapper.find(RIGHT_TEXT_BUTTON_SELECTOR).trigger('click');

    // Check that appropriate actions/mutations have fired
    assert.calledOnce(<SinonStub>mutations[FAKE_MUTATION]);
    assert.calledOnce(<SinonStub>actions[FAKE_ACTION]);
  });

  function createStore(state: any) {
    return new Vuex.Store({
      state,
      mutations,
      actions,
    });
  }

  function genRightButtonState(): RightButton[] {
    return [
      {
        name: TEXT_BUTTON,
        type: 'mutation',
        mutation: FAKE_MUTATION as Mutation,
      },
      {
        name: ICON_BUTTON,
        type: 'action',
        action: FAKE_ACTION as Action,
        icon: Icon.ARROW_BACK,
      },
    ];
  }
});
