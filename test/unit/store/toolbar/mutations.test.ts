import * as expect from 'expect';

import {
  MutationType,
  ToolbarState,
  AddRightButtonPayload,
  ClearRightButtonsPayload,
  SetRightButtonsPayload,
} from '@/store/modules/toolbar/types';
import { buildCallMutationHandler } from '@test/unit/test-utils/buildCallHandlers';
import mutationHandlers from '@/store/modules/toolbar/mutations';
import { RightButton, RightButtonType } from '@/models/toolbar';

interface ButtonState {
  rightButtons: RightButton[];
}

describe('Toolbar store mutations', function () {
  const BUTTON_TEMPLATE = 'button_';
  const TEST_ICON = 'test_icon';

  const callMutationHandler = buildCallMutationHandler<ToolbarState, MutationType>(mutationHandlers);

  describe('right button state', function () {

    describe(MutationType.ADD_RIGHT_BUTTON, function () {

      interface TestProps {
        numPrevButtons: number;
        position: number;
        expectedError: boolean;
      }

      it('should add button at position 0 when no current buttons', function () {
        runTest({
          position: 0,
          numPrevButtons: 0,
          expectedError: false,
        });
      });

      it('should add button at position 0 when 1 current button', function () {
        runTest({
          position: 0,
          numPrevButtons: 1,
          expectedError: false,
        });
      });

      it('should add button at position 0 when 2 current buttons', function () {
        runTest({
          position: 0,
          numPrevButtons: 2,
          expectedError: false,
        });
      });

      it('should add button at position 1 when 2 current buttons', function () {
        runTest({
          position: 1,
          numPrevButtons: 2,
          expectedError: false,
        });
      });

      it('should add button at position 2 when 2 current buttons', function () {
        runTest({
          position: 2,
          numPrevButtons: 2,
          expectedError: false,
        });
      });

      it('should throw error when adding button at position -1 when 2 current buttons', function () {
        runTest({
          position: -1,
          numPrevButtons: 2,
          expectedError: true,
        });
      });

      it('should throw error when adding button at position -1 when no current buttons', function () {
        runTest({
          position: -1,
          numPrevButtons: 0,
          expectedError: true,
        });
      });

      it('should throw error when adding button at position 3 when 2 current buttons', function () {
        runTest({
          position: 3 ,
          numPrevButtons: 2,
          expectedError: true,
        });
      });

      it('should throw error when adding button at position 1 when no current buttons', function () {
        runTest({
          position: 1 ,
          numPrevButtons: 0,
          expectedError: true,
        });
      });


      function runTest(testProps: TestProps) {
        // Arrange
        const prevState = createButtonState(testProps.numPrevButtons, RightButtonType.ACTION);

        const newButtonId = testProps.numPrevButtons + 1;
        const newButton = createButton(newButtonId, RightButtonType.ACTION);

        const expectedRightButtonLength = testProps.numPrevButtons + 1;

        // Act
        let nextState: ButtonState = null;
        try {
          nextState = callMutationHandler<ButtonState, AddRightButtonPayload>(prevState, {
            position: testProps.position,
            button: newButton,
          }, MutationType.ADD_RIGHT_BUTTON);

          expect(testProps.expectedError).toBe(false,
            'Expected to throw error');
        } catch (err) {
          expect(testProps.expectedError).toBe(true,
            'Did not expect mutation to throw error');

          return;
        }

        // Assert
        const nextButtons = nextState.rightButtons;
        expect(nextButtons.length).toBe(expectedRightButtonLength);
        expect(nextButtons[testProps.position].name).toBe(createButtonName(newButtonId),
          `expected new button to be at position: ${testProps.position}`);
      }

    });

    describe(MutationType.CLEAR_RIGHT_BUTTONS, function () {
      const EXPECTED_BUTTONS_LENGTH = 0;

      interface TestProps {
        numPrevButtons: number;
      }

      it('should clear 0 exsting buttons', function () {
        runTest({
          numPrevButtons: 0,
        });
      });

      it('should clear 1 existing button', function () {
        runTest({
          numPrevButtons: 1,
        });
      });

      it('should clear 2 existing buttons', function () {
        runTest({
          numPrevButtons: 2,
        });
      });


      function runTest(testProps: TestProps) {
        // Arrange
        const prevButtons = createButtons(testProps.numPrevButtons, RightButtonType.ACTION);
        const prevState: ButtonState = {
          rightButtons: prevButtons,
        };

        // Act
        const nextState = callMutationHandler<ButtonState, ClearRightButtonsPayload>(prevState, {}, MutationType.CLEAR_RIGHT_BUTTONS);

        // Assert
        expect(nextState.rightButtons.length).toBe(EXPECTED_BUTTONS_LENGTH, `expected ${EXPECTED_BUTTONS_LENGTH} right buttons`);
      }
    });

    describe(MutationType.SET_RIGHT_BUTTONS, function () {

      interface TestProps {
        numPrevButtons: number;
        numNewButtons: number;
      }

      it('should set to 0 buttons when 0 previous buttons', function () {
        runTest({
          numNewButtons: 0,
          numPrevButtons: 0,
        });
      });

      it('should set to 1 button when 0 previous buttons', function () {
        runTest({
          numNewButtons: 1,
          numPrevButtons: 0,
        });
      });

      it('should set to 2 buttons when 0 previous buttons', function () {
        runTest({
          numNewButtons: 2,
          numPrevButtons: 0,
        });
      });

      it('should set to 0 buttons when 1 previous button', function () {
        runTest({
          numNewButtons: 0,
          numPrevButtons: 1,
        });
      });

      it('should set to 1 buttons when 1 previous button', function () {
        runTest({
          numNewButtons: 1,
          numPrevButtons: 1,
        });
      });

      it('should set to 2 buttons when 1 previous button', function () {
        runTest({
          numNewButtons: 2,
          numPrevButtons: 1,
        });
      });

      it('should set to 0 buttons when 2 previous buttons', function () {
        runTest({
          numNewButtons: 0,
          numPrevButtons: 2,
        });
      });

      it('should set to 1 button when 2 previous buttons', function () {
        runTest({
          numNewButtons: 1,
          numPrevButtons: 2,
        });
      });

      it('should set to 2 buttons when 2 previous buttons', function () {
        runTest({
          numNewButtons: 2,
          numPrevButtons: 2,
        });
      });

      function runTest(testProps: TestProps) {
        // Arrange
        const prevButtons = createButtons(testProps.numPrevButtons, RightButtonType.ACTION);
        const prevState: ButtonState = {
          rightButtons: prevButtons,
        };

        const newButtons = createButtons(testProps.numNewButtons, RightButtonType.ACTION, testProps.numPrevButtons);
        const payload: SetRightButtonsPayload = {
          buttons: newButtons,
        };

        // Act
        const nextState = callMutationHandler<ButtonState, SetRightButtonsPayload>(prevState, payload, MutationType.SET_RIGHT_BUTTONS);

        // Assert
        expect(nextState.rightButtons.length).toBe(testProps.numNewButtons,
          `expected right buttons to have length ${testProps.numNewButtons}`);

        nextState.rightButtons.map((rightButton, index) => {
          expect(rightButton.name).toBe(createButtonName(index + testProps.numPrevButtons));
        });
      }

    });

    /*----------------------------------- Helper Functions -----------------------------------*/

    /**
     * Create array of strings representing buttons
     *
     * @param numberOfButtons - The number of buttons to generate
     */
    function createButtons(
      numberOfButtons: number,
      buttonType: RightButtonType,
      startingId = 0,
    ): RightButton[] {
      return Array(numberOfButtons).map((_, i) => createButton(startingId + i, buttonType));
    }

    function createButton(buttonIndex: number, buttonType: RightButtonType): RightButton {
      const button = {
        buttonType,
        name: createButtonName(buttonIndex),
        icon: TEST_ICON,
      };
      Object.defineProperty(button, buttonType, {
        value: () => { },
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

    function createButtonName(id: number) {
      return `${BUTTON_TEMPLATE}${id}`;
    }
  });
});
