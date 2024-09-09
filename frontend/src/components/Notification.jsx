import React from 'react';
import './notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Notification = (props) => {
    return (
        <div onClick={props.onexit} id='notification' className='top-[1.5rem] fixed w-1/2 h-[4rem] bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 flex items-center justify-center rounded-lg shadow-lg p-1 z-50'>
            <div className='text-black font-semibold flex-grow bg-white h-full rounded-md flex items-center justify-center'>
                <div>{props.message}</div>
            </div>
            <div className='px-[1rem] cursor-pointer'>
                <FontAwesomeIcon className='text-white' icon={faXmark}/>
            </div>
        </div>
    )
}

export default Notification
