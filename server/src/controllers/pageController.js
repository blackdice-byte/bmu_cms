const Page = require('../models/Page');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(Page, {
  searchFields: ['title', 'content'],
  publicFilter: { status: 'published' },
  defaultSort: 'title',
});
