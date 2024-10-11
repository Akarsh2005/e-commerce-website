import React from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <NavLink to='/add' className='sidebar-option'>
          <img src={assets.add_icon} alt='Add Items' className='sidebar-icon' />
          <p className='sidebar-text'>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option'>
          <img src={assets.order_icon} alt='List Items' className='sidebar-icon' />
          <p className='sidebar-text'>List Items</p>
        </NavLink>
        <NavLink to='/orders' className='sidebar-option'>
          <img src={assets.order_icon} alt='Orders' className='sidebar-icon' />
          <p className='sidebar-text'>Orders</p>
        </NavLink>
        <NavLink to='/add-merchant' className='sidebar-option'> {/* Updated path */}
          <img src={assets.add_icon} alt='Add Store' className='sidebar-icon' /> {/* Updated alt text */}
          <p className='sidebar-text'>Add Store</p> {/* Updated text */}
        </NavLink>
        <NavLink to='/list-merchants' className='sidebar-option'> {/* Updated path */}
          <img src={assets.order_icon} alt='List Stores' className='sidebar-icon' /> {/* Updated alt text */}
          <p className='sidebar-text'>List Stores</p> {/* Updated text */}
        </NavLink>
        <NavLink to='/add-driver' className='sidebar-option'>
          <img src={assets.add_icon} alt='Add Driver' className='sidebar-icon' />
          <p className='sidebar-text'>Add Driver</p>
        </NavLink>
        <NavLink to='/list-drivers' className='sidebar-option'>
          <img src={assets.order_icon} alt='List Drivers' className='sidebar-icon' />
          <p className='sidebar-text'>List Drivers</p>
        </NavLink>
        {/* <NavLink to='/payments' className='sidebar-option'>
          <img src={assets.payment_icon} alt='Payments' className='sidebar-icon' />
          <p className='sidebar-text'>Manage Payments</p> 
        </NavLink>*/}
      </div>
    </div>
  );
}

export default Sidebar;
