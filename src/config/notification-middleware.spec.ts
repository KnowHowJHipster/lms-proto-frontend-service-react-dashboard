import { createStore, applyMiddleware } from 'redux';
import * as toastify from 'react-toastify'; // synthetic default import doesn't work here due to mocking.
import sinon from 'sinon';
import { TranslatorContext } from 'react-jhipster';

import notificationMiddleware from './notification-middleware';

describe('Notification Middleware', () => {
  let store: any;

  const SUCCESS_TYPE = 'SUCCESS/fulfilled';
  const ERROR_TYPE = 'ERROR/rejected';

  // Default action for use in local tests
  const DEFAULT = {
    type: SUCCESS_TYPE,
    payload: 'foo',
  };
  const HEADER_SUCCESS = {
    type: SUCCESS_TYPE,
    payload: {
      status: 201,
      statusText: 'Created',
      headers: { 'app-alert': 'foo.created', 'app-params': 'foo' },
    },
  };

  const DEFAULT_ERROR = {
    type: ERROR_TYPE,
    error: new Error('foo'),
  };
  const VALIDATION_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: {
          type: 'https://www.iqkv.net/problem/problem-with-message',
          title: 'Method argument not valid',
          status: 400,
          path: '/api/foos',
          message: 'error.validation',
          fieldErrors: [
            { objectName: 'foos', field: 'minField', message: 'Min' },
          ],
        },
        status: 400,
        statusText: 'Bad Request',
        headers: { expires: '0' },
      },
    },
  };
  const HEADER_ERRORS = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        status: 400,
        statusText: 'Bad Request',
        headers: { 'app-error': 'foo.creation', 'app-params': 'foo' },
      },
    },
  };
  const NOT_FOUND_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: {
          status: 404,
          message: 'Not found',
        },
        status: 404,
      },
    },
  };
  const NO_SERVER_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        status: 0,
      },
    },
  };
  const GENERIC_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: {
          message: 'Error',
        },
      },
    },
  };
  const LOGIN_REJECTED_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: '',
        config: {
          url: 'api/authenticate',
        },
        status: 401,
      },
    },
  };

  const TITLE_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: {
          title: 'Incorrect password',
          status: 400,
          type: 'https://www.iqkv.net/problem/invalid-password',
        },
        status: 400,
      },
    },
  };

  const STRING_DATA_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        data: 'Incorrect password string',
        status: 400,
      },
    },
  };

  const UNKNOWN_400_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
      response: {
        status: 400,
      },
    },
  };

  const UNKNOWN_ERROR = {
    type: ERROR_TYPE,
    error: {
      isAxiosError: true,
    },
  };

  const makeStore = () =>
    applyMiddleware(notificationMiddleware)(createStore)(() => null);

  beforeAll(() => {
    TranslatorContext.registerTranslations('en', {});
  });

  beforeEach(() => {
    store = makeStore();
    sinon.spy(toastify.toast, 'error');
    sinon.spy(toastify.toast, 'success');
  });

  afterEach(() => {
    (toastify.toast as any).error.restore();
    (toastify.toast as any).success.restore();
  });

  it('should not trigger a toast message but should return action', () => {
    expect(store.dispatch(DEFAULT).payload).eq('foo');
    expect((toastify.toast as any).error.called).eq(false);
    expect((toastify.toast as any).success.called).eq(false);
  });

  it('should trigger a success toast message for header alerts', () => {
    expect(store.dispatch(HEADER_SUCCESS).payload.status).eq(201);
    const toastMsg = (toastify.toast as any).success.getCall(0).args[0];
    expect(toastMsg).contain('foo.created');
  });

  it('should trigger an error toast message and return error', () => {
    expect(store.dispatch(DEFAULT_ERROR).error.message).eq('foo');
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).eq('foo');
  });

  it('should trigger an error toast message and return error for generic message', () => {
    expect(store.dispatch(GENERIC_ERROR).error.response.data.message).eq(
      'Error'
    );
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).contain('Error');
  });

  it('should trigger an error toast message and return error for 400 response code', () => {
    expect(store.dispatch(VALIDATION_ERROR).error.response.data.message).eq(
      'error.validation'
    );
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).contain('error.Size');
  });

  it('should trigger an error toast message and return error for 404 response code', () => {
    expect(store.dispatch(NOT_FOUND_ERROR).error.response.data.message).eq(
      'Not found'
    );
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).contain('error.url.not.found');
  });

  it('should trigger an error toast message and return error for 0 response code', () => {
    expect(store.dispatch(NO_SERVER_ERROR).error.response.status).eq(0);
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).contain('error.server.not.reachable');
  });

  it('should trigger an error toast message and return error for headers containing errors', () => {
    expect(store.dispatch(HEADER_ERRORS).error.response.status).eq(400);
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).contain('foo.creation');
  });

  it('should not trigger an error toast message and return error for 401 response code', () => {
    expect(store.dispatch(LOGIN_REJECTED_ERROR).error.response.status).eq(401);
    expect((toastify.toast as any).error.called).eq(false);
    expect((toastify.toast as any).success.called).eq(false);
  });

  it('should trigger an error toast message and return error for 400 response code', () => {
    expect(store.dispatch(TITLE_ERROR).error.response.status).eq(400);
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).contain('Incorrect password');
  });

  it('should trigger an error toast message and return error for string in data', () => {
    expect(store.dispatch(STRING_DATA_ERROR).error.response.status).eq(400);
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).contain('Incorrect password string');
  });

  it('should trigger an error toast message and return error for unknown 400 error', () => {
    expect(store.dispatch(UNKNOWN_400_ERROR).error.response.status).eq(400);
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).contain('Unknown error!');
  });

  it('should trigger an error toast message and return error for unknown error', () => {
    expect(store.dispatch(UNKNOWN_ERROR).error.isAxiosError).eq(true);
    const toastMsg = (toastify.toast as any).error.getCall(0).args[0];
    expect(toastMsg).contain('Unknown error!');
  });
});
