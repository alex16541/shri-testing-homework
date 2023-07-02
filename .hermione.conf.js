module.exports = {
  sets: {
    desktop: {
      files: "test/hermione",
    },
  },
  screenshotDelay: 1000,
  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1920,
        height: 1080,
      }
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
