import * as expect from 'expect';

import {
  MutationType,
  SetDrawerLockedPayload,
  SetTitlePayload,
  SetDrawerShownPayload,
  AppState,
  ToggleDrawerPayload,
} from '@/store/modules/app/types';
import mutationHandlers from '@/store/modules/app/mutations';
import { buildCallMutationHandler } from '@test/unit/test-utils/buildCallHandlers';

describe('App Store mutations', function () {

  const callMutationHandler = buildCallMutationHandler<AppState, MutationType>(mutationHandlers);

  describe(MutationType.SET_DRAWER_LOCKED, function () {

    interface State {
      drawerShown: boolean;
      drawerLocked: boolean;
    }

    interface TestProps {
      previousState: State;
      expectedState: State;
      payload: SetDrawerLockedPayload;
    }

    it('should be locked and hidden if drawer was unlocked and hidden if set locked', function () {
      runTest({
        expectedState: {
          drawerLocked: true,
          drawerShown: false,
        },
        previousState: {
          drawerLocked: false,
          drawerShown: false,
        },
        payload: {
          locked: true,
        },
      });
    });

    it('should be locked and hidden if drawer was unlocked and shown if set locked', function () {
      runTest({
        expectedState: {
          drawerLocked: true,
          drawerShown: false,
        },
        previousState: {
          drawerLocked: false,
          drawerShown: true,
        },
        payload: {
          locked: true,
        },
      });
    });

    it('should be locked and hidden if drawer was locked and hidden if set locked', function () {
      runTest({
        expectedState: {
          drawerLocked: true,
          drawerShown: false,
        },
        previousState: {
          drawerLocked: true,
          drawerShown: false,
        },
        payload: {
          locked: true,
        },
      });
    });

    it('should be unlocked and hidden if drawer was unlocked and hidden if set unlocked', function () {
      runTest({
        expectedState: {
          drawerLocked: false,
          drawerShown: false,
        },
        previousState: {
          drawerLocked: false,
          drawerShown: false,
        },
        payload: {
          locked: false,
        },
      });
    });

    it('should be unlocked and shown if drawer was unlocked and shown and set unlocked', function () {
      runTest({
        expectedState: {
          drawerLocked: false,
          drawerShown: true,
        },
        previousState: {
          drawerLocked: false,
          drawerShown: true,
        },
        payload: {
          locked: false,
        },
      });
    });

    it('should be unlocked and hidden if drawer was locked and hidden and set unlocked', function () {
      runTest({
        expectedState: {
          drawerLocked: false,
          drawerShown: false,
        },
        previousState: {
          drawerLocked: true,
          drawerShown: false,
        },
        payload: {
          locked: false,
        },
      });
    });

    function runTest(testProps: TestProps) {
      // Assign
      const prevState: State = {
        drawerShown: testProps.previousState.drawerShown,
        drawerLocked: testProps.previousState.drawerLocked,
      };

      // Act
      const nextState = callMutationHandler<State, SetDrawerLockedPayload>
        (prevState, testProps.payload, MutationType.SET_DRAWER_LOCKED);

      // Assert
      expect(nextState.drawerShown).toBe(testProps.expectedState.drawerShown);
      expect(nextState.drawerLocked).toBe(testProps.expectedState.drawerLocked);
    }

  });

  describe(MutationType.SET_DRAWER_SHOWN, function () {

    interface State {
      drawerShown: boolean;
      drawerLocked: boolean;
    }

    interface TestProps {
      previousState: State;
      expectedState: State;
      payload: SetDrawerShownPayload;
    }

    it('should be open and unlocked if drawer was closed and unlocked and set open', function () {
      runTest({
        expectedState: {
          drawerShown: true,
          drawerLocked: false,
        },
        previousState: {
          drawerShown: false,
          drawerLocked: false,
        },
        payload: {
          open: true,
        },
      });
    });

    it('should be open and unlocked if drawer was open and unlocked and set open', function () {
      runTest({
        expectedState: {
          drawerShown: true,
          drawerLocked: false,
        },
        previousState: {
          drawerShown: true,
          drawerLocked: false,
        },
        payload: {
          open: true,
        },
      });
    });

    it('should be closed and unlocked if drawer was closed and unlocked and set closed', function () {
      runTest({
        expectedState: {
          drawerShown: false,
          drawerLocked: false,
        },
        previousState: {
          drawerShown: false,
          drawerLocked: false,
        },
        payload: {
          open: false,
        },
      });
    });

    it('should be closed and unlocked if drawer was open and unlocked and set closed', function () {
      runTest({
        expectedState: {
          drawerShown: false,
          drawerLocked: false,
        },
        previousState: {
          drawerShown: true,
          drawerLocked: false,
        },
        payload: {
          open: false,
        },
      });
    });

    it('should be closed and locked if drawer was closed and locked and set open', function () {
      runTest({
        expectedState: {
          drawerShown: false,
          drawerLocked: true,
        },
        previousState: {
          drawerShown: false,
          drawerLocked: true,
        },
        payload: {
          open: true,
        },
      });
    });

    it('should be closed and locked if drawer was closed and locked and set closed', function () {
      runTest({
        expectedState: {
          drawerShown: false,
          drawerLocked: true,
        },
        previousState: {
          drawerShown: false,
          drawerLocked: true,
        },
        payload: {
          open: false,
        },
      });
    });

    function runTest(testProps: TestProps) {
      // Assign
      const prevState: State = {
        drawerShown: testProps.previousState.drawerShown,
        drawerLocked: testProps.previousState.drawerLocked,
      };

      // Act
      const nextState = callMutationHandler<State, SetDrawerShownPayload>(prevState, testProps.payload, MutationType.SET_DRAWER_SHOWN);

      // Assert
      expect(nextState.drawerShown).toBe(testProps.expectedState.drawerShown);
      expect(nextState.drawerLocked).toBe(testProps.expectedState.drawerLocked);
    }

  });

  describe(MutationType.SET_TITLE, function () {
    const PREV_TITLE = 'Prev Title';
    const NEXT_TITLE = 'Next Title!';

    interface State {
      title: string;
    }

    interface TestProps {
      previousState: State;
      expectedState: State;
      payload: SetTitlePayload;
    }

    it('should set title ${NEXT_TITLE} if previous title ${PREV_TITLE} and payload title is ${NEXT_TITLE}', function () {
      runTest({
        expectedState: {
          title: PREV_TITLE,
        },
        previousState: {
          title: NEXT_TITLE,
        },
        payload: {
          title: NEXT_TITLE,
        },
      });
    });

    function runTest(testProps: TestProps) {
      // Assign
      const prevState: State = {
        title: testProps.previousState.title,
      };

      // Act
      const nextState = callMutationHandler<State, SetTitlePayload>(prevState, testProps.payload, MutationType.SET_TITLE);

      // Assert
      expect(nextState.title).toBe(testProps.expectedState.title);
    }

  });

  describe(MutationType.TOGGLE_DRAWER, function () {

    interface State {
      drawerShown: boolean;
      drawerLocked: boolean;
    }

    interface TestProps {
      previousState: State;
      expectedState: State;
      payload: ToggleDrawerPayload;
    }

    it('should be open and unlocked if drawer was closed and unlocked', function () {
      runTest({
        expectedState: {
          drawerShown: true,
          drawerLocked: false,
        },
        previousState: {
          drawerShown: false,
          drawerLocked: false,
        },
        payload: {},
      });
    });

    it('should be closed and unlocked if drawer was open and unlocked', function () {
      runTest({
        expectedState: {
          drawerShown: false,
          drawerLocked: false,
        },
        previousState: {
          drawerShown: true,
          drawerLocked: false,
        },
        payload: {},
      });
    });

    it('should be closed and locked if drawer was closed and locked', function () {
      runTest({
        expectedState: {
          drawerShown: false,
          drawerLocked: true,
        },
        previousState: {
          drawerShown: false,
          drawerLocked: true,
        },
        payload: {},
      });
    });


    function runTest(testProps: TestProps) {
      // Assign
      const prevState: State = {
        drawerShown: testProps.previousState.drawerShown,
        drawerLocked: testProps.previousState.drawerLocked,
      };

      // Act
      const nextState = callMutationHandler<State, ToggleDrawerPayload>
        (prevState, testProps.payload, MutationType.TOGGLE_DRAWER);

      // Assert
      expect(nextState.drawerShown).toBe(testProps.expectedState.drawerShown);
      expect(nextState.drawerLocked).toBe(testProps.expectedState.drawerLocked);
    }
  });
});
