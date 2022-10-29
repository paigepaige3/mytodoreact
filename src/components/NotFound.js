import React from 'react'
import image from '../images/404.jpg'
import './NotFound.css'


export default function NotFound() {
  return (
    <div className='notFound'>
        <img src={image} alt='404' />

    </div>
  )
}
