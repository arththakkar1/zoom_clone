import Image from 'next/image'
import React from 'react'

function Loader() {
  return (
    <div className='flex-center h-screen w-full'>
        <Image
        src="/icons/loading-circle.svg"
        alt='Loading'
        height={50}
        width={50}
        />
    </div>
  )
}

export default Loader