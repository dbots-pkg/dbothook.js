import { Express, Request } from 'express'
import * as http from 'http'

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
 */
export type ServiceKey = string

/**
 * The type of event the {@link RichEvent} is. This would be most commonly `vote`.
 * * vote
 * * like (from listmybots)
 * * unlike (from listmybots)
 */
export type RichEventType = string

/**
 * An object that includes authorization secrets for all botlists.
 * Each key can either have a secret or be `true` to accept *all* requests regardless of authorization.
 *
 * Note: `arcanebotcenter` and `botlistspace` gives you a secret instead of setting one.
 */
export interface AuthorizationSecrets {
    [key: string]: string | boolean
}

/**
 * Options for a hook.
 * @property [authSecrets] - The authorization secrets the hook will use
 * @property [app] - The application to use, will initiate a new application if not defined
 */
export interface HookOptions {
    authSecrets?: AuthorizationSecrets
    app?: Express
}

/**
 * A generic event object.
 * @property list - The service endpoint this event occured in
 * @property request - The request that emitted this event
 */
export interface Event {
    list: ServiceKey
    request: Request
}

/**
 * An event object that is returned and parsed at the end of an endpoint call.
 * See the README.md of dbothook.js to see which service returns what values.
 * @property list - The service endpoint this event occured in
 * @property request - The request that emitted this event
 * @property data - The raw data that the service posted
 * @property timestamp - The time when this event was emitted
 * @property type - The type of event
 * @property test - Whether or not the event was a test sent from the service.
 * Make sure you check this first before processing anything.
 * @property userId - The user's ID that emitted the event
 * @property [botId] - The bot's ID that the user is calling the event towards
 * @property [username] - The user's username
 * @property [discriminator] - The user's discriminator (i.e. `#0001`)
 */
export interface RichEvent {
    list: ServiceKey
    request: Request
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
 * @property list - The service endpoint this event occured in
 * @property request - The request that emitted this event
 * @property error - The error that occurred
 */
export interface ErrorEvent {
    list: ServiceKey
    request: Request
    error: Error
}

/**
 * A class that posts server count to listing site(s).
 * @param [options] - The options needed to construct the hook
 */
export class DBotHook {
    constructor(options?: HookOptions);
    /**
     * Whether or not endpoints has been added
     */
    endpointsAdded: boolean
    /**
     * The authorization secrets the hook is using
     */
    authSecrets: AuthorizationSecrets
    /**
     * The express application being used
     */
    app: Express
    /**
     * The server created from {@link #listen}
     */
    server: Server
    /**
     * Loads endpoints into the application
     * @param [prefix = '/'] - The prefix to add before the path (which would be the {@link ServiceKey})
     */
    addEndpoints(prefix?: string): void
    /**
     * Convenience method for app.listen()
     * @param args - The args that are sent to the application
     */
    listen(...args: any[]): void
}
