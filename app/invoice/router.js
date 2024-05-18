const router = require('express').Router();
const invoiceController = require('./controller');

// Rute untuk menampilkan satu invoice berdasarkan ID
// router.get(
//     '/invoices/:invoice_id',
//     invoiceController.show
// );

// Rute untuk menampilkan semua invoice
router.get(
    '/invoices',
    invoiceController.index
);

module.exports = router;
