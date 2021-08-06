require("dotenv").config();

const app = require('fastify')({
    logger: true
});
const mongoose = require('mongoose');
const routes = require('./routes/router');
const port = 3000;

mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Successfully connected to MongoDB")
}).catch(() => {
    console.log("Unable to connect to MongoDB")
});

app.register(routes);
app.after(err => err?console.log(err):console.log('Plugin for our routes is ready'));

app.ready(err => err?console.log(err):console.log('All plugins are ready'));

app.listen(port, (err) => {
    if (err) {
        app.log.error(err);
        process.exit(1)
    }
    console.log(`App listening at http://localhost:${port}`)
})

module.exports = app;
