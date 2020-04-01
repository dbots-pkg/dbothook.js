const express = require('express');

class Endpoint {
  constructor(hook) {
    this.router = express.Router();
    this.hook = hook;
  }

  get name() {
    return '';
  }

  // eslint-disable-next-line no-unused-vars
  authorize(_request, _authSecret) {
    return true;
  }

  // eslint-disable-next-line no-unused-vars
  parseRequest(_request) {
    return { type: 'upvote', test: false };
  }

  createRoute() {
    this.router.post('/', (request, response) => {
      try {
        /**
         * Emitted when any request is recieved.
         * @event DBotHook#request
         * @param {Event} event The event representing this
         */
        this.hook.emit('request', {
          list: this.name,
          request
        });

        if (this.hook.app.enabled('x-powered-by'))
          response.setHeader('X-Powered-By', 'dbothook.js/Express');

        const authSecret = this.hook.authSecrets[this.name];

        if (!authSecret)
          return response.status(404).send({
            ok: false,
            status: 404,
            message: 'This list does not have an authentication secret'
          });
        else if (authSecret !== true && !this.authorize(request, authSecret)) {
          /**
           * Emitted when a request fails to authenticate itself.
           * @event DBotHook#failedAuthentication
           * @param {Event} event The event representing this
           */
          this.hook.emit('failedAuthentication', {
            list: this.name,
            request
          });

          return response.status(401).send({
            ok: false,
            status: 401,
            message: 'Invalid authorization'
          });
        }

        const eventData = Object.assign({
          list: this.name,
          data: request.body,
          timestamp: Date.now(),
          request
        }, this.parseRequest(request));

        /**
         * Emitted when a request succeeds and has parsed the payload.
         * @event DBotHook#called
         * @param {RichEvent} event The event representing this
         */
        this.hook.emit('called', eventData);

        return response.status(200).send({
          ok: true,
          status: 200,
          message: 'Recieved the event!'
        });
      } catch (error) {
        /**
         * Emitted when a response has failed internally.
         * @event DBotHook#error
         * @param {ErrorEvent} event The event representing this
         */
        this.hook.emit('error', {
          list: this.name,
          request, error
        });
        return response.status(500).send({
          ok: false,
          status: 500,
          message: 'Internal error'
        });
      }
    });
    return this.router;
  }
}

module.exports = Endpoint;