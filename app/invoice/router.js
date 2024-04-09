const router = require('express').Router();
const invoiceController = require('./controller');

router.get(
    '/invoices',
    invoiceController.index
);

module.exports = router