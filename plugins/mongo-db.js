const fastifyPlugin = require('fastify-plugin')

async function mongoDB (fastify, options) {
    fastify.register(require('fastify-mongodb'), {
        forceClose: true,
        url: process.env.MONGODB
    })
}

module.exports = fastifyPlugin(mongoDB);
