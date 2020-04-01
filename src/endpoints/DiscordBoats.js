const Endpoint = require('../Endpoint');

/**
 * @private
 * @see https://docs.discord.boats/topics/webhooks
 */
class DiscordBoats extends Endpoint {
  get name() {
    return 'discordboats';
  }

  authorize(request, authSecret) {
    return request.get('Authorization') === authSecret;
  }

  parseRequest(request) {
    let botId = request.body.bot.url.split('/').reverse()[0];

    // For vanity URLs
    if (!/\d{18,19}/g.test(botId) && request.body.bot.avatar)
      botId = request.body.bot.avatar.split('/').reverse()[1];

    // For the extremely off chance that a bot with a vanity URL
    // does not have an avatar
    if (!/\d{18,19}/g.test(botId))
      botId = null;

    return {
      type: 'vote',
      test: false,
      userId: request.body.user.id,
      botId,
      username: request.body.user.username,
      discriminator: request.body.user.discriminator
    };
  }
}

module.exports = DiscordBoats;