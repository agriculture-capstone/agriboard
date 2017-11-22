import * as expect from 'expect';

import {
  MutationType,
  ToolbarState,
  AddRightButtonPayload,
  ClearRightButtonsPayload,
  SetRightButtonsPayload,
} from '@/store/modules/toolbar/types';
import { createCallMutationBuilder } from '@test/unit/test-utils/buildCallHandlers';
import mutationHandlers from '@/store/modules/toolbar/mutations';
import { RightButton, RightButtonType } from '@/models/toolbar';

interface ButtonState {
  rightButtons: RightButton[];
}

describe('Toolbar store mutations', function () {
  const BUTTON_TEMPLATE = 'button_';
  const TEST_ICON = 'test_icon';

  const buildCallMutation = createCallMutationBuilder<ToolbarState, MutationType>(mutationHandlers);

  describe(MutationType.ADD_RIGHT_BUTTON, function () {

    interface Test {
      buttonType: RightButtonType;
      numberOfButtons: number;
    }

    const callAddRightButton = buildCallMutation<ButtonState, AddRightButtonPayload>(MutationType.ADD_RIGHT_BUTTON);

    const tests: Test[] = [
      {
        numberOfButtons: 0,
        buttonType: RightButtonType.ACTION,
      },
      {
        numberOfButtons: 1,
        buttonType: RightButtonType.ACTION,
      },
      {
        numberOfButtons: 2,
        buttonType: RightButtonType.ACTION,
      },
      {
        numberOfButtons: 0,
        buttonType: RightButtonType.MUTATION,
      },
      {
        numberOfButtons: 1,
        buttonType: RightButtonType.MUTATION,
      },
      {
        numberOfButtons: 2,
        buttonType: RightButtonType.MUTATION,
      },
    ];

    tests.map((test) => {
      it(`should add right button to ${test.numberOfButtons} buttons with type: '${test.buttonType}'`, function () {
        // Arrange
        const state = createButtonState(test.numberOfButtons, test.buttonType);
        const button = createButton(test.numberOfButtons + 1, test.buttonType);

        // Act
        const nextState = callAddRightButton(state, { button });

        // Assert
        expectButtons(nextState, test.numberOfButtons, test.buttonType);
      });
    });
  });

  describe(MutationType.CLEAR_RIGHT_BUTTONS, function () {

    const callAddRightButton = buildCallMutation<ButtonState, ClearRightButtonsPayload>(MutationType.CLEAR_RIGHT_BUTTONS);

    it('', function () {

    });
  });

  describe(MutationType.SET_RIGHT_BUTTONS, function () {

    const callAddRightButton = buildCallMutation<ButtonState, SetRightButtonsPayload>(MutationType.SET_RIGHT_BUTTONS);

    it('', function () {

    });
  });

  /*----------------------------------- Helper Functions -----------------------------------*/

  /**
   * Create array of strings representing buttons
   *
   * @param numberOfButtons - The number of buttons to generate
   */
  function createButtons(numberOfButtons: number, buttonType: RightButtonType): RightButton[] {
    return Array(numberOfButtons).map((_, i) => createButton(i, buttonType));
  }

  function createButton(buttonIndex: number, buttonType: RightButtonType): RightButton {
    const button = {
      buttonType,
      name: `${BUTTON_TEMPLATE}${buttonIndex}`,
      icon: TEST_ICON,
    };
    Object.defineProperty(button, buttonType, {
      value: () => {},
    });

    // Too dynamic for typescript, cast to any
    return button as any;
  }

  function expectButtons(nextState: ButtonState, numberOfButtons: number, buttonType: RightButtonType) {
    expect(nextState.rightButtons.length).toBe(numberOfButtons,
      `expected length: ${numberOfButtons}\nactual length: ${nextState.rightButtons.length}`);

    nextState.rightButtons.map((button, i) => {
      expect(button.type).toBe(buttonType,
        'expected ${BUTTON_TEMPLATE}${i} to have type ${buttonType} but was ${button.type}');
    });

    const names = nextState.rightButtons.map(button => button.name);
    expect(names.length).toBe(new Set(names).size, 'expected no duplicates in rightButtons array');
  }

  function createButtonState(numberOfButtons: number, buttonType: RightButtonType): ButtonState {
    return {
      rightButtons: createButtons(numberOfButtons, buttonType),
    };
  }
});
