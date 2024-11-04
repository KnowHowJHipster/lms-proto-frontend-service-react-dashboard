import axios from 'axios';
import sinon from 'sinon';
import { configureStore } from '@reduxjs/toolkit';

import profile, { getProfile } from './application-profile';

describe('Profile reducer tests', () => {
  const initialState = {
    inProduction: true,
  };
  describe('Common tests', () => {
    it('should return the initial state', () => {
      const toTest = profile(undefined, { type: '' });
      expect(toTest).eq(initialState);
    });

    it('should return the right payload in prod', () => {
      const payload = {
        data: {
          activeProfiles: ['prod'],
        },
      };

      expect(
        profile(undefined, { type: getProfile.fulfilled.type, payload })
      ).eq({
        inProduction: true,
      });
    });

    it('should return the right payload in dev with OpenAPI enabled', () => {
      const payload = {
        data: {
          activeProfiles: ['api-docs', 'dev'],
        },
      };

      expect(
        profile(undefined, { type: getProfile.fulfilled.type, payload })
      ).eq({
        inProduction: false,
      });
    });
  });

  describe('Actions', () => {
    let store;

    const resolvedObject = { value: 'whatever' };
    const getState = vitest.fn();
    const dispatch = vitest.fn();
    const extra = {};
    beforeEach(() => {
      store = configureStore({
        reducer: (state = [], action) => [...state, action],
      });
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches GET_SESSION_PENDING and GET_SESSION_FULFILLED actions', async () => {
      const result = await getProfile()(dispatch, getState, extra);

      const pendingAction = dispatch.mock.calls[0][0];
      expect(pendingAction.meta.requestStatus).toBe('pending');
      expect(getProfile.fulfilled.match(result)).toBe(true);
    });
  });
});
