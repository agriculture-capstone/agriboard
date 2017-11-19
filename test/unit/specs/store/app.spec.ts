import { expect } from 'chai';

import { MutationType, SetDrawerLockedPayload, SetTitlePayload } from '@/store/modules/app/types';
import mutations from '@/store/modules/app/mutations';

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
        expect(nextState.drawerLocked).to.be.true;
        expect(nextState.drawerShown).to.be.false;
      });

      it('should close drawer if open', function () {
        // Assign
        const prevState = createState(true, false);

        // Act
        const nextState = callMutation(prevState, { locked: true });

        // Assert
        expect(nextState.drawerLocked).to.be.true;
        expect(nextState.drawerShown).to.be.false;
      });

      it('should unlock drawer if locked', function () {
        // Assign
        const prevState = createState(false, true);

        // Act
        const nextState = callMutation(prevState, { locked: false });

        // Assert
        expect(nextState.drawerLocked).to.be.false;
        expect(nextState.drawerShown).to.be.false;
      });

      it('should leave drawer locked if locked', function () {
        // Assign
        const prevState = createState(false, true);

        // Act
        const nextState = callMutation(prevState, { locked: true });

        // Assert
        expect(nextState.drawerLocked).to.be.true;
        expect(nextState.drawerShown).to.be.false;
      });

      it('should leave drawer unlocked if unlocked', function () {
        // Assign
        const prevState = createState(true, false);

        // Act
        const nextState = callMutation(prevState, { locked: false });

        // Assert
        expect(nextState.drawerLocked).to.be.false;
        expect(nextState.drawerShown).to.be.true;
      });

      function createState(drawerShown: boolean, drawerLocked: boolean): State {
        return {
          drawerShown,
          drawerLocked,
        };
      }

    });

    describe(MutationType.SET_DRAWER_SHOWN, function () {

      it('should set drawer open if unlocked', function () {
        // Assign

        // Act

        // Assert
        expect.fail();
      });

      it('should leave drawer closed if drawer locked', function () {
        // Assign

        // Act

        // Assert
        expect.fail();
      });

      it('should set drawer closed if unlocked', function () {
        // Assign

        // Act

        // Assert
        expect.fail();
      });

      it('should leave drawer open if drawer locked', function () {
        // Assign

        // Act

        // Assert
        expect.fail();
      });

      function createState(shown: boolean, locked: boolean) {
        return {
          shown,
          locked,
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
        expect(nextState.title).to.be.eq(NEXT_TITLE);
      });

      function createState(title: string): State {
        return {
          title,
        };
      }

    });

    describe(MutationType.TOGGLE_DRAWER, function () {

      it('should open drawer if drawer closed and unlocked', function () {
        // Assign

        // Act

        // Assert
        expect.fail();
      });

      it('should close drawer if drawer open and unlocked', function () {
        // Assign

        // Act

        // Assert
        expect.fail();
      });

      it('should leave drawer closed if drawer closed and locked', function () {
        // Assign

        // Act

        // Assert
        expect.fail();
      });

      function createState(shown: boolean, locked: boolean) {
        return {
          shown,
          locked,
        };
      }

    });

    function buildCallMutation<S, P>(type: MutationType) {
      return (prevState: S, payload: P): S => {
        const nextState = { ...prevState as any };
        mutations[type](nextState, payload);
        return nextState;
      };
    }
  });
});
