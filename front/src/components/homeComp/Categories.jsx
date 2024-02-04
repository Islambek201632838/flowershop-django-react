import { useState, useEffect } from 'react';
import axios from 'axios';

function Categories({ selectedCategory, setSelectedCategory }) {
  const parameter = 'category';
  const [parArr, setParArr] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/distinct/${parameter}`);
        setParArr(data); // Assuming the endpoint returns the expected array of objects
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getCategories();
  }, []); 

  return (
    <div>
      <div className='categories-h2'>Categories</div>
      {parArr.map((item, index) => (
        <div className='categories-row' key={index}>
          <div onClick={() => setSelectedCategory(item.parName)}
               className={selectedCategory === item.parName ? 'active-size' : 'size'}>
            {item.parName}
          </div>
          <div className={selectedCategory === item.parName ? 'active-size' : 'size'}>
            ({item.count})
          </div>
        </div>
      ))}
    </div>
  );
}

export default Categories;
