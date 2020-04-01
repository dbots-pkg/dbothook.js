const Endpoint = require('../Endpoint');

/**
 * @private
 */
class BotListSpace extends Endpoint {
  get name() {
    return 'botlistspace';
  }

  authorize(request, authSecret) {
    return request.get('Authorization') === authSecret;
  }

  parseRequest(request) {
    return {
      type: 'vote',
      test: false,
      userId: request.body.user.id,
      botId: request.body.bot,
      username: request.body.user.username,
      discriminator: request.body.user.discriminator
    };
  }
}

module.exports = BotListSpace;