const express = require('express');
// const { findById } = require('../models/tree');
const Tree = require('../models/tree');
const router = express.Router();

router.get('/trees', (req, res, next) => {
  Tree.find().then((trees) => res.send(trees));
});
router.post('/trees', (req, res, next) => {
  Tree.create(req.body)
    .then((tree) => {
      res.send(tree);
    })
    .catch(next);
});
router.put('/trees/:id', (req, res, next) => {
  Tree.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
      Tree.findById({ _id: req.params.id }).then((tr) => {
        res.send(tr);
      });
    })
    .catch(next);
});
router.delete('/trees/:id', (req, res, next) => {
  console.log(req.body.id);
  Tree.findByIdAndRemove({ _id: req.params.id })
    .then((obj) => {
      res.send(obj);
    })
    .catch(next);
});

module.exports = router;
