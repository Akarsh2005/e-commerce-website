import React, { useContext } from 'react';
import './ProductDisplay.css';
import ProductItem from '../ProductItem/ProductItem';
import { StoreContext } from '../../Context/StoreContext';

const ProductDisplay = ({ category }) => {
  const { product_list } = useContext(StoreContext);

  return (
    <div className='product-display' id='product-display'>
      <h2>Top products near you</h2>
      <div className='product-display-list'>
        {product_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <ProductItem 
                key={item._id} 
                image={item.image} 
                name={item.name} 
                desc={item.description} 
                price={item.price} 
                id={item._id} 
              />
            );
          }
          return null; // Explicitly return null if no condition is met
        })}
      </div>
    </div>
  );
}

export default ProductDisplay;
