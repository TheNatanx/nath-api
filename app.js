require("dotenv").config();

const app = require('fastify')({
    logger: true,
});
const fastifyEnv = require('fastify-env');
const routes = require('./routes/router');
const mongoDB = require('./plugins/mongo-db');
const port = 3000;

app.register(fastifyEnv, {
    dotenv: true,
    schema: {
        type: 'object',
        required: [ 'MONGODB' ],
        properties: {
            MONGODB: {
                type: 'string',
                default: ''
            }
        }
    }
});
app.after(err => err?console.log(err):console.log('Env Plugin is ready.'))

app.register(routes);
app.after(err => err?console.log(err):console.log('Plugin for our routes is ready'));

app.register(mongoDB);
app.after(err => err?console.log(err):console.log('Plugin for MongoDB is ready'));

app.ready(err => err?console.log(err):console.log('All plugins are ready'));

app.setErrorHandler((error, req, res) => {
    if (error.validation) {
        res.status(422).send(new Error('validation failed'))
    }
});

app.listen(port, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1)
    }
    console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;
