import React from 'react'
import Hero from '../components/Hero'
import PopularItems from '../components/PopularItems'
import Offers from '../components/Offers'
import NewCollections from '../components/NewCollections'
import NewsLetter from '../components/NewsLetter'


const Home = () => {


  return (
    <div>
      <Hero />
      <PopularItems />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  )
}

export default Home