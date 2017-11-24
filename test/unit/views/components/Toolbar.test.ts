import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import 'mocha';
import { assert, stub, SinonStub } from 'sinon';
import * as expect from 'expect';
import { shallow, Wrapper, createLocalVue } from 'vue-test-utils';

import Toolbar from '@/views/components/global/Toolbar/index.vue';
import { MutationType as ToolbarMutations } from '@/store/modules/toolbar/types';
import { MutationType as AppMutations, SetDrawerShownPayload } from '@/store/modules/app/types';
import Icon from '@/models/icons';
import { RightButton, RightButtonType } from '@/models/toolbar';
import { MutationType, ActionType } from '@/store/types';
import { VueConstructor } from 'vue/types/vue';

describe('components/global/Toolbar', function () {
  const TEST_TITLE = 'Test Title';
  const ICON_ACTION_BUTTON = 'icon-action';
  const TEXT_MUTATION_BUTTON = 'text-mutation';
  const FAKE_MUTATION = 'fakeMutation';
  const FAKE_ACTION = 'fakeAction';
  const INVALID_TYPE = 'invalid';

  // Selectors
  const RIGHT_BUTTON_SELECTOR = '.right-button';
  const RIGHT_ICON_BUTTON_SELECTOR = '.right-button.icon-button';
  const RIGHT_TEXT_BUTTON_SELECTOR = '.right-button.text-button';
  const LEFT_BUTTON_ICON_SELECTOR = '.left-button > .left-icon';
  const TITLE_SELECTOR = '.md-title';

  let localVue: VueConstructor<Vue> = null;

  let mutations: any;
  let actions: any;

  beforeEach(function () {
    localVue = createLocalVue();
    localVue.use(Vuex);

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

  describe('render tests', function () {

    it('should render default contents correctly', function () {
      // Setup store
      const wrapper = createWrapper({
        app: {
          drawerLocked: false,
          title: TEST_TITLE,
        },
        toolbar: {
          buttons: [],
        },
      });

      // Assertions
      expect(wrapper.find(TITLE_SELECTOR).text()).toEqual(TEST_TITLE, 'expected title to match value in store');
      expect(wrapper.findAll(RIGHT_BUTTON_SELECTOR).length).toEqual(0, 'expected there to be zero right buttons');
      expect(wrapper.find(LEFT_BUTTON_ICON_SELECTOR).text()).toEqual(Icon.MENU, 'expected left button to contain menu icon');
    });

    it('should render right buttons correctly', function () {
      // Setup wrapper
      const wrapper = createWrapper({
        app: {
          drawerLocked: false,
          title: TEST_TITLE,
        },
        toolbar: {
          rightButtons: createRightButtonState(),
        },
      });

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
  });

  describe('event handlers', function () {

    let wrapper: Wrapper<Vue> = null;

    describe('right button', function () {
      interface TestProps {
        buttonName: string;
        expectedType: RightButtonType;
        expectedPayload?: string;
        expectedError: boolean;
      }

      beforeEach(function () {
        wrapper = createWrapper({
          app: {
            drawerLocked: false,
          },
          toolbar: {
            rightButtons: createRightButtonState(),
          },
        });

        (wrapper.vm.$router as any) = stub();
        (wrapper.vm.$store.dispatch as any) = stub();
        (wrapper.vm.$store.commit as any) = stub();
      });

      it('should handle clicking mutation button', function () {
        runTest({
          buttonName: TEXT_MUTATION_BUTTON,
          expectedType: RightButtonType.MUTATION,
          expectedPayload: FAKE_MUTATION,
          expectedError: false,
        });
      });

      it('should handle clicking action button', function () {
        runTest({
          buttonName: ICON_ACTION_BUTTON,
          expectedType: RightButtonType.ACTION,
          expectedPayload: FAKE_ACTION,
          expectedError: false,
        });
      });

      it('should throw error with invalid button type', function () {
        runTest({
          buttonName: TEXT_MUTATION_BUTTON,
          expectedType: INVALID_TYPE as any,
          expectedError: true,
        });
      });

      function runTest(testProps: TestProps) {
        // Arrange
        const selector = `.${testProps.buttonName}-button`;
        const expectedCalled: any =
          (testProps.expectedType === RightButtonType.ACTION)
          ? wrapper.vm.$store.dispatch
          : wrapper.vm.$store.commit;


        // Act
        try {
          wrapper.find(selector).trigger('click');
          expect(testProps.expectedError).toBe(false);
        } catch (e) {
          expect(testProps.expectedError).toBe(true);
          return;
        }

        // Assert
        assert.calledOnce(expectedCalled);
        assert.calledWithExactly(expectedCalled, testProps.expectedPayload);
      }
    });

    describe('left button', function () {

      it('should navigate back using history API when back button clicked', function () {
        // Arrange
        const { wrapper } = createLeftButtonWrapper(Icon.ARROW_BACK);
        (wrapper.vm.$router as any) = { back: stub() };

        // Act
        wrapper.find(LEFT_BUTTON_ICON_SELECTOR).trigger('click');

        // Assert
        assert.calledOnce(wrapper.vm.$router.back as any);
      });

      it('should set drawer shown when menu button pressed', function () {
        // Arrange
        const { wrapper, state } = createLeftButtonWrapper(Icon.MENU);

        // Act
        wrapper.find(LEFT_BUTTON_ICON_SELECTOR).trigger('click');

        // Assert
        assert.calledOnce(mutations[AppMutations.SET_DRAWER_SHOWN]);
        assert.calledWith(mutations[AppMutations.SET_DRAWER_SHOWN], state, { open: true } as SetDrawerShownPayload);
      });

      function createLeftButtonWrapper(type: Icon.ARROW_BACK | Icon.MENU) {
        const state = {
          app: {
            drawerLocked: (type === Icon.ARROW_BACK),
            title: TEST_TITLE,
          },
          toolbar: {
            rightButtons: [] as any[],
          },
        };

        return {
          state,
          wrapper: createWrapper(state),
        };
      }

    });
  });

  function createRightButtonState(): RightButton[] {
    return [
      {
        name: TEXT_MUTATION_BUTTON,
        type: RightButtonType.MUTATION,
        mutation: FAKE_MUTATION as MutationType,
      },
      {
        name: ICON_ACTION_BUTTON,
        type: RightButtonType.ACTION,
        action: FAKE_ACTION as ActionType,
        icon: Icon.ARROW_BACK,
      },
    ];
  }

  function createWrapper(state: any) {
    const store = new Vuex.Store({
      state,
      mutations,
      actions,
    });

    return shallow(Toolbar, { store, localVue });
  }
});
