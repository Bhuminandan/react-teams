import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { currentUser } from '../../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom'

const Login = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!email || !password) {
        alert('Please enter email and password')
        return
      }

      try {
        const res = await axios.post(
          'http://localhost:9000/login',
          {
            email,
            password,
          },
          {
            withCredentials: true, 
          }
        );
  
        dispatch(currentUser(res.data));

        navigate('/dashboard');
        
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-5 bg-gradient-to-r from-slate-900 to-slate-700'>
        <h2 className='text-3xl font-bold text-white'>Login</h2>
        <form 
            onSubmit={handleSubmit}
            className='flex items-center justify-center flex-col gap-4'
        >
        <input className='p-2 border-none bg-slate-200 rounded-lg focus:ring-0 outline-none w-96' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='p-2 border-none bg-slate-200 rounded-lg focus:ring-0 outline-none w-96' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='p-2 border-none bg-slate-200 rounded-lg focus:ring-0 outline-none font-medium uppercase hover:bg-slate-300' type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login