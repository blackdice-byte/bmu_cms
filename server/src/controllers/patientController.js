const Patient = require('../models/Patient');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(Patient, {
  populate: { path: 'department', select: 'name' },
  searchFields: ['fullName', 'patientId', 'phone', 'email'],
  defaultSort: '-createdAt',
});
