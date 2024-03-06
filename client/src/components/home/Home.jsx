import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { currentUser } from '../../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPending, setAuthPending] = useState(false);

  const navigate = useNavigate();

  const isAuthenticatedCheck = useCallback(async () => {
    try {
      setAuthPending(true)
      const response = await axios.get('https://localhost:9000/isAuthenticated', {
        withCredentials: true
      });

      setIsAuthenticated(true);
      dispatch(currentUser(response.data.user))
    }
    catch (error) {
      console.log(error);
      alert('Failed to authenticate')
    } 
    finally {
      setAuthPending(false)
    }
  });


  useEffect(() => {
    isAuthenticatedCheck()
  }, []);

  if (authPending) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
        Authenticating...
      </div>
    )
  }

  if (isAuthenticated && !authPending) {
    return (
      <div>
        <Outlet />
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
      Not Authenticated
      Go to <button className='p-2 border-none bg-slate-200 rounded-lg focus:ring-0 outline-none font-medium uppercase hover:bg-slate-300' onClick={() => navigate('/auth/login')}>Login</button>
    </div>
  )
  
}

export default Home