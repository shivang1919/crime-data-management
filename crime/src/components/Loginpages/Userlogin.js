import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Userlogin() {
    const navigate = useNavigate();

    const [logdata, setdata] = useState({
        email: "",
        password: ""
    })
    const adddata = (e) => {
        const { name, value } = e.target;
        setdata(() => {
            return {
                ...logdata,
                [name]: value
            }

        })
    }
    const senddata = async (e) => {

        e.preventDefault();
        console.log("I am here")
        const { email, password } = logdata;
        const res = await fetch("https://crime-data-management-api.vercel.app/api/users/login", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({
                email, password
            })
        })
        const data = await res.json();
        console.log(data);
        localStorage.setItem("userdata", JSON.stringify(data));
        if (res.status === 400 || !data) {
            console.log("invalid details");
            toast.warn("invalid details", {
                position: 'top-center'
            })
        } else {
            console.log("data valid")
            // setAccount(data)
            toast.success("login done successfully", {
                position: "top-center"
            })
            setdata({ ...logdata, email: "", password: "" });
            navigate("/signin/users/login/verifyOtp");
        }


    }
    return (
        <div className='relative w-full h-screen bg-zinc-900/90'>
            <img className='absolute w-full h-full object-cover mix-blend-overlay' src="" alt="/" />


            <div className='flex justify-center items-center h-full'>
                <form className='max-w-[500px] w-full  mx-auto bg-white p-8'>
                    <h2 className='text-4xl font-bold text-center py-4'>USER LOGIN</h2>
                    <div className='flex flex-col mb-4'>
                        <label>Email</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Email' type="email" onChange={adddata} value={logdata.email} name="email" />
                    </div>
                    <div className='flex flex-col '>
                        <label>Password</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Password' type="password" onChange={adddata} value={logdata.password} name="password" />
                    </div>
                    <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white' onClick={senddata}>Login</button>
                    <p className='text-center mt-8'>Not a member? Sign up now</p>
                    <NavLink to="/signin/users/login/users/register">
                    <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white'>Sign Up</button>
                    </NavLink>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}