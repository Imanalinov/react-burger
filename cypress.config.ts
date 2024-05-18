import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.viewportWidth = 1920;
      config.viewportHeight = 1080;
      return config;
    },
  },
});
