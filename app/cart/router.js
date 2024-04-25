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

module.exports = router;