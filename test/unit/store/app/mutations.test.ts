import * as expect from 'expect';
import 'mocha';

import {
  MutationType,
  SetTitlePayload,
  AppState,
} from '@/store/modules/app/types';
import mutationHandlers from '@/store/modules/app/mutations';
import { buildCallMutationHandler } from '@test/unit/test-utils/buildCallHandlers';

describe('App Store mutations', function () {

  const callMutationHandler = buildCallMutationHandler<AppState, MutationType>(mutationHandlers);

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
          title: NEXT_TITLE,
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

});
