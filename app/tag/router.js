const router = require('express').Router();
const {police_check} = require('../../app/middlewares');
const tagController = require('./controller');
const multer = require('multer');
const os = require('os');

router.get('/tags', tagController.index);

router.post('/tags', 
    multer({dest: os.tmpdir()}).single('image'),
    police_check('create', 'Tag'), 
    tagController.store);

router.put('/tags/:id', 
    multer({dest: os.tmpdir()}).single('image'),
    police_check('update', 'Tag'),
    tagController.update);

router.delete('/tags/:id', 
    police_check('delete', 'Tag'),
    tagController.destroy);

module.exports = router;