import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
axios.defaults.withCredentials = true;

export default function Users() {

  const [user, setUser] = useState('');

  useEffect(() => {
    const requestData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/users/current-user`, {
          withCredentials: true,
        });

        const data = response.data;
        setUser(data.user.name)
        
      } catch (error) {
        console.error("Error fetching Data", error)
      }
    }

    requestData();
  }, [])

  return (
    <div>
        <Navbar/>
        <h1 className='text-center underline font-bold text-2xl mt-10'>Hello, {user}</h1>
    </div>
  )
}
