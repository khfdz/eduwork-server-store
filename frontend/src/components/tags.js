import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/tags.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';

const Tags = () => {
    return (
        <div className="container">
        <div className="tags">
            <button className="tag"><FontAwesomeIcon icon={faFire} /> Hot</button>
            <button className="tag"><FontAwesomeIcon icon={faPizzaSlice} /> Pizza</button>
            <button className="tag"><FontAwesomeIcon icon={faFire} /> Hot</button>
            <button className="tag"><FontAwesomeIcon icon={faPizzaSlice} /> Pizza</button>
            <button className="tag"><FontAwesomeIcon icon={faFire} /> Hot</button>
            <button className="tag"><FontAwesomeIcon icon={faPizzaSlice} /> Pizza</button>
            

            {/* Tambahkan tag lain sesuai kebutuhan */}
        </div>

        </div>
    );
}

export default Tags;
