import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import './bottomfilterpanel.css'


const Bottomfilterpanel = (props) => {

    const filterpanelRef = useRef();
    const filterpanelmenuRef = useRef();
    const [filtermenu, setfiltermenu] = useState(false);

    const filterpanelclick = () => {
        setfiltermenu((prevFiltermenu) => !prevFiltermenu);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                filterpanelRef.current &&
                !filterpanelRef.current.contains(e.target) &&
                filterpanelmenuRef.current &&
                !filterpanelmenuRef.current.contains(e.target)
            ) {
                setfiltermenu(false);
            }
        };

        if (filtermenu) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [filtermenu]);

    return (
        <div ref={filterpanelRef} onClick={filterpanelclick} className={'fixed z-30 bottom-[4rem] h-[4rem] w-screen flex items-center justify-center border-t sm:hidden' + ((filtermenu) ? ' bg-gray-50 ' : " bg-white ")}>
            {filtermenu &&
                <div id='filtermenu' ref={filterpanelmenuRef} onClick={(e) => e.stopPropagation()} className='fixed flex flex-col bottom-[8rem] w-screen bg-gray-50 border-t pt-4 rounded-3xl'>
                    <button onClick={() => props.setsearchby('Recently added')} className={' border-green-700 px-3 mx-4 my-1 py-2 border-2 rounded-xl duration-200' + ((props.searchby === 'Recently added') ? ' bg-green-700 text-white hover:bg-green-700 ' : ' hover:bg-green-700/10 ')}>Recently added</button>
                    <button onClick={() => props.setsearchby('Price: High to low')} className={' border-green-700 px-3 mx-4 my-1 py-2 border-2 rounded-xl duration-200' + ((props.searchby === 'Price: High to low') ? ' bg-green-700 text-white hover:bg-green-700 ' : ' hover:bg-green-700/10 ')}>Price: High to low</button>
                    <button onClick={() => props.setsearchby('Price: Low to high')} className={' border-green-700 px-3 mx-4 my-1 py-2 border-2 rounded-xl duration-200' + ((props.searchby === 'Price: Low to high') ? ' bg-green-700 text-white hover:bg-green-700 ' : ' hover:bg-green-700/10 ')}>Price: Low to high</button>
                    <button onClick={() => props.setsearchby('Most ordered')} className={' border-green-700 px-3 mx-4 my-1 py-2 border-2 rounded-xl duration-200' + ((props.searchby === 'Most ordered') ? ' bg-green-700 text-white hover:bg-green-700 ' : ' hover:bg-green-700/10 ')}>Most ordered</button>
                    <button onClick={() => props.setsearchby('Most liked')} className={' border-green-700 px-3 mx-4 my-1 py-2 border-2 rounded-xl duration-200' + ((props.searchby === 'Most liked') ? ' bg-green-700 text-white hover:bg-green-700 ' : ' hover:bg-green-700/10 ')}>Most liked</button>
                </div>}
            <div>Sort by : {props.searchby}</div>
        </div>
    )
}

export default Bottomfilterpanel
