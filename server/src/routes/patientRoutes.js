const buildPrivateCrudRouter = require('../utils/privateCrudRoutes');
const controller = require('../controllers/patientController');

module.exports = buildPrivateCrudRouter(controller);
