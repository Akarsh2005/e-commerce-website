import React, { useEffect, useState } from 'react';
import { url, currency } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching product items");
      }
    } catch (error) {
      toast.error("Error fetching product items");
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/product/remove`, { id: productId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error("Error removing product item");
      }
    } catch (error) {
      toast.error("Error removing product item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Product List</p>
      <div className='list-table'>
        <div
          className="list-table-format title"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 2fr 2fr 1fr 1fr',
            alignItems: 'center',
            gap: '10px',
            padding: '10px',
            borderBottom: '2px solid #cacaca',
            backgroundColor: '#f9f9f9',
            fontWeight: 'bold'
          }}
        >
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Store</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            className='list-table-format'
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 2fr 2fr 1fr 1fr',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              borderBottom: '1px solid #cacaca',
            }}
          >
            <img src={item.image ? `${url}/images/${item.image}` : '/path/to/default/image.jpg'} alt={item.name} style={{ width: '50px', height: 'auto' }} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.merchantId ? item.merchantId.name : "N/A"}</p>
            <p>{currency}{item.price}</p>
            <p className='cursor' style={{ color: 'red', cursor: 'pointer' }} onClick={() => removeProduct(item._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
