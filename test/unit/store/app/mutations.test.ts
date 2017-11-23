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
      prevDrawerShown: boolean;
      prevDrawerLocked: boolean;
      setLocked: boolean;
      expectedDrawerShown: boolean;
      expectedDrawerLocked: boolean;
    }

    it('should be locked and hidden if drawer was unlocked and hidden if set locked', function () {
      runTest({
        expectedDrawerLocked: true,
        expectedDrawerShown: false,
        prevDrawerLocked: false,
        prevDrawerShown: false,
        setLocked: true,
      });
    });

    it('should be locked and hidden if drawer was unlocked and shown if set locked', function () {
      runTest({
        expectedDrawerLocked: true,
        expectedDrawerShown: false,
        prevDrawerLocked: false,
        prevDrawerShown: true,
        setLocked: true,
      });
    });

    it('should be locked and hidden if drawer was locked and hidden if set locked', function () {
      runTest({
        expectedDrawerLocked: true,
        expectedDrawerShown: false,
        prevDrawerLocked: true,
        prevDrawerShown: false,
        setLocked: true,
      });
    });

    it('should be unlocked and hidden if drawer was unlocked and hidden if set unlocked', function () {
      runTest({
        expectedDrawerLocked: false,
        expectedDrawerShown: false,
        prevDrawerLocked: false,
        prevDrawerShown: false,
        setLocked: false,
      });
    });

    it('should be unlocked and shown if drawer was unlocked and shown and set unlocked', function () {
      runTest({
        expectedDrawerLocked: false,
        expectedDrawerShown: true,
        prevDrawerLocked: false,
        prevDrawerShown: true,
        setLocked: false,
      });
    });

    it('should be unlocked and hidden if drawer was locked and hidden and set unlocked', function () {
      runTest({
        expectedDrawerLocked: false,
        expectedDrawerShown: false,
        prevDrawerLocked: true,
        prevDrawerShown: false,
        setLocked: false,
      });
    });

    function runTest(testProps: TestProps) {
      // Assign
      const prevState: State = {
        drawerShown: testProps.prevDrawerShown,
        drawerLocked: testProps.prevDrawerLocked,
      };

      // Act
      const nextState = callMutationHandler<State, SetDrawerLockedPayload>
        (prevState, { locked: testProps.setLocked }, MutationType.SET_DRAWER_LOCKED);

      // Assert
      expect(nextState.drawerShown).toBe(testProps.expectedDrawerShown);
      expect(nextState.drawerLocked).toBe(testProps.expectedDrawerLocked);
    }

  });

  describe(MutationType.SET_DRAWER_SHOWN, function () {

    interface State {
      drawerShown: boolean;
      drawerLocked: boolean;
    }

    interface TestProps {
      prevDrawerShown: boolean;
      prevDrawerLocked: boolean;
      setShown: boolean;
      expectedDrawerShown: boolean;
      expectedDrawerLocked: boolean;
    }

    it('should be open and unlocked if drawer was closed and unlocked and set open', function () {
      runTest({
        expectedDrawerShown: true,
        expectedDrawerLocked: false,
        prevDrawerShown: false,
        prevDrawerLocked: false,
        setShown: true,
      });
    });

    it('should be open and unlocked if drawer was open and unlocked and set open', function () {
      runTest({
        expectedDrawerShown: true,
        expectedDrawerLocked: false,
        prevDrawerShown: true,
        prevDrawerLocked: false,
        setShown: true,
      });
    });

    it('should be closed and unlocked if drawer was closed and unlocked and set closed', function () {
      runTest({
        expectedDrawerShown: false,
        expectedDrawerLocked: false,
        prevDrawerShown: false,
        prevDrawerLocked: false,
        setShown: false,
      });
    });

    it('should be closed and unlocked if drawer was open and unlocked and set closed', function () {
      runTest({
        expectedDrawerShown: false,
        expectedDrawerLocked: false,
        prevDrawerShown: true,
        prevDrawerLocked: false,
        setShown: false,
      });
    });

    it('should be closed and locked if drawer was closed and locked and set open', function () {
      runTest({
        expectedDrawerShown: false,
        expectedDrawerLocked: true,
        prevDrawerShown: false,
        prevDrawerLocked: true,
        setShown: true,
      });
    });

    it('should be closed and locked if drawer was closed and locked and set closed', function () {
      runTest({
        expectedDrawerShown: false,
        expectedDrawerLocked: true,
        prevDrawerShown: false,
        prevDrawerLocked: true,
        setShown: false,
      });
    });

    function runTest(testProps: TestProps) {
      // Assign
      const prevState: State = {
        drawerShown: testProps.prevDrawerShown,
        drawerLocked: testProps.prevDrawerLocked,
      };

      // Act
      const nextState = callMutationHandler(prevState, testProps.setShown, MutationType.SET_DRAWER_SHOWN);

      // Assert
      expect(nextState.drawerShown).toBe(testProps.expectedDrawerShown);
      expect(nextState.drawerLocked).toBe(testProps.expectedDrawerLocked);
    }

  });

  describe(MutationType.SET_TITLE, function () {
    const PREV_TITLE = 'Prev Title';
    const NEXT_TITLE = 'Next Title!';

    interface State {
      title: string;
    }

    const callSetTitle = buildMutationCaller<State, SetTitlePayload>(MutationType.SET_TITLE);

    it('should set title', function () {
      // Assign
      const prevState = createState(PREV_TITLE);

      // Act
      const nextState = callSetTitle(prevState, { title: NEXT_TITLE });

      // Assert
      expect(nextState.title).toEqual(NEXT_TITLE);
    });

    function createState(title: string): State {
      return {
        title,
      };
    }

    function test(
      prevTitle: string,
      expectedTitle: string,
    ) {
      // Assign

      // Act

      // Assert
    }

  });

  describe(MutationType.TOGGLE_DRAWER, function () {

    interface State {
      drawerShown: boolean;
      drawerLocked: boolean;
    }

    const callToggleDrawer = buildMutationCaller<State, ToggleDrawerPayload>(MutationType.TOGGLE_DRAWER);

    it('should open drawer if drawer closed and unlocked', function () {
      // Assign
      const prevState = createState(false, false);

      // Act
      const nextState = callToggleDrawer(prevState, {});

      // Assert
      expect(nextState.drawerShown).toBe(true);
      expect(nextState.drawerLocked).toBe(false);
    });

    it('should close drawer if drawer open and unlocked', function () {
      // Assign
      const prevState = createState(true, false);

      // Act
      const nextState = callToggleDrawer(prevState, {});

      // Assert
      expect(nextState.drawerShown).toBe(false);
      expect(nextState.drawerLocked).toBe(false);
    });

    it('should leave drawer closed if drawer closed and locked', function () {
      // Assign
      const prevState = createState(false, true);

      // Act
      const nextState = callToggleDrawer(prevState, {});

      // Assert
      expect(nextState.drawerShown).toBe(false);
      expect(nextState.drawerLocked).toBe(true);
    });

    function createState(drawerShown: boolean, drawerLocked: boolean): State {
      return {
        drawerShown,
        drawerLocked,
      };
    }

    function test(
      prevDrawerShown: boolean,
      prevDrawerLocked: boolean,
      expectedDrawerShown: boolean,
      expectedDrawerLocked: boolean,
    ) {
      // Assign

      // Act

      // Assert
    }
  });
});
