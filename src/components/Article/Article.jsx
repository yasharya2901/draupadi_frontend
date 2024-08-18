import React from 'react'

function Article({heading, content}) {
  return (
    <div>
        <h1 className='p-2 text-lg'>{heading}</h1>
        <p className='p-2'>{content}</p>
    </div>
  )
}

export default Article