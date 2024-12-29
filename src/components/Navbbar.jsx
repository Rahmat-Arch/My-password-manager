import React from 'react'

export default function Navbbar() {
  return (
    <nav className='bg-gradient-to-r from-purple-300  to-indigo-600 h-14 flex justify-between items-center'>
        <div className='hover:shadow-purple-800 shadow-2xl transition-all px-7'>Logo</div>
        <ul className='flex space-x-4 px-5'>
          <li className='hover:text-blue-800 hover:text-xl transition-all'><a href="/">Log in</a></li>
        </ul>
    </nav>
  )
}
