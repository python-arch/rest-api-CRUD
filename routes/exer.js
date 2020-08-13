const router = require("express").Router();
const exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  exercise
    .find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("error " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("exercise added!"))
    .catch((err) => res.json("error" + err));
});
router.route("/:id").get((req, res) => {
  exercise
    .findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("error" + err));
});

router.route("/:id").delete((req, res) => {
  exercise
    .findByIdAndDelete(req.params.id)
    .then((exercise) => res.json("exercise deleted"))
    .catch((err) => res.status(400).json(`error is ${err}`));
});

router.route("/update/:id").post((req, res) => {
  exercise
    .findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("exercise updated!!"))
        .catch((err) => res.status(400).json(`error ${err}`));
    })
    .catch((err) => res.status(400).json("error" + err));
});
module.exports = router;
