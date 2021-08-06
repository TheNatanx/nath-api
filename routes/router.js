const dailyCodingController = new(require("../controllers/dailyCodingController"));

async function routes(app) {
  app.get('/', (req, res) => {
    res.status(200).send("Welcome to my very own API ! Make yourself at home and RTFM ;)");
  });

  app.get("/coding-problems", await dailyCodingController.get);

  app.get("/coding-problems/:id", await dailyCodingController.getbyId);

  app.post("/coding-problems", await dailyCodingController.post);

  app.delete("/coding-problems", await dailyCodingController.delete);

  app.delete("/coding-problems/:id", await dailyCodingController.deleteById);
}

module.exports = routes;
