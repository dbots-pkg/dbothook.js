const Endpoint = require('../Endpoint');

/**
 * @private
 * @see https://top.gg/api/docs#webhooks
 */
class TopGG extends Endpoint {
  get name() {
    return 'topgg';
  }

  authorize(request, authSecret) {
    return request.get('Authorization') === authSecret;
  }

  parseRequest(request) {
    return {
      type: 'vote',
      test: request.body.type === 'test',
      userId: request.body.user,
      botId: request.body.bot,
      username: null,
      discriminator: null
    };
  }
}

module.exports = TopGG;