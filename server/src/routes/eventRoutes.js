const buildCrudRouter = require('../utils/crudRoutes');
const controller = require('../controllers/eventController');

module.exports = buildCrudRouter(controller);
