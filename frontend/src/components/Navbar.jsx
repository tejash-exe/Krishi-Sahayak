import React, { useState, useRef, useCallback, useContext, useEffect } from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass, faXmark, faGlobe, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../context/context'


const Navbar = () => {

  const navigate = useNavigate();
  const { isAuth, setisAuth } = useContext(AppContext);

  //Logout
  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users/logout", {
      method: "POST"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setisAuth(false);
        localStorage.clear();
      })
      .catch(error => console.log(error));
  };

  //Login
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login-register');
  }


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

  //Cart
  const gotocart = (e) => {
    e.preventDefault();
    navigate('/cart');
  };

  //Profilemenu
  const name = localStorage.getItem("name") || "user";
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

  // Language
  const { language, setlanguage } = useContext(AppContext);
  const languagebuttonref = useRef();
  const languagemenuref = useRef();
  const [openlanguagemenu, setopenlanguagemenu] = useState(false);

  const languagebuttonclick = () => {
    setopenlanguagemenu((prev) => !prev);
  };

  useEffect(() => {
    const handleLanguageClick = (e) => {
      if (
        languagebuttonref.current &&
        !languagebuttonref.current.contains(e.target) &&
        languagemenuref.current &&
        !languagemenuref.current.contains(e.target)
      ) {
        setopenlanguagemenu(false);
      }
    };

    if (openlanguagemenu) {
      document.addEventListener('click', handleLanguageClick);
    } else {
      document.removeEventListener('click', handleLanguageClick);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleLanguageClick);
    };
  }, [openlanguagemenu]);


  return (
    <div className='fixed top-0 w-screen z-10 bg-white h-[4rem] flex justify-between items-center shadow'>
      <div onClick={gotoHome} className='text-orange-600 cursor-pointer font-bold md:text-3xl text-xl pl-8 sm:block hidden '>Krishi-Sahayak</div>
      {/* <div className='lg:flex items-center hidden '>
        <div className='mr-6'>Fertilizer Calculator</div>
        <div>Soil Card</div>
      </div> */}
      <div>
        <form onSubmit={startsearch} className='rounded-md md:mx-0 mx-5  bg-gray-200 flex justify-center items-center'>
          <button disabled={(fertilizer == "")} type='submit' className='bg-gray-200 flex justify-center items-center hover:opacity-100 opacity-50 duration-200'><FontAwesomeIcon className='w-6 p-2' icon={faMagnifyingGlass} /></button>
          <input ref={searchbarref} autoComplete='off' name='search' type="text" placeholder='Search fertilizer' value={fertilizer} onChange={changefertilizer} className=' outline-none lg:w-[15rem] md:w-[10rem] w-[8rem] min-w-0 placeholder:text-ellipsis h-10 text-gray-800 bg-gray-200' />
          <button style={{ opacity: fertilizer === "" ? 0 : 0.5, cursor: fertilizer === "" ? 'default' : 'pointer' }} className='bg-gray-200 flex justify-center items-center hover:opacity-100 opacity-50 duration-200' onClick={clearfertilizer}><FontAwesomeIcon className='w-6 p-2' icon={faXmark} /></button>
        </form>
      </div>
      <div className='flex items-center'>
        <div ref={languagebuttonref} onClick={languagebuttonclick} className={'mr-5 cursor-pointer flex items-center border-2 rounded-3xl md:p-2 p-3 duration-200 ' + ((openlanguagemenu) ? ' bg-orange-200 border-orange-300 ' : ' hover:bg-orange-50 border-gray-200 hover:border-orange-300')}>
          <FontAwesomeIcon icon={faGlobe} className=' text-gray-800 h-5 w-5 ' />
          <div className='outline-none mx-2 bg-inherit md:block hidden '>
            {language}
          </div>
          {openlanguagemenu &&
            <div ref={languagemenuref} className='flex flex-col fixed top-[5rem] sm:right-[8rem] right-4 items-start bg-gray-100 p-4 rounded-xl'>
              <div className='pb-2 border-b-2 border-gray-300'>Select language</div>
              <div onClick={(e) => setlanguage('English')} className={'pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200 ' + ((language == "English") ? ' font-semibold' : ' ')}>English</div>
              <div onClick={(e) => setlanguage('Hindi')} className={'pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200 ' + ((language == "Hindi") ? ' font-semibold' : ' ')}>हिन्दी</div>
              <div onClick={(e) => setlanguage('Hindi')} className={'pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200 ' + ((language == "Hindi") ? ' font-semibold' : ' ')}>ਪੰਜਾਬੀ</div>
              <div onClick={(e) => setlanguage('Hindi')} className={'pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200 ' + ((language == "Hindi") ? ' font-semibold' : ' ')}>हरियाणवी</div>
              <div onClick={(e) => setlanguage('Hindi')} className={'pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200 ' + ((language == "Hindi") ? ' font-semibold' : ' ')}>বাংলা</div>
              <div onClick={(e) => setlanguage('Hindi')} className={'pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200 ' + ((language == "Hindi") ? ' font-semibold' : ' ')}>తెలుగు</div>
              <div onClick={(e) => setlanguage('Hindi')} className={'pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200 ' + ((language == "Hindi") ? ' font-semibold' : ' ')}>தமிழ்</div>
              <div onClick={(e) => setlanguage('Hindi')} className={'pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200 ' + ((language == "Hindi") ? ' font-semibold' : ' ')}>ಕನ್ನಡ</div>
              <div onClick={(e) => setlanguage('Hindi')} className={'pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200 ' + ((language == "Hindi") ? ' font-semibold' : ' ')}>മലയാളം</div>
            </div>
          }
        </div>
        <NavLink className={({ isActive }) => 'cursor-pointer h-12 w-12 flex justify-center items-center rounded-full mr-4  duration-150 ' + ((isActive) ? ' bg-green-700 text-white ' : ' hover:bg-gray-300/80 bg-gray-200 active:bg-gray-300 ')} to='/cart'><FontAwesomeIcon className='p-3 h-5 w-5' icon={faShoppingCart} /></NavLink>
        <button ref={profilebuttonref} onClick={profilebuttonclick} className='h-12 w-12 rounded-full mr-8 sm:block hidden bg-gray-400 hover:bg-gray-400/80 active:bg-gray-400 duration-150'>
          <FontAwesomeIcon className='p-3 h-4 w-4' icon={faUser} />
          {profile &&
            <div ref={profilemenuref} onClick={(e) => e.stopPropagation()} className='mt-6 fixed p-4 rounded-xl bg-gray-100 right-4 flex flex-col items-start w-[150px] duration-200'>

              <div className='border-b-2 text-left border-gray-300 pb-2 text-gray-600 cursor-default'>Hello, {name}</div>
              <Link to="/profile" className='pt-2 text-gray-600 hover:text-black hover:font-semibold duration-200'>Profile</Link>
              <Link to="/orders" className='py-2 text-gray-600 hover:text-black hover:font-semibold duration-200'>Orders</Link>
              {isAuth ? <div onClick={(e) => handleLogout(e)} className='text-white hover:bg-red-500 px-4 py-3 bg-red-400 rounded-md duration-200' >Log Out</div> :
                <div onClick={(e) => handleLogin(e)} className='text-white hover:bg-red-500 px-4 py-3 bg-red-400 rounded-md duration-200' >Log In</div>}
            </div>
          }
        </button>
      </div>
    </div>
  )
}

export default Navbar
