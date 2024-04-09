const DeliveryAddress = require('./model');
const {subject} = require('@casl/ability');
const {policyFor} = require('../../utils');

const store = async (req, res, next) => {
    try {
        let payload = req.body;
        let user = req.user;
        let address = new DeliveryAddress({...payload, user: user._id});
        await address.save();
        return res.json(address);

    } catch (err) {
        if(err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        let {_id, ...payload} = req.body;
        let {id} = req.params;
        let address = await DeliveryAddress.findById(id);
        let subjectAddress = subject(`DeliveryAddress`, {...address, user_id: address.user});
        let policy = policyFor(req.user)
        if(!policy.can('update', subjectAddress)) {
            return res.json({
                error: 1,
                message: 'You are not allowed to update this address'
            })
        }

        address = await DeliveryAddress.findByIdAndUpdate(id, payload, {new: true});
        return res.json(address);

    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err);
    }
}


const destroy = async (req, res, next) => {
    try {
        let {id} = req.params;
        let address = await DeliveryAddress.findById(id);
        let subjectAddress = subject(`DeliveryAddress`, {...address, user_id: address.user});
        let policy = policyFor(req.user)
        if(!policy.can('delete', subjectAddress)) {
            return res.json({
                error: 1,
                message: 'You are not allowed to delete this address'
            })
        }

        address = await DeliveryAddress.findByIdAndDelete(id);
        res.json(address);
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err);
    }
}

const index = async (req, res, next) => {
    try {
        let address = await DeliveryAddress.find();
        return res.json(address);
    } catch (err) {
        if(err && err.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err);
    }
}


module.exports = {
    store,
    update,
    destroy,
    index
}