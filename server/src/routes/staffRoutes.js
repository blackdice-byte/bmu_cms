const buildCrudRouter = require('../utils/crudRoutes');
const controller = require('../controllers/staffController');

module.exports = buildCrudRouter(controller);
