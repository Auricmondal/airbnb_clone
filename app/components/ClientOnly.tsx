'use client'
import React, { Children, useEffect, useState } from 'react'

interface ClientOnlyPropS{
    children:React.ReactNode
}

const ClientOnly:React.FC<ClientOnlyPropS> = ({children}) => {
    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => {
      setHasMounted(true)
    }, [])
    
    if(!hasMounted){
        return null;
    }

  return (
    <>{children}</>
  )
}

export default ClientOnly