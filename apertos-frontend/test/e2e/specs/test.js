module.exports = {
  'e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(`${devServer}/#/datasets`)
      .waitForElementVisible('#app', 5000)
      .waitForElementVisible('.dataset', 5000)
      .click('div.dataset:nth-of-type(1)')
      .waitForElementVisible('.dataset-details', 5000)
      .end();
  },
};
