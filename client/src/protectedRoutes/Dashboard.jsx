import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socketConnection from '../socket/socketConnection';
import axios from 'axios';
import { allUsers } from '../redux/features/auth/authSlice';
import { IoCall } from "react-icons/io5";
import ReactPlayer from 'react-player'

const Dashboard = () => {

  const dispatch = useDispatch();

  const user  = useSelector((state) => state.auth.user);
  const users = useSelector((state) => state.auth.users);

  const [localStream, setLocalStream] = useState(null);
  
  const fetchAllUsers = useCallback( async () => {
    try {
      const users = await axios.get('http://localhost:9000/users', {
        withCredentials: true
      })
      dispatch(allUsers(users.data))
    } catch (error) {
      console.log(error)
    }
  }, []);

  
  useEffect(() => {
    const socket = socketConnection();
    fetchAllUsers();
  }, []);


  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
  
        setLocalStream(stream)
      } catch (error) {
        console.log(error)
      }
    }

    getUserMedia();
    
  }, [])

  return (
    <div className='w-full flex h-screen'>
      <div className='bg-black h-full w-1/4'>
        <ul className='p-8 flex flex-col gap-4 overflow-x-auto'>
          {
            users.map((user) => (
              <div className='w-full bg-slate-700 p-3  rounded-lg cursor-pointer flex items-center justify-between' key={user._id}>
                <li className='text-white font-bold'>{user.email}</li>
                <div className='p-2 rounded-full bg-slate-600 hover:bg-slate-500 duration-300 transition-all'>
                <IoCall className='text-white text-2xl' />
                </div>
              </div>
            ))
          }
        </ul>
      </div>
      <div className='w-full h-full bg-stone-800'>
        {localStream && (
          <ReactPlayer
            url={localStream}
            playing
            controls
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard