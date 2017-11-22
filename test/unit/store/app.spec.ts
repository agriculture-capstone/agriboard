import * as expect from 'expect';

import {
  MutationType,
  SetDrawerLockedPayload,
  SetTitlePayload,
  SetDrawerShownPayload,
  AppState,
  ToggleDrawerPayload,
} from '@/store/modules/app/types';
import mutations from '@/store/modules/app/mutations';
import { createCallMutationsBuilder } from '../../unit/test-utils/buildCallMutations';

const buildCallMutation = createCallMutationsBuilder<MutationType, AppState>(mutations);

describe('App Store', function () {

  describe('mutations', function () {

    describe(MutationType.SET_DRAWER_LOCKED, function () {

      interface State {
        drawerShown: boolean;
        drawerLocked: boolean;
      }

      const callMutation = buildCallMutation<State, SetDrawerLockedPayload>(MutationType.SET_DRAWER_LOCKED);

      it('should lock drawer if unlocked', function () {
        // Assign
        const prevState = createState(false, false);

        // Act
        const nextState = callMutation(prevState, { locked: true });

        // Assert
        expect(nextState.drawerLocked).toBe(true);
        expect(nextState.drawerShown).toBe(false);
      });

      it('should close drawer if open', function () {
        // Assign
        const prevState = createState(true, false);

        // Act
        const nextState = callMutation(prevState, { locked: true });

        // Assert
        expect(nextState.drawerLocked).toBe(true);
        expect(nextState.drawerShown).toBe(false);
      });

      it('should unlock drawer if locked', function () {
        // Assign
        const prevState = createState(false, true);

        // Act
        const nextState = callMutation(prevState, { locked: false });

        // Assert
        expect(nextState.drawerLocked).toBe(false);
        expect(nextState.drawerShown).toBe(false);
      });

      it('should leave drawer locked if locked', function () {
        // Assign
        const prevState = createState(false, true);

        // Act
        const nextState = callMutation(prevState, { locked: true });

        // Assert
        expect(nextState.drawerLocked).toBe(true);
        expect(nextState.drawerShown).toBe(false);
      });

      it('should leave drawer unlocked if unlocked', function () {
        // Assign
        const prevState = createState(true, false);

        // Act
        const nextState = callMutation(prevState, { locked: false });

        // Assert
        expect(nextState.drawerLocked).toBe(false);
        expect(nextState.drawerShown).toBe(true);
      });

      function createState(drawerShown: boolean, drawerLocked: boolean): State {
        return {
          drawerShown,
          drawerLocked,
        };
      }

    });

    describe(MutationType.SET_DRAWER_SHOWN, function () {

      interface State {
        drawerShown: boolean;
        drawerLocked: boolean;
      }

      const callMutation = buildCallMutation<State, SetDrawerShownPayload>(MutationType.SET_DRAWER_SHOWN);

      it('should set drawer open if unlocked', function () {
        // Assign
        const prevState = createState(false, false);

        // Act
        const nextState = callMutation(prevState, { open: true });

        // Assert
        expect(nextState.drawerShown).toBe(true);
        expect(nextState.drawerLocked).toBe(false);
      });

      it('should leave drawer closed if drawer locked and drawer set open', function () {
        // Assign
        const prevState = createState(false, true);

        // Act
        const nextState = callMutation(prevState, { open: true });

        // Assert
        expect(nextState.drawerShown).toBe(false);
        expect(nextState.drawerLocked).toBe(true);
      });

      it('should set drawer closed if unlocked', function () {
        // Assign
        const prevState = createState(true, false);

        // Act
        const nextState = callMutation(prevState, { open: false });

        // Assert
        expect(nextState.drawerShown).toBe(false);
        expect(nextState.drawerLocked).toBe(false);
      });

      it('should leave drawer closed if drawer locked and drawer set closed', function () {
        // Assign
        const prevState = createState(false, true);

        // Act
        const nextState = callMutation(prevState, { open: false });

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

    });

    describe(MutationType.SET_TITLE, function () {
      const PREV_TITLE = 'Prev Title';
      const NEXT_TITLE = 'Next Title!';

      interface State {
        title: string;
      }

      const callMutation = buildCallMutation<State, SetTitlePayload>(MutationType.SET_TITLE);

      it('should set title', function () {
        // Assign
        const prevState = createState(PREV_TITLE);

        // Act
        const nextState = callMutation(prevState, { title: NEXT_TITLE });

        // Assert
        expect(nextState.title).toEqual(NEXT_TITLE);
      });

      function createState(title: string): State {
        return {
          title,
        };
      }

    });

    describe(MutationType.TOGGLE_DRAWER, function () {

      interface State {
        drawerShown: boolean;
        drawerLocked: boolean;
      }

      const callMutation = buildCallMutation<State, ToggleDrawerPayload>(MutationType.TOGGLE_DRAWER);

      it('should open drawer if drawer closed and unlocked', function () {
        // Assign
        const prevState = createState(false, false);

        // Act
        const nextState = callMutation(prevState, {});

        // Assert
        expect(nextState.drawerShown).toBe(true);
        expect(nextState.drawerLocked).toBe(false);
      });

      it('should close drawer if drawer open and unlocked', function () {
        // Assign
        const prevState = createState(true, false);

        // Act
        const nextState = callMutation(prevState, {});

        // Assert
        expect(nextState.drawerShown).toBe(false);
        expect(nextState.drawerLocked).toBe(false);
      });

      it('should leave drawer closed if drawer closed and locked', function () {
        // Assign
        const prevState = createState(false, true);

        // Act
        const nextState = callMutation(prevState, {});

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
    });
  });
});
