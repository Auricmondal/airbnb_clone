'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../Button';

interface ModalsProps{
    isOpen?:boolean;
    onClose:()=>void;
    onSubmit:()=>void;
    title?:string;
    body?:React.ReactElement;
    footer?:React.ReactElement;
    actionLabel:string;
    disabled?:boolean;
    secondaryAction?:()=>void;
    secondaryActionLabel?:string;
}

const Modal:React.FC<ModalsProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen)
    useEffect(() => {
      setShowModal(isOpen)
    }, [isOpen])


    const handleClose=useCallback(()=>{
        if(disabled){
            return;
        }
        setShowModal(false)
        setTimeout(() => {
            onClose();
        }, 300);
    },[disabled,onClose])

    const handleSubmit = useCallback(()=>{
        if(disabled){
            return;
        }
        onSubmit();
    },[onSubmit,disabled])

    const handleSecondaryAction =useCallback (()=>{
        if(disabled || !secondaryAction){
            return;
        }
        secondaryAction();
    },[disabled,secondaryAction])

    if(!isOpen){
        return null
    }
    
  return (
    <>
         <div className='z-50 
         justify-center 
         flex 
         overflow-x-hidden 
         overflow-y-auto 
         fixed 
         inset-0 
         outline-none 
         focus:outline-none 
         bg-neutral-800/70'>
            <div className='
            relative 
            w-full 
            md:w-3/4 
            lg:w-3/6 
            xl:w-2/5 
            my-6 
            mx-auto 
            h-full 
            lg:h-auto 
            md:h-auto
            '>
                {/* CONTETN */}
                <div className={`
                translate
                duration-300 
                h-full 
                ${showModal? 'translate-y-0':'translate-y-full'}
                ${showModal? 'opacity-100':'opacity-0'}
                `
                }>
                    <div className='
                    translate
                    h-auto
                    lg:h-auto
                    md:h-auto
                    border-0
                    rounded-lg 
                    shadow-lg
                    relative 
                    flex 
                    flex-col
                    w-full
                    bg-white
                    outline-none
                    focus:outline-none

                    '>
                        {/* HEADER */}
                        <div className='
                        flex
                        items-center
                        p-6
                        rounded-t
                        justify-center 
                        relative
                        border-b-[1px]
                        '>
                            <button 
                            onClick={handleClose}
                            className='
                            p-1
                            border-0
                            hover:opacity-70
                            transition
                            absolute
                            left-9
                            '>
                                <IoMdClose/>
                            </button>
                            <div className='text-lg font-semibold capitalize'>
                                {title}
                            </div>
                        </div>
                        {/* BODY */}
                        <div className='relative p-6 flex-auto'>
                            {body}
                        </div>
                        {/* FOOTER */}
                        <div className='flex flex-col gap-2 p-6'>
                            <div className='flex flex-row items-center w-full gap-4'>
                                {secondaryAction && secondaryActionLabel &&(
                                <Button outline label={secondaryActionLabel} disabled={disabled} onClick={handleSecondaryAction}/>
                                )}
                                <Button label={actionLabel} disabled={disabled} onClick={handleSubmit}/>
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </>
  )
}

export default Modal