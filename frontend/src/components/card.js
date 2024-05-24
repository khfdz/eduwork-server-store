import React, { useState, useEffect,useContext  } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/card.css';
import { useAppContext } from '../context/AppContext'; // Import hook untuk menggunakan context
import { CartContext  } from '../../src/context/CartContext';
const CardsList = () => {
    const { fetchCartData } = useContext(CartContext);

    const { searchQuery, selectedTags, selectedCategory } = useAppContext(); // Menggunakan hook untuk mengambil nilai dari context

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(12); // Menambah state untuk menentukan berapa banyak produk yang ditampilkan per halaman

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const tagsQueryString = selectedTags.length > 0 ? `&tags=${selectedTags.join('&tags=')}` : '';
                const url = `http://localhost:3002/api/products?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}&q=${searchQuery}&category=${selectedCategory}${tagsQueryString}`;

                const response = await fetch(url);
                const responseData = await response.json();
                console.log('Fetched products:', responseData.data);
                setProducts(responseData.data);
                setTotalPages(Math.ceil(responseData.count / pageSize));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentPage, searchQuery, selectedCategory, selectedTags, pageSize]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const addToCart = async (productId) => {
        const requestData = {
            items: [{
                product: {
                    _id: productId
                },
                qty: 1
            }]
        };
        console.log('Adding to cart:', requestData); 
        try {
            const token = localStorage.getItem('token'); 
            const response = await fetch('http://localhost:3002/api/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(requestData)
            });
            const data = await response.json();
            console.log('Added to cart:', data);
            fetchCartData(); 
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
                            <div className="tagCard tags">{product.tags.name}</div>

                            <p className="price">IDR {product.price}</p>
                            <button className="carto" onClick={() => addToCart(product._id)}>+</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button className="pageButton" onClick={handlePreviousPage}>Previous</button>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`pageButton ${pageNumber + 1 === currentPage ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNumber + 1)}
                    >
                        {pageNumber + 1}
                    </button>
                ))}
                <button className="pageButton" onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
}

export default CardsList;
