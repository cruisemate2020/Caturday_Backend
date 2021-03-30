/**Our connection to the front-end */
const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const mongoose = require("mongoose");

const User = require("../models/User");
const RescueStory = require("../models/RescueStory");

router.get(`/`, (req, res) => {
  res.json({
    backend: "🔥 Backend Working",
  });
});

router.post("/rescue-story", (req, res) => {
  const { name, age, breed, story, imageUrl } = req.body;
  RescueStory.create({
    name,
    age,
    breed,
    story,
    imageUrl,
    userId: req.user._id,
  })
    .then((createdStory) => {
      res.json(createdStory);
    })
    .catch((err) => res.json(err));
});

router.get("/rescue-story", (req, res) => {
  RescueStory.find()
    .populate({ path: "userId", select: "username" })
    .then((foundStories) => {
      res.json(foundStories);
    })
    .catch((err) => res.json(err));
});

router.get("/editstory/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  RescueStory.findById(req.params.id)
    .populate({ path: "userId", select: "username" })
    .then((story) => {
      res.status(200).json(story);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

router.put("/edit/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  RescueStory.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Story with ${req.params.id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/profile/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.json(error.response.data);
    });
});

router.put("/edit-user/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `User with ${req.params.id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.json(error);
    });
});

router.delete("/rescue-story/delete/:id", (req, res) => {
  RescueStory.findByIdAndRemove(req.params.id)
    .then(() => {
      console.log("deleted! - backend");
    })
    .catch((err) => res.json(err));
});

module.exports = router;
