import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img1 from '../../img/image 1.png'; // Make sure the path matches exactly, including spaces or underscores
import ReactPaginate from 'react-paginate';

function FlowerList({ minPrice, maxPrice, selectedCategory, selectedSize, searchTerm }) {

  const [flowers, setFlowers] = useState({
    data: [],
    currentPage: 1,
    maxPage: 0,
    searchResults: '',
    serverMessage: '',
    filter: 'All Plants',
    sort: 'default',
    isDiscount: null,
    isNew: null

  });

  useEffect(() => {
    const fetchData = async () => {
      const limit = 9;
      let offset = (flowers.currentPage - 1) * limit; 
      
      let queryParams = new URLSearchParams({
        minPrice,
        maxPrice,
        isNew: flowers.isNew,
        isDiscount: flowers.isDiscount,
        category: selectedCategory,
        size: selectedSize,
        searchTerm,
        offset,
        limit,
        sort: flowers.sort
      }).toString();

      const url = `${import.meta.env.VITE_API_URL}/filter?${queryParams}`;

      try {
        const data = await axios.get(url);
        const response = data.data.response
        const response2 = data.data.response2 
        if(response){
          setFlowers(prev => ({
            ...prev,
            data: response || [],
            maxPage: Math.ceil(response2?.count / 9) ?? 0,
            searchResults: response2?.count ?? 0,
            serverMessage: '',
          }));
        }
        else {
          setFlowers(prev => ({
            ...prev,
            data: [],
            maxPage: 0,
            searchResults: null,
            serverMessage: 'No Matching Data',
          }));
        }  
      } catch (error) {
        console.error('Error:', error);
        setFlowers(prev => ({
          ...prev,
          data: [],
          maxPage: 0,
          searchResults: '',
          serverMessage: 'Failed to fetch data'
        }));
      }
    };

    fetchData();
  }, [minPrice, maxPrice, selectedCategory, selectedSize, searchTerm, flowers.sort, flowers.isDiscount, flowers.isNew, flowers.currentPage]);

  const handlePageChange = (data) => {
    setFlowers(prev => ({
      ...prev,
      currentPage: data.selected + 1
    }));
};

  // Function to update the filter state
  const updateFilter = (newFilter) => {
    switch (newFilter) {
      case 'All Plants':
        setFlowers(prev => ({
          ...prev,
          filter: 'All Plants',
          isDiscount: null,
          isNew: null,
        }));
        break;
      case 'New Arrivals':
        setFlowers(prev => ({
          ...prev,
          filter: 'New Arrivals',
          isDiscount: null,
          isNew: true,
        }));
        break;
      case 'Sale':
        setFlowers(prev => ({
          ...prev,
          filter: 'Sale',
          isDiscount: true,
          isNew: null,
        }));
        break;
    
      default:
        break;
    }
  };

  return (
    <div className='flower_list'>
      <div className='list_filter'>
        <div className='flower_list_ul'> 
          <div onClick={() => updateFilter('All Plants')}
               className={flowers.filter === 'All Plants' ? 'flowerItem-active' : 'flowerItem'}>
            All Plants
          </div>
          <div onClick={() => updateFilter('New Arrivals')}
               className={flowers.filter === 'New Arrivals' ? 'flowerItem-active' : 'flowerItem'}>
            New Arrivals
          </div>
          <div onClick={() => updateFilter('Sale')}
               className={flowers.filter === 'Sale' ? 'flowerItem-active' : 'flowerItem'}>
            Sale
          </div>
        </div>
        <div className='flower_list_sort'>
          Show first:
          <select onChange={(e) => { setFlowers(prev => ({...prev, sort: e.target.value}))}}>
            <option value='default'>Default setting</option>
            <option value='New'>New</option>
            <option value='Old'>Old</option>
            <option value='Cheap'>Cheap</option>
            <option value='Expensive'>Expensive</option>
          </select>
        </div>
      </div>
      <div style={{textAlign:'center', fontSize:'20px'}}>{flowers.serverMessage}</div>
      {flowers.searchResults > 0 && (
        <div  style={{fontSize:'20px'}}>
          <div>Results: {flowers.searchResults} items</div>
          <div className='list_items'>
            {flowers.data.map((item, index) => (
              <div className='list_item-wrapper' key={index}>
              <div className='list_item'>
                <div className='list_item-discount-wrapper'>
                  <div className={(Number(item.discount.slice(0, -1)) > 0) ?
                                         'list_item-discount' : ''}>
                      {item.discount} OFF
                    </div>
                </div> 
                <img src={img1} alt="" />
              </div>
              <div className='list_item_info'>
                <div className='list_item_name'>{item.name}</div>
                <div className='list_item_price'>${item.price}</div>
              </div>
            </div>
            ))}
          </div>
           <div className="list-pages-wrapper">
              <div className="list-pages">
                  <ReactPaginate
                      pageCount={flowers.maxPage}
                      pageRangeDisplayed={3} 
                      marginPagesDisplayed={1} 
                      previousLabel="←"
                      nextLabel="→"
                      onPageChange={(selected) => handlePageChange(selected)}
                      containerClassName="list-page"
                      activeClassName="list-page-active"
                      />
              </div>
           </div>
          
        </div>
      )}
    </div>
  );
}

export default FlowerList;


