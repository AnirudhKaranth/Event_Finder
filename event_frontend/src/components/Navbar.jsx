import React, {useState} from 'react'
import {Link } from 'react-router-dom'
import { useAppContext } from '../context/appcontext'

const Navbar = () => {
    const {logout}=useAppContext();
    const [isClicked, setIsClicked] = useState(false)
    const toggleProfile = () => {
        setIsClicked(!isClicked)
    }
    return (
        <div className='h-20 w-full flex justify-between items-center relative p-6 shadow-md'>
            <div className='w-1/2 flex justify-start pl-6'>
                <div className='text-2xl font-semibold'>
                    Event Finder
                </div>
            </div>
            <div>
                <Link to='/' className='cursor-pointer p-3 hover:bg-slate-200 rounded-xl'>All Events</Link>
            </div>
            <div >
                <Link to='/createdEvents' className='cursor-pointer p-3 mx-1 hover:bg-slate-200 rounded-xl '>Created Events</Link>
            </div>
            <div>
                <Link to='/createEvent' className='cursor-pointer p-3 hover:bg-slate-200 rounded-xl'>Create Event</Link>
            </div>
            <div onClick={toggleProfile} className='p-3 cursor-pointer'>
                    <div className=' w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-300' style={{ "fontSize": "20px", "backgroundColor": "#efefef" }}>U</div>
            </div>
            {isClicked && <div className='absolute right-1 top-16 flex flex-col rounded-lg  border-2 border-gray-300 shadow-md z-30' style={{ "backgroundColor": "#fbf6f6" }}>
                <button type='button' className='p-2 hover:bg-gray-300 rounded-b-lg' onClick={logout}>Logout</button>
            </div>}
        </div>
    )
}

export default Navbar