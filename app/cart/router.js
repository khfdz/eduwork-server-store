const router = require('express').Router();
const {police_check} = require('../../app/middlewares');
const cartController = require('./controller');

router.put(
    '/carts',
    police_check('update', 'Cart'),
    cartController.update
);

router.get(
    '/carts',
    police_check('view', 'Cart'),
    cartController.index
);

router.post(
    '/carts',
    police_check('create', 'Cart'),
    cartController.store
);

router.patch(
    '/carts/:id',
    police_check('update', 'Cart'),
    cartController.edit
)

router.delete(
    '/carts/:id',
    police_check('delete', 'Cart'),
    cartController.destroy
)

module.exports = router;