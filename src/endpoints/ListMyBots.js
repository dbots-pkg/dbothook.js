const Endpoint = require('../Endpoint');

/**
 * @private
 */
class ListMyBots extends Endpoint {
  get name() {
    return 'listmybots';
  }

  authorize(request, authSecret) {
    return request.get('Authorization') === authSecret;
  }

  parseRequest(request) {
    return {
      type: request.body.event,
      test: false,
      userId: request.body.userId,
      botId: request.body.botId,
      username: null,
      discriminator: null
    };
  }
}

module.exports = ListMyBots;