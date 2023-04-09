import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserSignUp = () => {
    const navigate = useNavigate();
    const [udata, sdata] = useState({
        name: "",
        email: "",
        aadhar: "",
        password: "",
        cpassword: "",

    });
    const adddata = (e) => {
        const { name, value } = e.target;
        sdata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    }
    const senddata = async (e) => {
        e.preventDefault();
        const { name, email, aadhar,password, cpassword } = udata
        console.log(udata)
        const res = await fetch("https://crime-data-management-api.vercel.app/api/users/register", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, aadhar, password, cpassword
            })
        })
        const data = await res.json();
        console.log(data);
        if (res.status === 400 || !data) {
            toast.warn("invalid details", {
                position: "top-center"
            })
        } else {
            // alert("data successfully added");
            toast.success("data successfully added", {
                postition: "top-center"
            })
            sdata({ ...udata, name: "", email: "", aadhar: "", password: "", cpassword: ""});
            navigate("/")
        }

    }
    return (
        <div className='relative w-full h-screen bg-zinc-900/90'>
            <img className='absolute w-full h-full object-cover mix-blend-overlay' src="" alt="/" />


            <div className='flex justify-center items-center h-full'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-8'>
                    <h2 className='text-4xl font-bold text-center py-4'>USER SIGN UP</h2>
                    <div className='flex flex-col mb-4'>
                        <label>Name</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Name' type="name" onChange={adddata} value={udata.name} name="name" />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Email</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Email' type="email" onChange={adddata} value={udata.email} name="email" />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Aadhar Number</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Aadhar Number' type="text" onChange={adddata} value={udata.aadhar} name="aadhar" />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Password</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Password' type="password" onChange={adddata} value={udata.password} name="password" />
                    </div>
                    <div className='flex flex-col '>
                        <label>Confirm Password</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Confirm Password' type="password" onChange={adddata} value={udata.cpassword} name="cpassword" />
                    </div>
                    <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white' onClick={senddata}>Sign Up</button>
                    {/* <NavLink to="/users/login/users/register">
                    <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white'>Sign Up</button>
                    </NavLink> */}
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}
export default UserSignUp