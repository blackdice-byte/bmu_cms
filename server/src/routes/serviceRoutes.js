const buildCrudRouter = require('../utils/crudRoutes');
const controller = require('../controllers/serviceController');

module.exports = buildCrudRouter(controller);
