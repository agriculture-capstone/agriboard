import Vue from 'vue';
import Vuex from 'vuex';
import 'mocha';
import { assert, stub, SinonStub } from 'sinon';
import * as expect from 'expect';
import { shallow, Wrapper, createLocalVue } from 'vue-test-utils';

import Toolbar from '@/views/components/global/Toolbar/index.vue';
import { MutationType as ToolbarMutations } from '@/store/modules/toolbar/types';
import { MutationType as AppMutations } from '@/store/modules/app/types';
import Icon from '@/models/icons';
import { RightButton, RightButtonType } from '@/models/toolbar';
import { MutationType, ActionType } from '@/store/types';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('components/global/Toolbar', function () {
  const TEST_TITLE = 'Test Title';
  const ICON_BUTTON = 'Icon Button';
  const TEXT_BUTTON = 'Text Button';
  const FAKE_MUTATION = 'Fake Mutation';
  const FAKE_ACTION = 'Fake Action';

  describe('render tests', function () {
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
      expect(wrapper.find(TITLE_SELECTOR).text()).toEqual(TEST_TITLE, 'expected title to match value in store');
      expect(wrapper.findAll(RIGHT_BUTTON_SELECTOR).length).toEqual(0, 'expected there to be zero right buttons');
      expect(wrapper.find(LEFT_BUTTON_ICON_SELECTOR).text()).toEqual(Icon.MENU, 'expected left button to contain menu icon');
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
      expect(wrapper.findAll(RIGHT_BUTTON_SELECTOR).length).toEqual(expectedRightButtons,
        `expected there to be ${expectedRightButtons} right buttons`);
      expect(wrapper.findAll(RIGHT_ICON_BUTTON_SELECTOR).length).toEqual(expectedRightIconButtons,
        `expected there to be ${expectedRightIconButtons} right icon button`);
      expect(wrapper.findAll(RIGHT_TEXT_BUTTON_SELECTOR).length).toEqual(expectedRightTextButtons,
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
          type: RightButtonType.MUTATION,
          mutation: FAKE_MUTATION as MutationType,
        },
        {
          name: ICON_BUTTON,
          type: RightButtonType.ACTION,
          action: FAKE_ACTION as ActionType,
          icon: Icon.ARROW_BACK,
        },
      ];
    }
  });

  describe('function tests', function () {
    const FAKE_BUTTON_NAME = 'Fake Button Name';

    interface MockInstance {
      $store: {
        commit: SinonStub;
        dispatch: SinonStub;
      };
      $router: {
        back: SinonStub;
      };
      handleBackButtonClicked: SinonStub;
      handleMenuButtonClicked: SinonStub;
      handleLeftButtonClicked: SinonStub;
      setDrawerShown: SinonStub;
    }

    let mockInstance: MockInstance = null;
    let vm: any = null;

    /**
     * Setup mock instance and vm to call functions
     */
    beforeEach(function () {
      mockInstance = {
        $store: {
          commit: stub(),
          dispatch: stub(),
        },
        $router: {
          back: stub(),
        },
        handleBackButtonClicked: stub(),
        handleMenuButtonClicked: stub(),
        handleLeftButtonClicked: stub(),
        setDrawerShown: stub(),
      };

      vm = new Vue(Toolbar);
    });

    describe('#onRightButtonClick', function () {
      const ACTION_TYPE = 'ACTION_TYPE';
      const MUTATION_TYPE = 'MUTATION_TYPE';
      const INVALID_TYPE = 'INVALID_TYPE';

      let rightButtonMock: any = null;

      beforeEach(function () {
        rightButtonMock = {
          action: FAKE_ACTION,
          mutation: FAKE_MUTATION,
          name: FAKE_BUTTON_NAME,
        };
      });

      it('should call dispatch with action if button type is action', function () {
        // Arrange
        rightButtonMock.type = ACTION_TYPE;

        // Act
        vm.onRightButtonClicked.apply(mockInstance, [rightButtonMock]);

        // Assert
        assert.calledOnce(mockInstance.$store.dispatch);
        assert.calledWith(mockInstance.$store.dispatch, FAKE_ACTION);
        assert.notCalled(mockInstance.$store.commit);
      });

      it('should call commit with mutation if button type is mutation', function () {
        // Arrange
        rightButtonMock.type = MUTATION_TYPE;

        // Act
        vm.onRightButtonClicked.apply(mockInstance, [rightButtonMock]);

        // Assert
        assert.calledOnce(mockInstance.$store.commit);
        assert.calledWith(mockInstance.$store.commit, FAKE_MUTATION);
        assert.notCalled(mockInstance.$store.dispatch);
      });

      it('should throw error if type is invalid', function () {
        // Arrange
        rightButtonMock.type = INVALID_TYPE;

        // Act
        try {
          vm.onRightButtonClicked.apply(mockInstance, [rightButtonMock]);
        } catch (e) {
          return;
        }

        throw new Error('#onRightButtonClicked should have thrown error');
      });

    });

    describe('#handleLeftButtonClicked', function () {
      const INVALID_ICON = 'INVALID_ICON';

      it(`should call #handleBackButtonClicked if icon is ${Icon.ARROW_BACK}`, function () {
        // Arrange
        (mockInstance as any).icon = Icon.ARROW_BACK;

        // Act
        vm.handleLeftButtonClicked.apply(mockInstance);

        // Assert
        assert.calledOnce(mockInstance.handleBackButtonClicked);
        assert.notCalled(mockInstance.handleMenuButtonClicked);
      });

      it(`should call #handleMenuButtonClicked if icon is ${Icon.MENU}`, function () {
        // Arrange
        (mockInstance as any).icon = Icon.MENU;

        // Act
        vm.handleLeftButtonClicked.apply(mockInstance);

        // Assert
        assert.calledOnce(mockInstance.handleMenuButtonClicked);
        assert.notCalled(mockInstance.handleBackButtonClicked);
      });

      it('should throw error if icon is invalid', function () {
        // Arrange
        (mockInstance as any).icon = INVALID_ICON;

        // Act
        try {
          vm.handleLeftButtonClicked.apply(mockInstance);
        } catch (e) {
          return;
        }

        throw Error('#handleLeftButtonClicked should have thrown error');
      });

    });

    describe('#handleMenuButtonClicked', function () {

      it('should set drawer shown', function () {
        // Act
        vm.handleMenuButtonClicked.apply(mockInstance);

        // Assert
        assert.calledOnce(mockInstance.setDrawerShown);
        assert.calledWith(mockInstance.setDrawerShown, { open: true });
      });
    });

    describe('#handleBackButtonClicked', function () {

      it('should use browser history api to navigate back', function () {
        // Act
        vm.handleBackButtonClicked.apply(mockInstance);

        // Assert
        assert.calledOnce(mockInstance.$router.back);
      });
    });
  });
});
