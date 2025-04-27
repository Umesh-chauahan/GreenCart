import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

//Input field component
const InputField =({type, placeholder, name, handleChange, address})=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
    />
)

const AddAddressl = () => {

    const {axios, navigate,user} = useAppContext()

    const [address, setAddress]= useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setAddress((prevAddress)=>({
            ...prevAddress,
            [name]: value,
        }))
    }

    const onSubmitHandler = async(e) =>{
        try {
            const {data} = await axios.post('/api/address/add',{address})
            if(data.success){
                toast.success(data.message)
                navigate('/cart')  
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(!user){
            navigate('/cart')
        }
    },[])

  return (
    <div className='mt-16 pb-16'>
       <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
       <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
          <div className='flex-1 max-w-md'>
            <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                <div className='grid grid-cols-2 gap-4'>
                <InputField handleChange={handleChange} address={address} placeholder="First Name" name="firstName" type="text"/>
                    <InputField handleChange={handleChange} address={address} placeholder="Last Name" name="lastName" type="text"/>
                </div>

                <InputField handleChange={handleChange} address={address} placeholder="Email" name="email" type="email"/>
                <InputField handleChange={handleChange} address={address} placeholder="Street" name="street" type="text"/>

                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} placeholder="City" name="city" type="text"/>
                    <InputField handleChange={handleChange} address={address} placeholder="State" name="state" type="text"/>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address} placeholder="Zip code" name="zipcode" type="number"/>
                    <InputField handleChange={handleChange} address={address} placeholder="Country" name="country" type="text"/>
                </div>

                <InputField handleChange={handleChange} address={address} placeholder="Phone" name="phone" type="text"/>

                <button className='bg-primary text-white font-medium hover:bg-primary-dull transition w-full py-3 mt-6 cursor-pointer uppercase'>
                    Save Address
                </button>
            </form>
          </div>
          <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
       </div>
    </div>
  )
}

export default AddAddressl
