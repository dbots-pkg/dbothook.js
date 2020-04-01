const Endpoint = require('../Endpoint');

/**
 * @private
 * @see https://github.com/discordbots/botlister/wiki/User-Object
 */
class DiscordBotList extends Endpoint {
  get name() {
    return 'discordbotlist';
  }

  authorize(request, authSecret) {
    if (!request.get('X-DBL-Signature') || !request.get('X-DBL-Signature').includes(' '))
      return false;
    
    const [auth, timestamp] = request.get('X-DBL-Signature').split(' ');

    // Rejects request if timestamp difference is more than 2 minutes
    // from https://discordbotlist.com/api-docs
    if (!parseInt(timestamp) || Date.now() - parseInt(timestamp) > 120000)
      return false;

    return auth === authSecret;
  }

  parseRequest(request) {
    return {
      type: 'vote',
      test: false,
      userId: request.body.id,
      botId: null,
      username: request.body.username,
      discriminator: request.body.discriminator
    };
  }
}

module.exports = DiscordBotList;