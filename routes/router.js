const app = require('../app');

async function routes(app, options) {
  app.get('/', (req, res) => {
    res.code(200).send("c'est la racine fraté");
  });
}

module.exports = routes;
