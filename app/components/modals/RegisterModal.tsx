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
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import useLoginModal from '@/app/hooks/useLoginModal'

const RegisterModal = () => {
    const RegisterModal = useRegisterModal();
    const LoginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        },
    }=useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
        axios.post('/api/register',data)
        .then(()=>signIn('credentials',{
            ...data,
            redirect:false,
        }))
        .then((callback)=>{
            
            if(callback?.ok){
                router.refresh()
                toast.success('Welcome Onboard!')
                RegisterModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error);
            }
            
        })
        .catch((error)=>{
            toast.error('Some Error Occured')
        })
        .finally(()=>{
            setIsLoading(false)
            
        })
    }
    const toggle = useCallback(()=>{
        LoginModal.onOpen()
        RegisterModal.onClose()
    },[LoginModal,RegisterModal])

    const bodyContent=(
        <div className='flex flex-col gap-4'>
            <Heading 
            title='Welcome to Airbnb'
            subtitle='Create an Account'
            />
            <Input type='email' pattern={/^\S+@\S+$/i} register={register} id='email' disabled={isLoading} label='Email' errors={errors} required/>
            <Input register={register} id='name' disabled={isLoading} label='Name' errors={errors} required/>
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
                        Aleady have an account?
                    </div>
                    <div 
                    onClick={toggle}
                    className='text-neutral-800 hover:underline cursor-pointer'
                    >
                        Log In
                    </div>
                </div>
            </div>

        </div>
    )
    
  return (
    <Modal 
    disabled={isLoading}
    isOpen={RegisterModal.isOpen} 
    title='register' 
    actionLabel='Continue' 
    onClose={RegisterModal.onClose} 
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent} 
    footer={footerContent}
    />
  )
}

export default RegisterModal