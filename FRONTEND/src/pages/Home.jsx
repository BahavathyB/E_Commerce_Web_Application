import React, {useEffect} from 'react'
import Hero from '../components/Hero'
import PopularItems from '../components/PopularItems'
import Offers from '../components/Offers'
import NewCollections from '../components/NewCollections'
import NewsLetter from '../components/NewsLetter'
import { jwtDecode } from 'jwt-decode'


const Home = () => {

  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    console.log(token);

    if(token!== null){
    const decoded = jwtDecode(token);
    const role = decoded.role;
    if(role == "admin"){
      localStorage.removeItem("auth_token");
    }
    }
    
  }, []);

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
