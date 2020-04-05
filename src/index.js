const EventEmitter = require('eventemitter3');
const express = require('express');
const path = require('path');
const fs = require('fs');

/**
 * A class that posts server count to listing site(s).
 * @constructor
 * @param {HookOptions} [options] The options needed to construct the hook
 */
class DBotHook extends EventEmitter {
  constructor(options = {}) {
    super();
    if (typeof options !== 'object')
      throw new Error('The options are not in an object.');

    /**
     * Whether or not endpoints has been added
     * @type {boolean}
     */
    this.endpointsAdded = false;

    /**
     * The authorization secrets the hook is using
     * @type {AuthorizationSecrets}
     */
    this.authSecrets = options.authSecrets || {};

    /**
     * The express application being used
     * @type {Express}
     */
    this.app = options.app || express();

    /**
     * The server created from {@link #listen}
     * @type {?http.Server}
     */
    this.server = null;
  }

  /**
   * Loads endpoints into the application
   * @param {string} [prefix='/'] The prefix to add before the path (which would be the {@link ServiceKey})
   */
  addEndpoints(prefix = '/') {
    if (this.endpointsAdded) return;
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Load all endpoints from the "endpoints" folder
    const endpoints = fs.readdirSync(path.join(__dirname, './endpoints'));
    for (let i = 0; i < endpoints.length; i++) {
      const endpointClass = require(path.join(__dirname, './endpoints', endpoints[i]));
      const endpoint = new endpointClass(this);
      this.app.use(prefix + endpoint.name, endpoint.createRoute());
    }

    this.endpointsAdded = true;
  }

  /**
   * Convenience method for app.listen()
   * @param {...any} args The args that are sent to the application
   * @see https://expressjs.com/en/4x/api.html#app.listen
   */
  listen(...args) {
    if (!this.endpointsAdded) this.addEndpoints();
    return this.server = this.app.listen(...args);
  }
}

module.exports = DBotHook;

/**
 * A key that a service uses to identify itself. Available services:
 * * arcanebotcenter
 * * botlistspace
 * * botsfordiscord
 * * discordboats
 * * discordbotlist
 * * glennbotlist
 * * listmybots
 * * mythicalbots
 * * topgg
 * @typedef {string} ServiceKey
 */

/**
 * The type of event the {@link RichEvent} is. This would be most commonly `vote`.
 * * vote
 * * like (from listmybots)
 * * unlike (from listmybots)
 * @typedef {string} RichEventType
 */

/**
 * An object that includes authorization secrets for all botlists.
 * Each key can either have a secret or be `true` to accept *all* requests regardless of authorization.
 *
 * Note: `arcanebotcenter` and `botlistspace` gives you a secret instead of setting one.
 * @typedef {Object.<ServiceKey, string|boolean>} AuthorizationSecrets
 */

/**
 * Options for a hook.
 * @typedef {Object} HookOptions
 * @property {AuthorizationSecrets} [authSecrets] The authorization secrets the hook will use
 * @property {Express} [app] The application to use, will initiate a new application if not defined
 */

/**
 * A generic event object.
 * @typedef {Object} Event
 *
 * These properties need to be synched with RichEvent and ErrorEvent.
 * There is no JSDoc way of extending typdefs that compiles into an extended interface in TS
 * or that is correctly read as an extension by the docs website.
 * @property {ServiceKey} list The service endpoint this event occured in
 * @property {Request} request The request that emitted this event
 */

/**
 * An event object that is returned and parsed at the end of an endpoint call.
 * See the README.md of dbothook.js to see which service returns what values.
 * @typedef {Object} RichEvent
 *
 * These properties are from the Event typedef:
 * @property {ServiceKey} list The service endpoint this event occured in
 * @property {Request} request The request that emitted this event
 *
 * @property {Object} data The raw data that the service posted
 * @property {number} timestamp The time when this event was emitted
 * @property {RichEventType} type The type of event
 * @property {boolean} test Whether or not the event was a test sent from the service.
 * Make sure you check this first before processing anything.
 * @property {string} userId The user's ID that emitted the event
 * @property {string} [botId] The bot's ID that the user is calling the event towards
 * @property {string} [username] The user's username
 * @property {string} [discriminator] The user's discriminator (i.e. `#0001`)
 */

/**
 * A event emitted after an error.
 * @typedef {Object} ErrorEvent
 *
 * These properties are from the Event typedef:
 * @property {ServiceKey} list The service endpoint this event occured in
 * @property {Request} request The request that emitted this event
 *
 * @property {Error} error The error that occurred
 */
