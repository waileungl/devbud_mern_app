// import the controller to use the instantiated model
const DevController = require('../controllers/dev.controller');


module.exports = (app) => {
  app.get('/api/devs', DevController.findAllDevs);
  app.get('/api/devs/:id', DevController.findOneDev);
  app.get('/api/devs/filter/:language', DevController.findDevsByLanguage);
  app.post('/api/devs', DevController.createDev);
  app.post('/api/register', DevController.emailValidation);
  app.post('/api/login', DevController.loginOneDev);
  app.post('/api/compile', DevController.compileDev)
  app.put('/api/devs/:id', DevController.updateExistingDev);
  app.delete('/api/devs/:id', DevController.deleteDev);
};
