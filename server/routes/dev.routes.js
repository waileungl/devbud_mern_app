// import the controller to use the instantiated model
const DevController = require('../controllers/dev.controller');

module.exports = (app) => {
  app.get('/api/devs', DevController.findAllDevs);
  app.get('/api/devs/:id', DevController.findOneDev);
  app.post('/api/devs', DevController.createDev);
<<<<<<< HEAD
  app.post('/api/register', DevController.emailValidation);
  app.post('/api/compile', DevController.compileDev)
=======
  app.post('/api/compile', DevController.compileDev);
>>>>>>> 5a3fa2a5d1d0fa7d62796bd5eb99cf9907cb0eb4
  app.put('/api/devs/:id', DevController.updateExistingDev);
  app.delete('/api/devs/:id', DevController.deleteDev);
};
