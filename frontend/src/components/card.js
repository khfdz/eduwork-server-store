import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/card.css';

const CardsList = () => {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(''); // Contoh penggunaan userId

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('http://localhost:3002/api/products');
                const data = await response.json();
                console.log('Fetched products:', data.data); // Menampilkan data produk yang berhasil diambil
                setProducts(data.data); // Menggunakan data.data karena data berisi properti data yang berisi array produk
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, []);

    const addToCart = async (productId) => {
        const requestData = {
            items: [{
                product: {
                    _id: productId
                },
                qty: 1
            }]
        };
        console.log('Adding to cart:', requestData); // Menampilkan data yang akan dikirim ke keranjang belanja
        try {
            const token = localStorage.getItem('token'); // Mengambil token dari local storage
            const response = await fetch('http://localhost:3002/api/carts', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Menambahkan token ke header Authorization
                },
                body: JSON.stringify(requestData)
            });
            const data = await response.json();
            console.log('Added to cart:', data); // Menampilkan data yang berhasil ditambahkan ke keranjang belanja
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div className="container">
            <p className="recomended">Recommended Products</p>
            <div className="row">
                {products.map((product, index) => (
                    <div key={index} className="card">
                        <img src={`http://localhost:3002/images/products/${product.image_url}`} className="card-img-top" alt="Food" />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text description">{product.description}</p>
                            <button className="tagCard tags">{product.tags.name}</button>
                            <p className="price">IDR {product.price}</p>
                            <button className="carto" onClick={() => addToCart(product._id)}>+</button>

                        </div>
                    </div>
                ))}
            </div>
            <button className="seeMore">See More</button>
        </div>
    );
}

export default CardsList;
