const buildCrudRouter = require('../utils/crudRoutes');
const controller = require('../controllers/pageController');

module.exports = buildCrudRouter(controller);
