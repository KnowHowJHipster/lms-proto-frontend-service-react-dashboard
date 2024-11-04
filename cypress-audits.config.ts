// eslint-disable-next-line filename-rules/match
import { defineConfig } from 'cypress';
import defaultConfig from './cypress.config';

export default defineConfig({
  ...defaultConfig,
  e2e: {
    ...defaultConfig.e2e,
    specPattern: 'cypress/e2e/**/*.audits.ts',
  },
});
