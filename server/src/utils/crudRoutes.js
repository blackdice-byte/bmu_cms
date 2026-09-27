const express = require('express');
const { protect, authorize, optionalAuth } = require('../middleware/auth');

// Builds the standard REST routes shared by the content resources:
//   GET    /            public (published only) or full list when authenticated
//   GET    /:id         public (published only) or full detail when authenticated
//   POST   /            admin + editor
//   PUT    /:id         admin + editor
//   DELETE /:id         admin + editor
const buildCrudRouter = (controller, { mutateRoles = ['admin', 'editor'] } = {}) => {
  const router = express.Router();

  router.get('/', optionalAuth, controller.getAll);
  router.get('/:id', optionalAuth, controller.getOne);
  router.post('/', protect, authorize(...mutateRoles), controller.create);
  router.put('/:id', protect, authorize(...mutateRoles), controller.update);
  router.delete('/:id', protect, authorize(...mutateRoles), controller.remove);

  return router;
};

module.exports = buildCrudRouter;
