const express = require('express');
const router = express.Router();
const CodingProblem = require("../models/dailyCodingModel")

router.get('/', function(req, res, next) {
  res.send('Welcome to my very own API ! Make yourself at home and RTFM ;)');
});

router.get('/coding-problems', async (req, res) => {
  const problems = await CodingProblem.find();
  res.status(200).send(problems);
})

router.get("/coding-problems/:id", async (req, res) => {
  try {
    const problem = await CodingProblem.findOne({ number: req.params.id });
    res.status(200).send(problem);
  } catch {
    res.status(404).send({ error: "This Coding Problem doesn't exist!" });
  }
});

router.post("/coding-problems", async (req, res) => {
  try {
    const problem = new CodingProblem({
      number: req.body.number,
      difficulty: req.body.difficulty,
      statement: req.body.statement
    });
    await problem.save();
    res.status(201).send(problem);
  } catch {
    res.status(400).send("Invalid schema, check the documentation to see the correct schema")
  }
})

router.delete("/coding-problems/:id", async (req, res) => {
  try {
    await CodingProblem.deleteOne({ number: req.params.id });
    res.status(200).send("This problem was removed successfully");
  } catch {
    res.status(404).send("This problem doesn't exist!");
  }
});

router.delete("/coding-problems", async (req, res) => {
  try {
    await CodingProblem.remove();
    res.status(200).send("All problems removed");
  } catch {
    res.status(404).send("No problems to remove");
  }
})

module.exports = router;
