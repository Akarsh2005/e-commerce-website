import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Electronics",
        merchantId: ""
    });
    const [merchants, setMerchants] = useState([]);

    useEffect(() => {
        const fetchMerchants = async () => {
            try {
                const response = await axios.get(`${url}/api/merchant/list`);
                if (response.data.success) {
                    setMerchants(response.data.data);
                } else {
                    toast.error('Failed to fetch merchants');
                }
            } catch (error) {
                toast.error('Error fetching merchants');
            }
        };

        fetchMerchants();
    }, []);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!image) {
            toast.error('Image not selected');
            return;
        }

        if (!data.merchantId) {
            toast.error('Merchant not selected');
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        formData.append("merchantId", data.merchantId);

        try {
            const response = await axios.post(`${url}/api/product/add`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: data.category,
                    merchantId: ""
                });
                setImage(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error adding product');
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload image</p>
                    <input 
                        onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} 
                        type="file" 
                        accept="image/*" 
                        id="image" 
                        hidden 
                    />
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="Selected" />
                    </label>
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product name</p>
                    <input 
                        name='name' 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        type="text" 
                        placeholder='Type here' 
                        required 
                    />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea 
                        name='description' 
                        onChange={onChangeHandler} 
                        value={data.description} 
                        rows={6} 
                        placeholder='Write content here' 
                        required 
                    />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product category</p>
                        <select 
                            name='category' 
                            onChange={onChangeHandler} 
                            value={data.category}
                        >
                            <option value="Electronics">Electronics</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Home and Furniture">Home and Furniture</option>
                            <option value="Beauty and Personal">Beauty and Personal</option>
                            <option value="Sports">Sports</option>
                            <option value="Stationery">Stationery</option>
                            <option value="Toys">Toys</option>
                            <option value="Health">Health</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input 
                            type="number" 
                            name='price' 
                            onChange={onChangeHandler} 
                            value={data.price} 
                            placeholder='25' 
                        />
                    </div>
                </div>
                <div className='add-merchant flex-col'>
                    <p>Select store</p>
                    <select 
                        name='merchantId' 
                        onChange={onChangeHandler} 
                        value={data.merchantId}
                    >
                        <option value="">Select a store</option>
                        {merchants.map(merchant => (
                            <option key={merchant._id} value={merchant._id}>
                                {merchant.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
}

export default Add;
