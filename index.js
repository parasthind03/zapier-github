const repoTrigger = require('./triggers/repo');
const issueCreate = require('./creates/issue');
const issueTrigger = require('./triggers/issue');
const commitTrigger = require('./triggers/commit');
const {
  config: authentication,
  befores = [],
  afters = [],
} = require('./authentication');

const App = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,

  beforeRequest: [...befores],

  afterResponse: [...afters],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {},

  triggers: {
    [repoTrigger.key]: repoTrigger,
    [issueTrigger.key]: issueTrigger,
    [commitTrigger.key]: commitTrigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: {},

  creates: {
    [issueCreate.key]: issueCreate,
  },
};

module.exports = App;
