import React from 'react'
import Navbar from './Navbar'
import EventCard from './EventCard'
import fight from '../assests/fight.jpg'
import car from '../assests/car.jpg'

const Home = () => {
 
  return (
    <div>
      <Navbar/>
      <div className='grid grid-cols-4 '>
<EventCard img={car} name="Super EXPO" date="11-06-2023" time = "10.00 am" location="Mumbai" liked= '1'/>
<EventCard img={fight} name="Mangalore MMA" date="11-11-2023" time = "10.00 pm" location="Mangalore"/>
      </div>
    </div>
  )
}

export default Home