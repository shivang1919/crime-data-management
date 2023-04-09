import React from 'react';

function Logincards(){

    return(
        <div className='Cardbox'>
        <div className='Card mr-8'>
            <div className='upper-container'>
                <div className='image-container'>
                    <img className="cardimg" src="./user2.jpg" alt="" />
                </div>
            </div>
            <div className='lower-container'>
                <h3>USER</h3>
                <button className='cardbtn'>User Login</button>
            </div>
        </div>
        <div className='Card'>
            <div className='upper-container'>
                <div className='image-container'>
                    <img className="cardimg" src="./police2.jpg" alt=""/>
                </div>
            </div>
            <div className='lower-container'>
                <h3>POLICE</h3>
                <button className='cardbtn'>Police Login</button>
            </div>
        </div>
        </div>
    )
}

export default Logincards