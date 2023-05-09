'use client'
import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginModal = () => {
    const RegisterModal = useRegisterModal();
    const loginModal = useLoginModal();
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        },
    }=useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
       signIn('credentials',{
        ...data,
        redirect:false,
       })
       .then((callback)=>{
        setIsLoading(false)
        if(callback?.ok){
            toast.success('Welcome Back 😄')
            router.refresh()
            loginModal.onClose()
        }
        if(callback?.error){
            toast.error(callback.error);
        }
       })
    }
    const toggle = useCallback(()=>{
        loginModal.onClose()
        RegisterModal.onOpen()
    },[loginModal,RegisterModal])

    const bodyContent=(
        <div className='flex flex-col gap-4'>
            <Heading 
            title='Welcome Back!'
            subtitle='We are happy to see you back!'
            />
            <Input type='email' pattern={/^\S+@\S+$/i} register={register} id='email' disabled={isLoading} label='Email' errors={errors} required/>
            <Input type='password' register={register} id='password' disabled={isLoading} label='Password' errors={errors} required/>
        </div>
    )

    const footerContent =(
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={()=>signIn('github')}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex gap-2 flex-row items-center justify-center'>
                    <div>
                        First time using Airbnb?
                    </div>
                    <div 
                    onClick={toggle}
                    className='text-neutral-800 hover:underline cursor-pointer'
                    >
                        Create an account
                    </div>
                </div>
            </div>

        </div>
    )
    
  return (
    <Modal 
    disabled={isLoading}
    isOpen={loginModal.isOpen} 
    title='login' 
    actionLabel='Continue' 
    onClose={loginModal.onClose} 
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent} 
    footer={footerContent}
    />
  )
}

export default LoginModal