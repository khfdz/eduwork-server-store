const Product = require('../product/model');
const CartItem = require('../cart-item/model');

const update = async (req, res, next) => {
    try {
        const {items} = req.body;
        const productsIds = items.map(item => item.product._id);
        const products = await Product.find({_id: {$in: productsIds}});
        let cartItems = items.map(item => {
            let relatedProduct = products.find(product => product._id.toString() === item.product._id);
            return {
                product: relatedProduct._id,
                price: relatedProduct.price,
                image_url: relatedProduct.image_url,
                name: relatedProduct.name,
                user: req.user._id,
                qty: item.qty
            }
        });

        await CartItem.deleteMany({user: req.user._id});
        await CartItem.bulkWrite(cartItems.map(item => {
            return {
                updateOne: {
                    filter: {
                        user: req.user._id, 
                        product: item.product
                    },
                    update: item,
                    upsert: true
                }
            }
        }));

        return res.json(cartItems);

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

const index = async (req, res, next) => {
    try {
        let items =
        await CartItem
        .find({user: req.user._id})
        .populate('product')

        return res.json(items);
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
const store = async (req, res, next) => {
    try {
        const { product: productId, qty } = req.body;

        // Ambil data produk dari basis data berdasarkan ID produk yang diterima
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 1, message: "Produk tidak ditemukan" });
        }

        // Buat item cart baru dengan menggunakan data produk yang ditemukan
        const newCartItem = new CartItem({
            name: product.name, // Gunakan nilai "name" dari produk
            qty,
            price: product.price,
            image_url: product.image_url,
            user: req.user._id,
            product: product._id
        });

        // Simpan item cart baru ke dalam basis data
        await newCartItem.save();

        return res.json(newCartItem);
    } catch (err) {
        // Tangani kesalahan jika terjadi
        next(err);
    }
};



module.exports = {
    update,
    index,
    store
}