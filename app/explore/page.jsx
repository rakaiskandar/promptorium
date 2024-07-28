import Feed from '@components/Feed'
import React from 'react'

const Explore = () => {
  return (
    <section className='"w-full flex flex-col'>
        <h1 className='head_text text-left green_gradient'>
            Find the Prompt You Need
        </h1>
        <Feed />
    </section>
  )
}

export default Explore