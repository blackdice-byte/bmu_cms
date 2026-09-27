const express = require('express');
const { protect, authorize } = require('../middleware/auth');

// Like crudRoutes.js's buildCrudRouter, but nothing here is ever public -
// every route requires a logged-in session. Used for sensitive records
// (patients, medical records) that must never be reachable without auth,
// unlike the public content resources (departments, news, etc).
const buildPrivateCrudRouter = (
  controller,
  { viewRoles = ['admin', 'editor', 'viewer'], mutateRoles = ['admin', 'editor'], deleteRoles = ['admin'] } = {}
) => {
  const router = express.Router();

  router.use(protect);

  router.get('/', authorize(...viewRoles), controller.getAll);
  router.get('/:id', authorize(...viewRoles), controller.getOne);
  router.post('/', authorize(...mutateRoles), controller.create);
  router.put('/:id', authorize(...mutateRoles), controller.update);
  router.delete('/:id', authorize(...deleteRoles), controller.remove);

  return router;
};

module.exports = buildPrivateCrudRouter;
