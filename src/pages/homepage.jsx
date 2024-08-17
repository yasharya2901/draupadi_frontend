import React from 'react'
import DetailForm from '../components/DetailForm'
import lotus from '../assets/lotus_draupadi.jpg'

function HomePage() {
  return (
    <div className='bg-[#c0c0c0]'>
        <img src={lotus} alt='Lotus' className='w-52' style={{clipPath: 'inset(20% 0 30% 0)'}} />
        <div className='flex flex-col md:flex-row justify-between p-6'>
          <p>
            HELP US BEING A HAND TO SOMEONE IN DANGER
          </p>
          <DetailForm />
        </div>
    </div>
  )
}

export default HomePage