import React, { useEffect, useState } from 'react';
import './ListMerchants.css'; // Updated file name for merchants
import { url } from '../../assets/assets'; // Ensure you have the correct URL for your API
import axios from 'axios';
import { toast } from 'react-toastify';

const ListMerchants = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/merchant/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching merchants");
      }
    } catch (error) {
      toast.error("Error fetching merchants");
    }
  };

  const removeMerchant = async (merchantId) => {
    try {
      const response = await axios.delete(`${url}/api/merchant/${merchantId}`);
      if (response.data.success) {
        fetchList(); // Refresh the list after deletion
        toast.success(response.data.message);
      } else {
        toast.error("Error deleting merchant");
      }
    } catch (error) {
      toast.error("Error deleting merchant");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list-merchants flex-col'>
      <p>All Stores List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Name</b>
          <b>Address</b>
          <b>Phone</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <p>{item.name}</p>
            <p>{item.address}</p>
            <p>{item.phone}</p>
            <p className='cursor' onClick={() => removeMerchant(item._id)}>x</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListMerchants;
