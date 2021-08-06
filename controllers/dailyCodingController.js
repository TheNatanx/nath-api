const CodingProblem = require("../models/dailyCodingModel")

class DailyCodingController {
    async post(req, res) {
        try {
            const problem = new CodingProblem({
                number: req.body.number,
                difficulty: req.body.difficulty,
                statement: req.body.statement
            });
            await problem.save();
            return res.status(201).send(problem);
        } catch {
            return res.status(400).send("Invalid schema, check the documentation to see the correct schema")
        }
    }

    get(req, res) {
        return CodingProblem.find().then((problems) => {
            res.status(200).send(problems);
        }).catch(() => {
            res.status(404).send("No Coding Problem registered")
        });
    }

    getbyId(req, res) {
        return CodingProblem.findOne({ number: req.params.id }).then((problem) => {
            if (!problem) throw new Error();
            res.status(200).send(problem);
        }).catch(() => {
            res.status(404).send("This Coding Problem doesn't exist!");
        });
    }

    delete(req, res) {
        return CodingProblem.deleteMany().then((nbOfDeletedDocuments) => {
            if (nbOfDeletedDocuments.deletedCount < 1) throw new Error();
            res.status(200).send("All problems removed");
        }).catch(() => {
            res.status(404).send("No problems to remove");
        });
    }

    deleteById(req, res) {
        return CodingProblem.deleteOne({ number: req.params.id }).then((nbOfDeletedDocuments) => {
            if (nbOfDeletedDocuments.deletedCount < 1) throw new Error();
            res.status(200).send("This problem was removed successfully");
        }).catch(() => {
            res.status(404).send("This problem doesn't exist!");
        });
    }
}

module.exports = DailyCodingController;
