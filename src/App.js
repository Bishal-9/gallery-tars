import React from 'react'
import './App.css';
import Header from './Header'
import Loader from './Loader'
import axios from 'axios'
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import ImageContainer from './ImageContainer'

function App() {

  const apiRoot = 'https://api.unsplash.com'
  const accessKey = '5lh2QYe8v7qO6eRo4kkySfd2GvlGFDH23m1mIkqUi2E'
  const [method, setMethod] = useState()
  const [images, setImages] = useState([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    normalData()
  }, [])

  const normalData = () => {
    console.log("normal = ", method)
    setMethod(true)
    axios.get(`${apiRoot}/photos/random?client_id=${accessKey}&count=30`, {
      headers: {
        'Accept-Version': 'v1',
      }
    }).then(res => {
        setImages([...images, ...res.data])
    }).catch(e => console.log(e))
  }

  const searchData = (q = query) => {
    if (method === true) {
      setImages([])
    }
    setMethod(false)
    setPage(page + 1)
    axios.get(`${apiRoot}/search/photos?query=${q}&page=${page}&per_page=30&client_id=${accessKey}`, {
      headers: {
        'Accept-Version': 'v1',
      }
    })
      .then(res => {
        if (res.data['results'] != null) {
          setImages([...res.data['results']])
        } else {
          console.log('No more Data!')
        }
      }).catch((e) => {
        console.log('Error occurred... ', e)
      })
  }

  const callSearch = () => {
    searchData(query)
  }

  return (
    <div className="app">
      <Header 
        searchData={searchData} 
        func={(value) => setQuery(value)} 
        imageFunc={() => setImages([])}
      />
      <center>
        <InfiniteScroll
          className="app__imageList"
          dataLength={images.length}
          next={method ? normalData : callSearch}
          hasMore={true}
          loader={<Loader />}          
        >
          {
            images.map((image) => (
              <ImageContainer imageDetails={image} />
            ))
          }
        </InfiniteScroll>
      </center>
    </div>
  );
}

export default App;
