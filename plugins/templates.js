'use strict'

const fp = require('fastify-plugin')
const path = require('path')
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
    fastify.register(require('@fastify/view'), {
        root: path.join(__dirname,'..', 'templates'),
        prefix: '/templates/',
        errorHandler: false,
        engine: {
            ejs: require("ejs"),
        },

    })
})