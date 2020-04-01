const Endpoint = require('../Endpoint');

/**
 * @private
 * @see https://docs.botsfordiscord.com/webhooks/receiving-votes
 */
class BotsForDiscord extends Endpoint {
  get name() {
    return 'botsfordiscord';
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

module.exports = BotsForDiscord;