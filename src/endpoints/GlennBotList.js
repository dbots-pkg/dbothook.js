const Endpoint = require('../Endpoint');

/**
 * @private
 */
class GlennBotList extends Endpoint {
  get name() {
    return 'glennbotlist';
  }

  authorize(request, authSecret) {
    return request.body.auth === authSecret;
  }

  parseRequest(request) {
    return {
      type: 'vote',
      test: !!request.body.test,
      userId: request.body.id,
      botId: request.body.botid,
      username: null,
      discriminator: null
    };
  }
}

module.exports = GlennBotList;