import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Userlogin() {
    const navigate = useNavigate();

    const [logdata, setdata] = useState({
        email: "",
        otp: ""
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
        console.log("I am here and verify otp")
        const { email, otp } = logdata;
        const res = await fetch("https://crime-data-management-api.vercel.app/api/users/verifyOtp", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({
                email, otp
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
            setdata({ ...logdata, email: "", otp: "" });
            navigate("/")
        }


    }
    return (
        <div className='relative w-full h-screen backdrop-blur-sm'>
            {/* <img className='absolute w-full h-full object-cover mix-blend-overlay' src="" alt="/" /> */}


            <div className='flex justify-center items-center h-full'>
            <form className='max-w-[500px] w-full max-h-[900px] mx-auto bg-white p-8 mt-8 mb-8'>
                    <h2 className='text-4xl font-bold text-center py-4'>User OTP Verification</h2>
                    <div className='flex flex-col mb-4'>
                        <label>Email</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Email' type="email" onChange={adddata} value={logdata.email} name="email" />
                    </div>
                    <div className='flex flex-col '>
                        <label>OTP</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='OTP' type="text" onChange={adddata} value={logdata.otp} name="otp" />
                    </div>
                    <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white' onClick={senddata}>Verify</button>
                    <NavLink to="/signin/users/login/verifyOtp">
                    <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white'>Resend OTP</button>
                    </NavLink>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}