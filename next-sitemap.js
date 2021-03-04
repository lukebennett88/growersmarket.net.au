const siteSettings = require('./src/data/site-settings.json');

module.exports = {
  siteUrl: siteSettings.siteUrl,
  generateRobotsTxt: true,
};
