const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl : 'https://phptravels.net',
    baseUrlPhones: 'https://www.bstackdemo.com/',
    testIsolation: true,
 },
});
