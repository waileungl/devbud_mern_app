// import the controller to use the instantiated model
const DevController = require('../controllers/dev.controller');

module.exports = (app) => {
  app.get('/api/devs', DevController.findAllDevs);
  app.get('/api/devs/:id', DevController.findOneDev);
  app.post('/api/devs', DevController.createDev);
  app.put('/api/devs/:id', DevController.updateExistingDev);
  app.delete('/api/devs/:id', DevController.deleteDev);
};
