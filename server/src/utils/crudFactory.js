const asyncHandler = require('./asyncHandler');

// Generic CRUD controller factory shared by the content resources
// (Department, Staff, Program, Service, Gallery, Event, Page, News).
// Each resource still gets its own thin controller file so routes/imports
// stay explicit, but the repetitive query/pagination/populate logic lives here.
const createCrudController = (Model, opts = {}) => {
  const { populate = '', searchFields = [], defaultSort = '-createdAt', publicFilter = null } = opts;

  const buildFilter = (query, { isPublic }) => {
    const filter = {};

    if (isPublic && publicFilter) {
      Object.assign(filter, publicFilter);
    }

    if (query.q && searchFields.length) {
      filter.$or = searchFields.map((field) => ({ [field]: { $regex: query.q, $options: 'i' } }));
    }

    ['status', 'category', 'department', 'level', 'type', 'patient', 'doctor'].forEach((key) => {
      if (query[key]) filter[key] = query[key];
    });

    if (query.isPublished !== undefined) {
      filter.isPublished = query.isPublished === 'true';
    }

    return filter;
  };

  const getAll = asyncHandler(async (req, res) => {
    const isPublic = !req.user;
    const filter = buildFilter(req.query, { isPublic });

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 20, 100);
    const skip = (page - 1) * limit;

    let queryBuilder = Model.find(filter).sort(req.query.sort || defaultSort).skip(skip).limit(limit);
    if (populate) queryBuilder = queryBuilder.populate(populate);

    const [items, total] = await Promise.all([queryBuilder, Model.countDocuments(filter)]);

    res.json({
      data: items,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) || 1 },
    });
  });

  const getOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const isSlugLookup = !id.match(/^[0-9a-fA-F]{24}$/);
    let queryBuilder = isSlugLookup ? Model.findOne({ slug: id }) : Model.findById(id);
    if (populate) queryBuilder = queryBuilder.populate(populate);

    const item = await queryBuilder;
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ data: item });
  });

  const create = asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    if (req.user) payload.createdBy = req.user._id;
    const item = await Model.create(payload);
    res.status(201).json({ data: item });
  });

  const update = asyncHandler(async (req, res) => {
    const payload = { ...req.body };
    if (req.user) payload.updatedBy = req.user._id;
    const item = await Model.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ data: item });
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ data: { _id: req.params.id } });
  });

  return { getAll, getOne, create, update, remove };
};

module.exports = createCrudController;
