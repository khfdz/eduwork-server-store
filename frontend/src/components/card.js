import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/card.css';

const CardsList = ({ searchQuery, selectedTags, selectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const tagsQueryString = selectedTags.length > 0 ? `&tags=${selectedTags.join('&tags=')}` : '';
                const url = `http://localhost:3002/api/products?skip=${(currentPage - 1) * 12}&q=${searchQuery}&category=${selectedCategory}${tagsQueryString}`;

                const response = await fetch(url);
                const responseData = await response.json();
                console.log('Fetched products:', responseData.data);
                setProducts(responseData.data);
                setTotalPages(Math.ceil(responseData.count / 12));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [currentPage, searchQuery, selectedCategory, selectedTags]);

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
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });
            const data = await response.json();
            console.log('Added to cart:', data); 
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const addToCarto = async (productId) => {
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
                            {/* <button className="carto" onClick={() => addToCart(product._id)}>+</button> */}
                            <button className="carto" onClick={() => addToCarto(product._id)}>+</button>
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