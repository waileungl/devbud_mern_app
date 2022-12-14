const Dev = require('../models/dev.model');

// READ ALL
module.exports.findAllDevs = (req, res) => {
  // use the model to execute a query
  Dev.find()
    .then((allDevs) => {
      // IMPORTANT what we return here is what we will receive in REACT!
      //   res.json({ ninjas: allDevs, status: 'ok' }); // Same as below, the one below is ES7 format
      res.json(allDevs); // returns an []
    })
    .catch((err) =>
      res.json({ message: 'something went wrong', serverError: err })
    );
};

// FIND ONE
module.exports.findOneDev = (req, res) => {
  Dev.findOne({ _id: req.params.id })
    .then((oneDev) => res.json({ dev: oneDev }))
    .catch((err) => res.json({ message: 'Something went wrong', error: err }));
};

// CREATE
module.exports.createDev = (req, res) => {
  //   console.log('req.body =', req.body);
  Dev.create(req.body)
    .then((newlyCreatedDev) => res.json({ dev: newlyCreatedDev }))
    .catch((err) => res.json({ message: 'Something went wrong', error: err }));
};

// UPDATE
module.exports.updateExistingDev = (req, res) => {
  Dev.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedDev) => res.json({ dev: updatedDev }))
    .catch((err) => res.json({ message: 'Something went wrong', error: err }));
};

// DELETE
module.exports.deleteDev = (req, res) => {
  Dev.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) => res.json({ message: 'Something went wrong', error: err }));
};
