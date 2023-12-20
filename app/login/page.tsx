import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100'>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className='flex bg-white rounded-2xl shadow-2xl w-2/3 max-w-4xl'>
          <div className='w-3/5 p-5'>
            <div className='text-left font-bold'>
              Agent
            </div>
            {/* Login */}
            <div className='flex justify-center text-3xl font-bold text-slate-800 '>
              Login to Account
            </div>
            <div className='inline-block border-2 w-10 border-stone-700 mb-2'></div>
            <div className='flex flex-col items-center'>
              <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                <FaRegEnvelope className='text-gray-400 m-2' />
                <input type="email" name='email' placeholder="Email" className='bg-gray-100 outline-none text-sm flex-1' />
              </div>
              <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                <MdLockOutline className='text-gray-400 m-2' />
                <input type="password" name='password' placeholder="Password" className='bg-gray-100 outline-none text-sm flex-1' />
              </div>
              <div className='flex justify-between w-64 mb-5'>
                <label className='flex items-center text-xs'><input type="checkbox" name='remember' className='mr-1' />Remember me</label>
                <a href='#' className='text-xs'>Forgot Password?</a>
              </div>
              <a href='#' className='border-2 border-stone-800 text-slate-800 rounded-full px-12 py-2 inline-block font-semibold hover:bg-stone-800 hover:text-white'>Login</a>
            </div>
          </div>
          {/* Signup */}
          <div className='w-2/5 bg-stone-800 text-white rounded-tr-2xl rounded-br-2xl py-36 px12'>
            <h2 className='text-3xl font-bold mb-2'>Hello, friend!</h2>
            <div className='border-2 w-10 border-white inline-block mb-2'></div>
            <p className='mb-2'>Click below to start your journey with us!</p>
            <a href='#' className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-slate-800'>Sign Up</a>
          </div>
        </div>
      </main>
    </div>
  )
}
