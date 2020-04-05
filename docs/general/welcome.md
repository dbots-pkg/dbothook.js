<div align="center">
  <p>
    <img src="static/logo.png" alt="dbothook.js logo" width="200" />
  </p>
  <p>A webhook receiver for all botlists.</p>
  <p>
    <a href="https://www.npmjs.com/package/dbothook"><img src="https://img.shields.io/npm/v/dbothook.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/dbothook"><img src="https://img.shields.io/npm/dt/dbothook.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://david-dm.org/dbots-pkg/dbothook.js"><img src="https://img.shields.io/david/dbots-pkg/dbothook.js.svg?maxAge=3600" alt="Dependencies" /></a>
    <br/>
    <a href="https://github.com/dbots-pkg/dbothook.js/actions?query=workflow%3A%22Source+code+linting%22"><img src="https://github.com/dbots-pkg/dbothook.js/workflows/Source%20code%20linting/badge.svg" alt="Linting state" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/dbothook/"><img src="https://nodei.co/npm/dbothook.png" alt="NPM info" /></a>
  </p>
</div>

<!-- omit in toc -->
# Table of Contents
- [About](#about)
- [Installing](#installing)
- [Example](#example)
- [Supported Services](#supported-services)
- [Contribution](#contribution)
- [Other Links](#other-links)

## About
`dbothook` helps [Discord](https://discordapp.com) bot developers recieve webhook events from multiple bot lists. You can create an express application straight from the hook or integrate endpoints into an existing application.

## Installing
You can install dbothook by running this command:
```sh
# Stable
npm i dbothook
yarn add dbothook

# Master
npm i dbots-pkg/dbothook.js#master
yarn add ssh://github.com/dbots-pkg/dbothook.js#master
```

## Example
```js
const DBotHook = require('dbothook');
const hook = new DBotHook({
    authSecrets: {
        topgg: '…',
        discordboats: '…',
        discordbotlist: '…',
        botsfordiscord: '…'
    }
});

hook.listen(5478);
hook.on('called', event => {
  // Give them some perks...
});

// This should open endpoints for each bot list
// For example, you can set your webhook URL to "https://some.site/topgg" and start collecting requests.
```

## Supported Services
| Service | Key | Returns `botId`? | Returns `username` & `discriminator`? |
| :-- | :-- | :-: | :-: |
| [Arcane Bot Center](https://arcane-center.xyz/) | `arcanebotcenter` | ✅ | ✅ |
| [Botlist.space](https:/botlist.space/) | `botlistspace` | ✅ | ✅ |
| [Bots For Discord](https://botsfordiscord.com/) | `botsfordiscord` | ✅ | ❌ |
| [Discord Boats](https://discord.boats/) | `discordboats` | ✅* | ✅ |
| [Discord Bot List](https://discordbotlist.com/) | `discordbotlist` | ❌ | ✅ |
| [Glenn Bot List](https://glennbotlist.xyz/) | `glennbotlist` | ✅ | ❌ |
| [List My Bots](https://listmybots.com/) | `listmybots` | ✅ | ❌ |
| [Mythical Bots](https://mythicalbots.xyz/) | `mythicalbots` | ❌ | ❌ |
| [Top.GG](https://top.gg/) | `topgg` | ✅ | ❌ |

*The bot ID from Discord Boats events will be recieved from the URL or the avatar URL in the payload. If your bot has a vanity URL (assuming Discord Boats posts that) and does not have an avatar, the bot ID will be `null`.

## Contribution
Any contribution may be useful for the package! Make sure when making issues or PRs that the issue has not been addressed yet in a past issue/PR.

## Other Links
- [NPM](https://npmjs.org/package/dbothook)
- [Yarn](https://yarn.pm/dbothook)
- [JSDelivr](https://www.jsdelivr.com/package/npm/dbothook)
- [David (Dependency Watcher)](https://david-dm.org/dbots-pkg/dbothook.js)
- [dbots GitHub Organization](https://github.com/dbots-pkg)
