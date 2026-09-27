const buildPrivateCrudRouter = require('../utils/privateCrudRoutes');
const controller = require('../controllers/medicalRecordController');

module.exports = buildPrivateCrudRouter(controller);
