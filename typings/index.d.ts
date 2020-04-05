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
export type ServiceKey = string

/**
 * The type of event the {@link RichEvent} is. This would be most commonly `vote`.
 * * vote
 * * like (from listmybots)
 * * unlike (from listmybots)
 * @typedef {string} RichEventType
 */
export type RichEventType = string

/**
 * An object that includes authorization secrets for all botlists.
 * Each key can either have a secret or be `true` to accept *all* requests regardless of authorization.
 *
 * Note: `arcanebotcenter` and `botlistspace` gives you a secret instead of setting one.
 * @typedef {Object.<ServiceKey, string|boolean>} AuthorizationSecrets
 */
export interface AuthorizationSecrets {
    [key: string]: string | boolean
}

/**
 * Options for a hook.
 * @typedef {Object} HookOptions
 * @property {AuthorizationSecrets} [authSecrets] The authorization secrets the hook will use
 * @property {Express} [app] The application to use, will initiate a new application if not defined
 */
export interface HookOptions {
    authSecrets?: AuthorizationSecrets
    app?: Express
}

/**
 * A generic event object.
 * @typedef {Object} Event
 * @property {ServiceKey} list The service endpoint this event occured in
 * @property {Request} request The request that emitted this event
 */
export interface Event {
    list: ServiceKey
    request: Request
}

/**
 * An event object that is returned and parsed at the end of an endpoint call.
 * See the README.md of dbothook.js to see which service returns what values.
 * @typedef {Object} RichEvent
 * @extends Event
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
export interface RichEvent {
    data: any
    timestamp: number
    type: RichEventType
    test: boolean
    userId: string
    botId?: string
    username?: string
    discriminator?: string
}

/**
 * A event emitted after an error.
 * @typedef {Object} ErrorEvent
 * @extends Event
 * @property {Error} error The error that occurred
 */
export interface ErrorEvent {
    error: Error
}

export class DBotHook {
    constructor(options?: HookOptions);
    /**
     * Whether or not endpoints has been added
     * @type {boolean}
     */
    endpointsAdded: boolean
    /**
     * The authorization secrets the hook is using
     * @type {AuthorizationSecrets}
     */
    authSecrets: AuthorizationSecrets
    /**
     * The express application being used
     * @type {Express}
     */
    app: Express
    /**
     * The server created from {@link #listen}
     * @type {?http.Server}
     */
    server: http.Server
    /**
     * Loads endpoints into the application
     * @param {string} [prefix='/'] The prefix to add before the path (which would be the {@link ServiceKey})
     */
    addEndpoints(prefix?: string): void
    /**
     * Convenience method for app.listen()
     * @param {...any} args The args that are sent to the application
     * @see https://expressjs.com/en/4x/api.html#app.listen
     */
    listen(...args: any[]): void
}
