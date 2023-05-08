import React from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import { FcLike } from "react-icons/fc";

const EventCard = ({img, name, date, time, location, liked}) => {
  return (
    <div className='flex flex-col h-96 w-72 m-5 shadow-md rounded-xl'>
      <div className='h-1/2'>

        <img src={img} alt="img" className='w-full h-full rounded-t-xl' />
      </div>
      <div className='h-2/5 flex flex-col justify-around pl-3'>
        <div>Name : {name}</div>
        <div>date : {date}</div>
        <div>Time : {time}</div>
        <div>location : {location}</div>

      </div>

      <div className='flex justify-end pr-3'>
        {liked?<div>
          <FcLike fontSize={25} />
        </div>
        :
        <div>
          <AiOutlineHeart fontSize={25} />
        </div>}
      </div>
    </div>
  )
}

export default EventCard