import axios from 'axios';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Item from './Item';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState({ count: 0, items: [], total: 0, next: '' });

  const handleSearch = (next) => {
    let endpoint = `https://api.test.mywebaisle.com/items/search?term=${searchTerm}`;

    if (next !== '' && next !== undefined && typeof next === 'string') {
      endpoint = next;      
    }

    axios.get(endpoint, {
      headers: {
        "X-MWA-STORE-ID": "90A301F0-B986-4FD3-B8A3-AC34B454ECCB"
      }
    })
    .then((response) => {
      if (response?.data?.data?.length > 0) {
        const data = response?.data;

        if (next !== '' && next !== undefined && typeof next === 'string') {
          const concatenatedItems = items?.items?.concat(data.data);
          const count = items.count + data.count;
          setItems({ ...items, count, items: concatenatedItems, next: data.next });
        } else {
          setItems({ count: data.count, items: data.data, next: data.next, total: data.total });
        }
      } else {
        setItems({ count: response.data.count, items: response.data.data, next: '', total: null });
      }
    })
  }

  return (
    <div>
      <div className="search-bar">
        <h1>
          Search for our products
        </h1>
        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>

      <InfiniteScroll
        dataLength={items?.items?.length || 0}
        next={() => handleSearch(items?.next)}
        hasMore={items?.count < items?.total}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>{(items?.count >= items?.total && items.total > 0) && 'This is the end of the list'}  </b>
            <b>{(items.total === null && items.next === '') && "We didn't find anything for that. Search for something else."}  </b>
          </p>
        }
      >
        {
          items?.items?.map((item, index) => {
            return <Item key={`${item?.id}-${index}`} itemData={item} />
          })
        }
      </InfiniteScroll>
    </div>
  );
}

export default App;
