const MedicalRecord = require('../models/MedicalRecord');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(MedicalRecord, {
  populate: [
    { path: 'patient', select: 'fullName patientId' },
    { path: 'doctor', select: 'name title' },
    { path: 'department', select: 'name' },
  ],
  searchFields: ['diagnosis', 'symptoms'],
  defaultSort: '-visitDate',
});
