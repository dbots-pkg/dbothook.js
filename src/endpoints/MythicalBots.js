const Endpoint = require('../Endpoint');

/**
 * @private
 */
class MythicalBots extends Endpoint {
  get name() {
    return 'mythicalbots';
  }

  authorize(request, authSecret) {
    return request.get('Authorization') === authSecret;
  }

  parseRequest(request) {
    return {
      type: 'vote',
      test: false,
      userId: request.body.user,
      botId: null,
      username: null,
      discriminator: null
    };
  }
}

module.exports = MythicalBots;