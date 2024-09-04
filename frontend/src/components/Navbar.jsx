import React, { useState, useRef, useCallback, useContext, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faXmark, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../context/context'


const Navbar = () => {

  const navigate = useNavigate();

  const gotoHome = useCallback((e) => {
    e.preventDefault();
    navigate('/home');
  }, [navigate]);

  //SearchBar
  const [fertilizer, setfertilizer] = useState("");
  const searchbarref = useRef();

  const changefertilizer = useCallback((e) => {
    setfertilizer(e.target.value);
  }, [setfertilizer]);

  const clearfertilizer = useCallback((e) => {
    e.preventDefault();
    setfertilizer("");
    searchbarref.current.focus();
  }, [setfertilizer]);

  const startsearch = (e) => {
    e.preventDefault();
    searchbarref.current.blur();
    navigate(`/searchresults/${fertilizer}/`);
  };

  // Language
  const { language, setlanguage } = useContext(AppContext);

  const changeLanguage = (event) => {
    setlanguage(event.target.value);
  };

  //Profilemenu
  const [profile, setprofile] = useState(false);
  const profilebuttonref = useRef();
  const profilemenuref = useRef();

  const profilebuttonclick = () => {
    setprofile((prevProfile) => !prevProfile);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profilebuttonref.current &&
        !profilebuttonref.current.contains(e.target) &&
        profilemenuref.current &&
        !profilemenuref.current.contains(e.target)
      ) {
        setprofile(false);
      }
    };

    if (profile) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [profile]);

  return (
    <div className='fixed top-0 w-screen z-10 bg-white h-[4rem] flex justify-between items-center shadow'>
      <div onClick={gotoHome} className='text-orange-600 cursor-pointer font-bold md:text-3xl text-xl pl-8 sm:block hidden '>Krishi-Sahayak</div>
      <div className='lg:flex items-center hidden '>
        <div className='mr-6'>Fertilizer Calculator</div>
        <div>Soil Card</div>
      </div>
      <div>
        <form onSubmit={startsearch} className='rounded-md md:mx-0 mx-5  bg-gray-200 flex justify-center items-center'>
          <button disabled={(fertilizer == "")} type='submit' className='bg-gray-200 flex justify-center items-center hover:opacity-100 opacity-50 duration-200'><FontAwesomeIcon className='w-6 p-2' icon={faMagnifyingGlass} /></button>
          <input ref={searchbarref} autoComplete='off' name='search' type="text" placeholder='Search fertilizer' value={fertilizer} onChange={changefertilizer} className=' outline-none lg:w-[15rem] md:w-[10rem] w-[8rem] min-w-0 placeholder:text-ellipsis h-10 text-gray-800 bg-gray-200' />
          <button style={{ opacity: fertilizer === "" ? 0 : 0.5, cursor: fertilizer === "" ? 'default' : 'pointer' }} className='bg-gray-200 flex justify-center items-center hover:opacity-100 opacity-50 duration-200' onClick={clearfertilizer}><FontAwesomeIcon className='w-6 p-2' icon={faXmark} /></button>
        </form>
      </div>
      <div className='flex items-center'>
        <div className='mr-5 flex items-center border-2 border-green-700 rounded-3xl p-2 hover:bg-gray-100 duration-200'>
          <FontAwesomeIcon icon={faGlobe} className=' text-gray-800 h-5 w-5 ' />
          <select className='outline-none ml-2 w-[5rem] bg-inherit ' id="options" value={language} onChange={changeLanguage}>
            <option value="" disabled>Select language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
        <button ref={profilebuttonref} onClick={profilebuttonclick} className='h-12 w-12 rounded-full mr-8 sm:block hidden bg-gray-400 hover:bg-gray-400/80 active:bg-gray-400 duration-150'>
          <FontAwesomeIcon className='p-3 h-4 w-4' icon={faUser} />
          {profile &&
            <div ref={profilemenuref} onClick={(e) => e.stopPropagation()} className='mt-6 fixed p-4 rounded-xl bg-gray-200 right-4 flex flex-col items-start w-[150px] duration-200'>

              <div className='border-b-2 text-left border-gray-300 pb-2 text-gray-600 cursor-default'>Hello,</div>
              <Link to="/profile" className='pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200'>Profile</Link>
              <Link to="/orders" className='py-2 text-gray-600 hover:text-black hover:font-semibold duration-200'>Orders</Link>
              <button className='text-white hover:bg-red-500 px-4 py-3 bg-red-400 rounded-md duration-200' >Log Out</button>
            </div>
          }
        </button>
      </div>
    </div>
  )
}

export default Navbar
