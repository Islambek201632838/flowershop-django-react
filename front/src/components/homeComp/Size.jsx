import {useState, useEffect} from 'react'
import axios from 'axios'

function Size ({selectedSize, setSelectedSize}) {
  const parameter = 'size';

  const [parArr, setParArr] = useState([]);

  useEffect(() => {
    const getSizes = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/distinct/${parameter}`);
        setParArr(data); 
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getSizes();
  }, []);

    return (
      <div style={{marginTop:'46px'}}>
        <div className='categories-h2'>Size</div>
            {parArr.map((item, index) => (
            <div className='categories-row' key={index}>
                <div onClick={()=>setSelectedSize(item.name)}
                     className={(selectedSize == item.name) ? 'active-size':'size'}
                     >
                  {item.parName}
                </div>
                <div className={(selectedSize == item.name) ? 'active-size':'size'}
                    >
                  ({item.count})
                </div>
            </div>
            ))} 
    </div>   
   );
  }
export default Size
  
  