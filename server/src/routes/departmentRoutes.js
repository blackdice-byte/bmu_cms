const buildCrudRouter = require('../utils/crudRoutes');
const controller = require('../controllers/departmentController');

module.exports = buildCrudRouter(controller);
