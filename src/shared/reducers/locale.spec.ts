import axios from 'axios';
import sinon from 'sinon';
import { configureStore, createReducer } from '@reduxjs/toolkit';
import { TranslatorContext } from 'react-jhipster';

import locale, {
  setLocale,
  updateLocale,
  loaded,
  addTranslationSourcePrefix,
} from './locale';

const defaultLocale = 'en';
const dispatch = vitest.fn();
const extra = {};

describe('Locale reducer tests', () => {
  it('should return the initial state', () => {
    const localeState = locale(undefined, { type: '' });
    expect(localeState).eql({
      currentLocale: '',
    });
  });

  it('should correctly set the first time locale', () => {
    const localeState = locale(undefined, updateLocale(defaultLocale));
    expect(localeState).eql({
      currentLocale: defaultLocale,
    });
    expect(TranslatorContext.context.locale).eq(defaultLocale);
  });

  it('should correctly detect update in current locale state', () => {
    TranslatorContext.setLocale(defaultLocale);
    expect(TranslatorContext.context.locale).eq(defaultLocale);

    const localeState = locale(
      {
        currentLocale: defaultLocale,
        sourcePrefixes: [],
        lastChange: new Date().getTime(),
        loadedKeys: [],
      },
      updateLocale('es')
    );
    expect(localeState).eqls({
      currentLocale: 'es',
    });
    expect(TranslatorContext.context.locale).eq('es');
  });

  describe('setLocale reducer', () => {
    describe('with default language loaded', () => {
      createReducer(
        {
          locale: {
            sourcePrefixes: '',
            loadedLocales: [defaultLocale],
            loadedKeys: [],
          },
        },
        (builder) => {
          builder.addDefaultCase(() => {});
        }
      );
      beforeEach(() => {
        axios.get = sinon.stub().returns(Promise.resolve({ key: 'value' }));
      });

      it('dispatches updateLocale action for default locale', async () => {
        TranslatorContext.setDefaultLocale(defaultLocale);
        expect(
          Object.keys(TranslatorContext.context.translations)
        ).not.contains(defaultLocale);

        const getState = vitest.fn(() => ({
          locale: {
            sourcePrefixes: '',
            loadedLocales: [defaultLocale],
            loadedKeys: [],
          },
        }));

        const result = await setLocale(defaultLocale)(
          dispatch,
          getState,
          extra
        );

        const pendingAction = dispatch.mock.calls[0][0];
        expect(pendingAction.meta.requestStatus).be('pending');
        expect(setLocale.fulfilled.match(result)).be(true);
      });
    });

    describe('with no language loaded', () => {
      let store;
      const reducer = createReducer(
        { locale: { sourcePrefixes: [], loadedLocales: [], loadedKeys: [] } },
        (builder) => {
          builder.addDefaultCase(() => {});
        }
      );
      beforeEach(() => {
        store = configureStore({
          reducer,
        });
        axios.get = sinon.stub().returns(Promise.resolve({ key: 'value' }));
      });

      it('dispatches loaded and updateLocale action for default locale', async () => {
        TranslatorContext.setDefaultLocale(defaultLocale);
        expect(Object.keys(TranslatorContext.context.translations)).not.eq(
          defaultLocale
        );

        const getState = vitest.fn(() => ({
          locale: { sourcePrefixes: [], loadedLocales: [], loadedKeys: [] },
        }));

        const result = await setLocale(defaultLocale)(
          dispatch,
          getState,
          extra
        );

        const pendingAction = dispatch.mock.calls[0][0];
        expect(pendingAction.meta.requestStatus).eq('pending');
        expect(setLocale.fulfilled.match(result)).eq(true);
      });
    });
  });

  describe('addTranslationSourcePrefix reducer', () => {
    const sourcePrefix = 'foo/';

    describe('with no prefixes and keys loaded', () => {
      createReducer(
        {
          locale: {
            currentLocale: defaultLocale,
            sourcePrefixes: [],
            loadedLocales: [],
            loadedKeys: [],
          },
        },
        (builder) => {
          builder.addDefaultCase(() => {});
        }
      );
      beforeEach(() => {
        axios.get = sinon.stub().returns(Promise.resolve({ key: 'value' }));
      });

      it('dispatches loaded action with keys and sourcePrefix', async () => {
        const getState = vitest.fn(() => ({
          locale: {
            currentLocale: defaultLocale,
            sourcePrefixes: [],
            loadedLocales: [],
            loadedKeys: [],
          },
        }));

        const result = await addTranslationSourcePrefix(sourcePrefix)(
          dispatch,
          getState,
          extra
        );

        const pendingAction = dispatch.mock.calls[0][0];
        expect(pendingAction.meta.requestStatus).eq('pending');
        expect(addTranslationSourcePrefix.fulfilled.match(result)).eq(true);
      });
    });

    describe('with prefix already added', () => {
      createReducer(
        {
          locale: {
            currentLocale: defaultLocale,
            sourcePrefixes: [sourcePrefix],
            loadedLocales: [],
            loadedKeys: [],
          },
        },
        (builder) => {
          builder.addDefaultCase(() => {});
        }
      );
      beforeEach(() => {
        axios.get = sinon.stub().returns(Promise.resolve({ key: 'value' }));
      });

      it("doesn't dispatches loaded action", async () => {
        const getState = vitest.fn(() => ({
          locale: {
            currentLocale: defaultLocale,
            sourcePrefixes: [sourcePrefix],
            loadedLocales: [],
            loadedKeys: [],
          },
        }));

        const result = await addTranslationSourcePrefix(sourcePrefix)(
          dispatch,
          getState,
          extra
        );

        const pendingAction = dispatch.mock.calls[0][0];
        expect(pendingAction.meta.requestStatus).eq('pending');
        expect(addTranslationSourcePrefix.fulfilled.match(result)).eq(true);
      });
    });

    describe('with key already loaded', () => {
      let store;
      const reducer = createReducer(
        {
          locale: {
            currentLocale: defaultLocale,
            sourcePrefixes: [],
            loadedLocales: [],
            loadedKeys: [`${sourcePrefix}${defaultLocale}`],
          },
        },
        (builder) => {
          builder.addDefaultCase(() => {});
        }
      );
      beforeEach(() => {
        store = configureStore({
          reducer,
        });
        axios.get = sinon.stub().returns(Promise.resolve({ key: 'value' }));
      });

      it("doesn't dispatches loaded action", async () => {
        const getState = vitest.fn(() => ({
          locale: {
            currentLocale: defaultLocale,
            sourcePrefixes: [],
            loadedLocales: [],
            loadedKeys: [`${sourcePrefix}${defaultLocale}`],
          },
        }));

        const result = await addTranslationSourcePrefix(sourcePrefix)(
          dispatch,
          getState,
          extra
        );

        const pendingAction = dispatch.mock.calls[0][0];
        expect(pendingAction.meta.requestStatus).eq('pending');
        expect(addTranslationSourcePrefix.fulfilled.match(result)).eq(true);
      });
    });
  });

  describe('loaded reducer', () => {
    describe('with empty state', () => {
      let initialState:
        | Readonly<{
            currentLocale: string;
            sourcePrefixes: never[];
            lastChange: number;
            loadedKeys: never[];
            loadedLocales: never[];
          }>
        | undefined;
      beforeEach(() => {
        initialState = {
          currentLocale: defaultLocale,
          sourcePrefixes: [],
          loadedLocales: [],
          loadedKeys: [],
        };
      });

      it("and empty parameter, don't adds anything", () => {
        const expectedState = {
          currentLocale: defaultLocale,
          sourcePrefixes: [],
          loadedLocales: [],
          loadedKeys: [],
        };

        const localeState = locale(initialState, loaded({}));
        expect(localeState).eql(expectedState);
      });

      it('and keys parameter, adds to loadedKeys', () => {
        const expectedState = {
          currentLocale: defaultLocale,
          sourcePrefixes: [],
          loadedLocales: [],
          loadedKeys: ['foo'],
        };

        const localeState = locale(initialState, loaded({ keys: ['foo'] }));
        expect(localeState).eql(expectedState);
      });

      it('and sourcePrefix parameter, adds to sourcePrefixes', () => {
        const expectedState = {
          currentLocale: defaultLocale,
          sourcePrefixes: ['foo'],
          loadedLocales: [],
          loadedKeys: [],
        };

        const localeState = locale(
          initialState,
          loaded({ sourcePrefix: 'foo' })
        );
        expect(localeState).eql(expectedState);
      });

      it('and locale parameter, adds to loadedLocales', () => {
        const expectedState = {
          currentLocale: defaultLocale,
          sourcePrefixes: [],
          loadedLocales: ['foo'],
          loadedKeys: [],
        };

        const localeState = locale(initialState, loaded({ locale: 'foo' }));
        expect(localeState).eqls(expectedState);
      });
    });
  });
});
