// const {subject} = require('@casl/ability');
// const {policyFor} = require('../../utils/index');
// const Invoice = require('./model');

// const show = async (req, res, next) => {
//     try {
//         let policy = policyFor(req.user);
//         let subjectInvoice = subject('Invoice', {...invoice, user_id: invoice.user._id});
//         if(!policy.can('read', subjectInvoice)) {
//             return res.json({
//                 error: 1,
//                 message: 'Anda tidak memiliki akses ke invoice ini'
//             });
//         }

//         let {order_id} = req.params;
//         let invoice = 
//         await Invoice
//         .findOne({order: order_id})
//         .populate('order')
//         .populate('user');

//     return res.json(invoice);
//     } catch (err) {
//         return res.json({
//             error: 1,
//             message: err.message
//         });
//     }
// }

// module.exports = {
//     show
// }

const { subject } = require('@casl/ability');
const { policyFor } = require('../../utils/index');
const Invoice = require('./model');

const index = async (req, res, next) => {
    try {
        let policy = policyFor(req.user);
        let invoices = await Invoice.find().populate('order').populate('user');
        let subjectInvoices = invoices.map(invoice => subject('Invoice', { ...invoice, user_id: invoice.user._id }));

        if (!policy.can('read', subjectInvoices)) {
            return res.json({
                error: 1,
                message: 'Anda tidak memiliki akses untuk melihat invoice'
            });
        }

        return res.json(invoices);
    } catch (err) {
        return res.json({
            error: 1,
            message: err.message
        });
    }
}

module.exports = {
    index
}
