import { TranslatorContext, Storage } from 'react-jhipster';

import { EnhancedStore, Tuple, ThunkDispatch } from '@reduxjs/toolkit';
import { UnknownAction, StoreEnhancer } from 'redux';
import { setLocale } from '../shared/reducers/locale';

TranslatorContext.setDefaultLocale('en');
TranslatorContext.setRenderInnerTextForMissingKeys(false);

export const languages: any = {
  en: { name: 'English' },
  ru: { name: 'Русский' },
  fr: { name: 'Français' },
  it: { name: 'Italiano' },
};

export const locales = Object.keys(languages).sort();

export const registerLocale = (
  store: EnhancedStore<
    { [x: string]: any },
    UnknownAction,
    Tuple<
      [
        StoreEnhancer<{
          dispatch: ThunkDispatch<
            { [x: string]: any },
            undefined,
            UnknownAction
          >;
        }>,
        StoreEnhancer,
      ]
    >
  >
) => {
  store.dispatch(setLocale(Storage.session.get('locale', 'en')));
};
