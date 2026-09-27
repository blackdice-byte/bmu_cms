const buildCrudRouter = require('../utils/crudRoutes');
const controller = require('../controllers/programController');

module.exports = buildCrudRouter(controller);
