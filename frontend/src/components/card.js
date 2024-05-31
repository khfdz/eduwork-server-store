import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/card.css';
import { useAppContext } from '../context/AppContext';
import { CartContext } from '../../src/context/CartContext';
import { useCategoryContext } from '../context/CategoryContext';

const CardsList = () => {
    const { fetchCartData, addToCart } = useContext(CartContext);
    const { searchQuery, selectedTags, setSelectedTags } = useAppContext();
    const { selectedCategory } = useCategoryContext();
    
    // State untuk menyimpan judul kategori yang dipilih
    const [categoryTitle, setCategoryTitle] = useState("Recommended Products");

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 16;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const tagsQueryString = selectedTags.length > 0 ? `&tags=${selectedTags.join('&tags=')}` : '';
                const categoryQueryString = selectedCategory ? `&category=${selectedCategory}` : '';
                const url = `http://localhost:3002/api/products?q=${searchQuery}${categoryQueryString}${tagsQueryString}`;

                const response = await fetch(url);
                const responseData = await response.json();
                setProducts(responseData.data);

                // Perbarui judul kategori berdasarkan kategori yang dipilih
                setCategoryTitle(selectedCategory ? selectedCategory : "Recommended Products");
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
    
        fetchProducts();
    }, [searchQuery, selectedTags, selectedCategory]);
    
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
    
    return (
        <div className="container">
            <p className="recomended">{categoryTitle}</p> 
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
};

export default CardsList;
