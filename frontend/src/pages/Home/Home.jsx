import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay'; // Ensure this is imported
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <Header />
      <ExploreMenu setCategory={setCategory} category={category} />
      <ProductDisplay category={category} /> 
      <AppDownload />
    </>
  );
}

export default Home;
