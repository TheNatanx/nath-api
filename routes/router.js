const express = require('express');
const router = express.Router();
const CodingProblem = require("../models/dailyCodingModel")

router.get('/', function(req, res, next) {
  res.send('Welcome to my very own API ! Make yourself at home and RTFM ;)');
});

router.get('/coding-problems',  (req, res) => {
  CodingProblem.find().then((problems) => {
    res.status(200).send(problems);
  }).catch(() => {
    res.status(404).send("No Coding Problem registered")
  });
});

router.get("/coding-problems/:id",  (req, res) => {
  CodingProblem.findOne({ number: req.params.id }).then((problem) => {
    if (!problem) throw new Error();
    res.status(200).send(problem);
    }).catch(() => {
      res.status(404).send("This Coding Problem doesn't exist!");
    });
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
});

router.delete("/coding-problems/:id",  (req, res) => {
  CodingProblem.deleteOne({ number: req.params.id }).then((nbOfDeletedDocuments) => {
    if (nbOfDeletedDocuments.deletedCount < 1) throw new Error();
    res.status(200).send("This problem was removed successfully");
  }).catch(() => {
    res.status(404).send("This problem doesn't exist!");
  });
});

router.delete("/coding-problems",  (req, res) => {
  CodingProblem.deleteMany().then((nbOfDeletedDocuments) => {
    if (nbOfDeletedDocuments.deletedCount < 1) throw new Error();
    res.status(200).send("All problems removed");
  }).catch(() => {
    res.status(404).send("No problems to remove");
  });
});

module.exports = router;
