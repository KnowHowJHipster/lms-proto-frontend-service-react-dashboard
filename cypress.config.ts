import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,
  fixturesFolder: 'cypress/fixtures',
  screenshotsFolder: 'node_modules/_cypress/screenshots',
  downloadsFolder: 'node_modules/_cypress/downloads',
  videosFolder: 'node_modules/_cypress/videos',
  chromeWebSecurity: true,
  viewportWidth: 1200,
  viewportHeight: 720,
  retries: 2,
  scrollBehavior: 'center',
  env: {
    authenticationUrl: '/api/authenticate',
    jwtStorageName: 'iqkv-authenticationToken',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    async setupNodeEvents(on, config) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (await import('./cypress/plugins/index')).default(on, config);
    },
    baseUrl: 'http://localhost:9000/',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    supportFile: 'cypress/support/index.ts',
    experimentalRunAllSpecs: true,
  },
});
