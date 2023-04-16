import React, { useState } from "react";
import Table from "./Table";

const Searchfir = () => {

    const [pdata, sdata] = useState({
        FIRno: ""
        // value: ""


    });
    const adddata = (e) => {
        const { name, value } = e.target;
        sdata(() => {
            return {
                ...pdata,
                [name]: value
            }
        })
    }




    const [users, setUsers] = useState([])



    const fetchUserData = async (e) => {
        e.preventDefault();
        const { FIRno } = pdata

        await fetch(`https://crime-data-management-api.vercel.app/api/users/getfir?FIRno=${FIRno}`)
        .then(response => {
            
            return response.json()

        })
        .then(data => {
            console.log(data[0]);
            setUsers(data[0])
        })
    }

    // useEffect(() => {
    //     fetchUserData()
    // }, [])


    return (

        <div className="relative w-full h-screen backdrop-blur">
            <div className='flex justify-center items-center '>
                <form className='max-w-[500px] w-full max-h-[500px] mx-auto bg-white p-8 mt-8 mb-8'>
                    <h2 className='text-4xl font-bold text-center py-4'>Search Fir</h2>
                    <div className='flex flex-col mb-4'>
                        <label>FIRno</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Enter FIR no.' type="text" onChange={adddata} value={pdata.FIRno} name="FIRno" />
                    </div>
                    {/* <div className='flex flex-col mb-4'>
                        <label>Value</label>
                        <input className='border relative bg-gray-100 p-2' placeholder='Search by value' type="text" onChange={adddata} value={pdata.value} name="value" />
                    </div> */}
                    <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white' onClick={ fetchUserData} >Search</button>
                </form>
            </div>
            {
                users.length !== 0 && <Table data={users} />
            }
            {/* {users.length > 0 && (
                <ul>

                    {users.map(user => (
                        <div className=" flex justify-center items-center">
                        <li key={user.id} className="text-white float-left mr-8" >{user.name}</li>
                        <li key={user.id} className="text-white float-left mr-8" >{user.age}</li>
                        <li key={user.id} className="text-white float-left mr-8" >{user.place}</li>
                        </div>
                    ))}
                </ul>


                
            )} */}

        </div>
    );
}

export default Searchfir;