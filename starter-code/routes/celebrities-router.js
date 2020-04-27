const express = require("express");
const celebritiesRouter = express.Router();

const Celebrity = require("./../models/celebrity");

celebritiesRouter.get("/", (req, res, next) => {
  Celebrity.find({})
    .then((allCelebrities) => {
      console.log("results -> ", allCelebrities);
      res.render("celebrities/index", { allCelebrities: allCelebrities });
    })
    .catch((err) => next(err));
});


celebritiesRouter.post("/", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });
  newCelebrity
    .save()
    .then(() => {
      res.redirect("celebrities");
    })
    .catch(() => {
      res.render("celebrities/new");
    });
});

celebritiesRouter.get("/new", (req, res, next) => {
  res.render("celebrities/new");
});

celebritiesRouter.get("/show/:id", (req, res, next) => {
  const celebrityId = req.params.id;

  Celebrity.findById(celebrityId)
    .then((celebrityShow) => {
      console.log("results -> ", celebrityShow);
      res.render("celebrities/show", { celebrityShow: celebrityShow });
    })
    .catch((err) => next(err));
});

celebritiesRouter.post("/:id", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const celebrityId = req.params.id;

  Celebrity.update(celebrityId, { name, occupation, catchPhrase })
    .then((updatedCeleb) => {
      console.log("HERE", updatedCeleb);
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
});


celebritiesRouter.get("/:id/edit", (req, res, next) => {
  const celebrityId = req.params.id;

  Celebrity.findById(celebrityId)
    .then((celebrityDetails) => {
      console.log("THISSSS", celebrityDetails);
      res.render("celebrities/edit", { celebrityDetails: celebrityDetails });
    })
    .catch((err) => next(err));
});


celebritiesRouter.post("/:id/delete", (req, res, next) => {
  const celebrityId = req.params.id;

  Celebrity.findByIdAndRemove(celebrityId)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => next(err));
});

module.exports = celebritiesRouter;
