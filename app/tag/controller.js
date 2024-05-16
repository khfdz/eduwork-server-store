const Tag = require('./model');
const path = require('path');
const fs = require('fs');
const config = require('../config');

const store = async (req, res, next) => {
    try {
        let payload = req.body;

        //update karena relasi dengan category
        if(payload.category){
            let category = 
            await Category
            .findOne({name: {
                $regex: payload.category,
                $options: 'i'
            }})
            if(category){
                payload = {...payload, category: category._id}
            } else {
                delete payload.category
            }
        }

        //update karena relasi dengan tag
        if(payload.tags && payload.tags.length > 0){
            let tags = 
            await Tag
            .find({name: {$in: payload.tags}});
            if(tags.length){
                payload = {...payload, tags: tags.map(tag => tag._id)};
            } else {
                delete payload.tags
            }
        }

        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {
                    let tag = new Tag({ ...payload, image_url: filename });
                    await tag.save();
                    fs.unlinkSync(tmp_path); // Hapus file sementara
                    return res.json(tag);
                } catch (err) {
                    fs.unlinkSync(target_path);
                    next(err);
                }
            });

            src.on('error', (err) => {
                next(err);
            });

        } else {
            let tag = new Tag(payload);
            await tag.save();
            return res.json(tag);
        }

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
};

const update = async (req, res, next) => {
    try {
        let payload = req.body;
        let { id } = req.params;

        //update karena relasi dengan category
        if(payload.category){
            let category = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } });
            if (category) {
                payload = { ...payload, category: category._id };
            } else {
                delete payload.category;
            }
        }

        //update karena relasi dengan tag
        if(payload.tags && payload.tags.length > 0){
            let tags = await Tag.find({ name: { $in: payload.tags.map(tag => new RegExp(tag, 'i')) } });
            if (tags.length) {
                payload = { ...payload, tags: tags.map(tag => tag._id) };
            } else {
                delete payload.tags;
            }
        }

        if (req.file) {
            let tmp_path = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let filename = req.file.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            src.on('end', async () => {
                try {
                    let tag = await Tag.findById(id);
                    let currentImage = `${config.rootPath}/public/images/products/${tag.image_url}`;

                    if (fs.existsSync(currentImage)) {
                        fs.unlinkSync(currentImage);
                    }

                    tag = await Tag.findByIdAndUpdate(id, { ...payload, image_url: filename }, {
                        new: true,
                        runValidators: true
                    });
                    fs.unlinkSync(tmp_path); // Hapus file sementara
                    return res.json(tag);
                } catch (err) {
                    fs.unlinkSync(target_path);
                    next(err);
                }
            });

            src.on('error', (err) => {
                next(err);
            });

        } else {
            let tag = await Tag.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true
            });
            return res.json(tag);
        }
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
        let tag = await Tag.findByIdAndDelete(req.params.id);
        return res.json(tag);
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
        let tag = await Tag.find();
        return res.json(tag);
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