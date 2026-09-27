const buildCrudRouter = require('../utils/crudRoutes');
const controller = require('../controllers/newsController');

module.exports = buildCrudRouter(controller);
