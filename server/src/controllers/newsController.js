const News = require('../models/News');
const createCrudController = require('../utils/crudFactory');

module.exports = createCrudController(News, {
  populate: { path: 'author', select: 'name' },
  searchFields: ['title', 'excerpt', 'content'],
  publicFilter: { status: 'published' },
  defaultSort: '-publishedAt -createdAt',
});
