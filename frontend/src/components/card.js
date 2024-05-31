import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/card.css';
import { useAppContext } from '../context/AppContext';
import { CartContext } from '../../src/context/CartContext';
import { useCategoryContext } from '../context/CategoryContext'; // Import hook useCategoryContext

const CardsList = () => {
    const { fetchCartData } = useContext(CartContext);
    const { searchQuery, selectedTags, setSelectedTags } = useAppContext();
    const { selectedCategory } = useCategoryContext(); // Use hook useCategoryContext

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const tagsQueryString = selectedTags.length > 0 ? `&tags=${selectedTags.join('&tags=')}` : '';
                const categoryQueryString = selectedCategory ? `&category=${selectedCategory}` : '';
                const url = `http://localhost:3002/api/products?q=${searchQuery}${tagsQueryString}${categoryQueryString}`;

                const response = await fetch(url);
                const responseData = await response.json();
                console.log('Fetched products:', responseData.data);
                setProducts(responseData.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [searchQuery, selectedTags, selectedCategory]);

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

    const totalPages = Math.ceil(products.length / productsPerPage);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    // Menggunakan Set untuk menyimpan jenis-jenis tag unik
    const uniqueTagsSet = new Set();
    products.forEach((product) => {
        uniqueTagsSet.add(product.tags.name);
    });
    // Mengonversi Set kembali menjadi array
    const uniqueTagsArray = Array.from(uniqueTagsSet);

    return (
        <div className="container">
            <p className="recomended">Recommended Products</p>
            {selectedCategory && <p className="selected-category">Selected Category: {selectedCategory}</p>}
            <div className="tags-section">
    <p>Tags Original Product:</p>
    <div className="tags-container">
        {uniqueTagsArray.map((tag, index) => (
            <button key={index} className={`tag-button ${selectedTags.includes(tag) ? 'active' : ''}`} onClick={() => {
                if (!selectedTags.includes(tag)) {
                    setSelectedTags([...selectedTags, tag]);
                }
            }}>{tag}</button>
        ))}
    </div>
</div>


            <div className="row">
                {currentProducts.map((product, index) => (
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
                <button className="pageButton pageButtonz" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <button
                        key={pageNumber}
                        className={`pageButton ${pageNumber + 1 === currentPage ? 'active' : ''}`}
                        onClick={() => goToPage(pageNumber + 1)}
                    >
                        {pageNumber + 1}
                    </button>
                ))}
                <button className="pageButton pageButtonz" onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
}

export default CardsList;
