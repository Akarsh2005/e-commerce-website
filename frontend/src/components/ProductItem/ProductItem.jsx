import React, { useContext } from 'react';
import './ProductItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const ProductItem = ({ image, name, price, desc, id }) => {
    const { cartItems, addToCart, removeFromCart, url, currency } = useContext(StoreContext);

    return (
        <div className='product-item'>
            <div className='product-item-img-container'>
                <img className='product-item-image' src={url + "/images/" + image} alt={name} />
                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add to cart" />
                    : <div className="product-item-counter">
                        <img src={assets.remove_icon_red} onClick={() => removeFromCart(id)} alt="Remove from cart" />
                        <p>{cartItems[id]}</p>
                        <img src={assets.add_icon_green} onClick={() => addToCart(id)} alt="Add more" />
                    </div>
                }
            </div>
            <div className="product-item-info">
                <div className="product-item-name-rating">
                    <p>{name}</p> <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className="product-item-desc">{desc}</p>
                <p className="product-item-price">{currency}{price}</p>
            </div>
        </div>
    );
};

export default ProductItem;
