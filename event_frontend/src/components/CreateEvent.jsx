import React, { useState } from 'react'
import Navbar from './Navbar'
import { GrUploadOption } from "react-icons/gr";
import FileBase64 from 'react-file-base64'
import './CreateEvent.css'
import { useAppContext } from '../context/appcontext';
import { Link } from 'react-router-dom';
import Alert from './Alert';

const CreateEvent = () => {
  const { user, user_id, createEvent, showAlert, isLoading } = useAppContext();

  const [image, setImage] = useState("")
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [location, setLocation] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()
    const event = { eventName, eventDate, eventTime, location, image }

    let eventCreated = createEvent(event);
    if (eventCreated) {
      setEventName("")
      setEventDate("")
      setImage("")
      setEventTime("")
      setLocation("")
    }
    else {
      return;
    }

  }
  return (
    <div className='h-screen relative' >
      <Navbar />
      {showAlert &&
        <div className='w-full absolute'>
          <Alert />
        </div>}
      <div className=' h-full w-full flex  items-start justify-center ' style={{ "backgroundColor": "#efefef" }}>

        <form className='flex flex-col h-full w-full my-1 mx-1 sm:hidden  bg-white rounded-sm' onSubmit={handleSubmit}>
          <div className=' h-1/2 rounded-l-xl flex flex-col items-center justify-center'>
            <div className='rounded-xl h-full m-1 flex items-center justify-center' style={{ "backgroundColor": "#efefef" }}>
              {image.length === 0 ?
                <div className='flex justify-center mx-4 items-center flex-col border-2  border-dotted border-gray-300 p-3 rounded-xl w-full' style={{ "height": "94%" }}>
                  <div className='w-full h-full flex flex-col items-center justify-center'>
                    <label className='w-full h-full flex flex-col items-center justify-center'>
                      <div className='input-file'>
                        <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setImage(base64)} />
                      </div>
                      <div>
                        <GrUploadOption fontSize={30} />
                      </div>
                      <div className='text-xl px-10 flex items-center justify-center text-center mt-4'>
                        Click to upload
                      </div>
                    </label>
                  </div>
                </div>
                :
                <img src={image} style={{ "minHeight": "100%", "minWidth": "100%", "maxWidth": "100%", "maxHeight": "100%" }} />
              }
            </div>
          </div>
          <div className='w-full h-1/2 flex flex-col justify-evenly'>
            <div className='text-xl font-semibold w-4/5 m-1'>
              <label htmlFor="title" className='px-2 text-lg'>Name</label>
              <input type="text" name="eventName" placeholder='Event Name' className=' w-full outline-none px-2  text-black ' value={eventName} onChange={(e) => setEventName(e.target.value)} />
            </div>
            <div className='w-full m-1 mt-2'>
              <label htmlFor="about" className='px-2 font-medium '>Date</label>
              <input type="text" name="eventDate" placeholder='Enter the date' className='mx-1 w-full outline-none px-1 text-black ' value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
            </div>

            <div className='w-full flex justify-center items-center'>
              <div className='mt-1 h-10 rounded-3xl' style={{ "backgroundColor": "#efefef", "width": "75%" }}>
                <button type='submit' className='w-full h-full hover:bg-gray-300 rounded-3xl '>Submit</button>
              </div>
            </div>
          </div>
        </form>







        <form className='hidden h-5/6  mt-10 sm:flex lg:hidden  bg-white rounded-xl' style={{ "width": "95%" }} onSubmit={handleSubmit}>
          <div className='w-1/2 h-full rounded-l-xl flex flex-col items-center justify-center'>
            <div className='rounded-xl flex items-center justify-center' style={{ "height": "80%", "width": "75%", "backgroundColor": "#efefef" }}>
              {image.length === 0 ?
                <div className='flex justify-center mx-4 items-center flex-col border-2  border-dotted border-gray-300 p-3 rounded-xl w-full' style={{ "height": "94%" }}>
                  <div className='w-full h-full flex flex-col items-center justify-center'>
                    <label className='w-full h-full flex flex-col items-center justify-center'>
                      <div className='input-file'>
                        <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setImage(base64)} />
                      </div>
                      <div>
                        <GrUploadOption fontSize={30} />
                      </div>
                      <div className='text-xl px-10 flex items-center justify-center text-center mt-4'>
                        Drag and drop or click to upload
                      </div>
                    </label>
                  </div>
                </div>
                :
                <img src={image} style={{ "minHeight": "100%", "minWidth": "100%", "maxWidth": "100%", "maxHeight": "100%" }} />
              }
            </div>
            <div className='mt-2 rounded-3xl' style={{ "backgroundColor": "#efefef", "width": "75%" }}>
              <button type='submit' className='w-full h-full hover:bg-gray-300 rounded-3xl py-3'>Submit</button>
            </div>
          </div>
          <div className='w-1/2 h-full flex flex-col'>
            <div className='w-full h-3/5 mt-16'>
              <div className='text-4xl font-bold w-4/5 mb-4'>
                <input type="text" name="title" placeholder='Enter the Name' className='mb-2 w-full outline-none p-2 pb-2 text-black h-full' value={eventName} onChange={(e) => setEventName(e.target.value)} />
                <div className="line-1 "></div>
              </div>
              <div className='w-4/5 mt-10'>
                <input type="text" name="eventDate" placeholder='Enetr the date' className='mb-2 w-full outline-none p-2 pb-2 text-black h-full' value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                <div className="line-1 "></div>
              
              </div>
            </div>
          
          </div>
        </form>


        <form className='hidden h-5/6 w-3/5 mt-10 lg:flex  bg-white rounded-xl' onSubmit={handleSubmit}>
          <div className='w-1/2 h-full rounded-l-xl flex flex-col items-center justify-center'>
            <div className='rounded-xl flex items-center justify-center' style={{ "height": "80%", "width": "75%", "backgroundColor": "#efefef" }}>
              {image.length === 0 ?
                <div className='flex justify-center mx-4 items-center flex-col border-2  border-dotted border-gray-300 p-3 rounded-xl w-full' style={{ "height": "94%" }}>
                  <div className='w-full h-full flex flex-col items-center justify-center'>
                    <label className='w-full h-full flex flex-col items-center justify-center'>
                      <div className='input-file'>
                        <FileBase64 type='file' multiple={false} onDone={({ base64 }) => setImage(base64)} />
                      </div>
                      <div>
                        <GrUploadOption fontSize={30} />
                      </div>
                      <div className='text-xl px-10 flex items-center justify-center text-center mt-4'>
                        Drag and drop or click to upload
                      </div>
                    </label>
                  </div>
                </div>
                :
                <img src={image}  style={{ "minHeight": "100%", "minWidth": "100%", "maxWidth": "100%", "maxHeight": "100%" }} />
              }
            </div>
            <div className='mt-2 rounded-3xl' style={{ "backgroundColor": "#efefef", "width": "75%" }}>
              <button type='submit' className='w-full h-full hover:bg-gray-300 rounded-3xl py-3'>Submit</button>
            </div>
          </div>
          <div className='w-1/2 h-full flex flex-col'>
            <div className='w-full h-3/5 mt-16'>
              <div className='text-4xl font-bold w-4/5 mb-4'>
                <input type="text" name="eventName" placeholder='Enter the Name' className='mb-2 w-full outline-none p-2 pb-2 text-black h-full' value={eventName} onChange={(e) => setEventName(e.target.value)} />
                <div className="line-1 "></div>
              </div>
              <div className='w-4/5 mt-10'>
                <input type="text" name="eventDate" placeholder='Enter the date' className='mb-2 w-full outline-none p-2 pb-2 text-black h-full' value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                <div className="line-1 "></div>

              </div>
            </div>

          </div>
    </form>
      </div>
    </div >
    
  )
}

export default CreateEvent