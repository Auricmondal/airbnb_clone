'use client'

import React from 'react'

interface HeadingProps{
    title:string;
    subtitle?:string;
    cennter?:boolean;
}

const Heading:React.FC<HeadingProps> = ({
    title,
    subtitle,
    cennter
}) => {
  return (
    <div className={cennter?'text-center': 'text-start'}>
        <div className='text-2xl font-bold'>
            {title}
        </div>
        <div className='font-light text-neutral-500 mt-2'>
            {subtitle}
        </div>
    </div>
  )
}

export default Heading