import React, { useCallback, useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/context';

const Profile = () => {

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

  //Redirect
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAuth){
      navigate('/login-register');
    }
  }, [isAuth]);

  //Info
  const name = localStorage.getItem("name") || "Please login";
  const phone = localStorage.getItem("phone");

  //Update menu
  const [updateOption, setupdateOption] = useState("Name");

  const updateName = useCallback(() => {
    setupdateOption("Name");
  }, [setupdateOption]);

  const updatePhone = useCallback(() => {
    setupdateOption("Phone");
  }, [setupdateOption]);

  const updatePassword = useCallback(() => {
    setupdateOption("Password");
  }, [setupdateOption]);

  //On-submit
  const handleupdateName = async (e) => {
    e.preventDefault();
    if (nameinput !== "" && passwordinput !== "") {
      const data = {
        newName: nameinput,
        password: passwordinput,
      }
      try {
        const response = await fetch("/api/users/update-name", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(result => {
            if(result.status == 200){
              setnameinput("");
              setpasswordinput("");
              console.log(result);
  
              localStorage.setItem("name", result.data.name);
              // localStorage.setItem("phone", result.data.user.phone);
              // localStorage.setItem("picture", result.data.user.profilePicture);
              // localStorage.setItem("wishlist", JSON.stringify(result.data.user.wishlist));
            }
            else{
              throw new Error(result.message);
            }
          })
          .catch(error => console.log(error));
  
      } catch (error) {
        console.log(error);
      }
    }
    else{
      console.log("Please fill required fields");
    }
  };

  const handleupdatePhone = async (e) => {
    e.preventDefault();
    if (phoneinput !== "" && passwordinput !== "") {
      const data = {
        newPhone: phoneinput,
        password: passwordinput,
      }
      try {
        const response = await fetch("/api/users/update-phone", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(result => {
            if(result.status == 200){
              setphoneinput("");
              setpasswordinput("");
              console.log(result);
  
              localStorage.setItem("phone", result.data.phone);
              // localStorage.setItem("phone", result.data.user.phone);
              // localStorage.setItem("picture", result.data.user.profilePicture);
              // localStorage.setItem("wishlist", JSON.stringify(result.data.user.wishlist));
            }
            else{
              throw new Error(result.message);
            }
          })
          .catch(error => console.log(error));
  
      } catch (error) {
        console.log(error);
      }
    }
    else{
      console.log("Please fill required fields");
    }
  };

  const handleupdatePassword = async (e) => {
    e.preventDefault();
    if (newpasswordinput !== "" && passwordinput !== "" && confirmpasswordinput !== "" && newpasswordinput === confirmpasswordinput) {
      const data = {
        newPassword: newpasswordinput,
        password: passwordinput,
      }
      try {
        const response = await fetch("/api/users/update-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(result => {
            if(result.status == 200){
              setnewpasswordinput("");
              setconfirmpasswordinput("");
              setpasswordinput("");
              console.log(result);
  
              // localStorage.setItem("phone", result.data.phone);
              // localStorage.setItem("phone", result.data.user.phone);
              // localStorage.setItem("picture", result.data.user.profilePicture);
              // localStorage.setItem("wishlist", JSON.stringify(result.data.user.wishlist));
            }
            else{
              throw new Error(result.message);
            }
          })
          .catch(error => console.log(error));
  
      } catch (error) {
        console.log(error);
      }
    }
    else{
      console.log("Please fill required fields");
    }
  };

  //Inputs
  const [nameinput, setnameinput] = useState("");
  const changeName = (e) => {
    setnameinput(e.target.value);
  };

  const [phoneinput, setphoneinput] = useState("");
  const changePhone = (e) => {
    setphoneinput(e.target.value);
  };

  const [newpasswordinput, setnewpasswordinput] = useState("");
  const changeNewpassword = (e) => {
    setnewpasswordinput(e.target.value);
  };

  const [confirmpasswordinput, setconfirmpasswordinput] = useState("");
  const changeConfirmpassword = (e) => {
    setconfirmpasswordinput(e.target.value);
  };

  const [passwordinput, setpasswordinput] = useState("");
  const changePassword = (e) => {
    setpasswordinput(e.target.value);
  };

  return (
    <div className='mt-[4rem] sm:mb-0 mb-[4rem] flex flex-col items-center'>
      <div className=' w-5/6 '>
        <div className='text-3xl font-semibold my-6'>Kisaan:</div>
        <div className='flex flex-wrap md:justify-normal justify-center'>
          <div className='justify-around min-w-[9rem] flex flex-col items-center bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 mr-6 mb-6 rounded-2xl'>
            <div className='py-6 px-8'><img className='w-[13rem] h-[13rem] rounded-full' src="/kisaan.png" /></div>
            <div className='mb-10'>
              <div>Name : {name}</div>
              <div>Phone : {phone}</div>
              <div>Reward : ₹0/- </div>
            </div>
          </div>
          {/* <div className='justify-around min-w-[9rem] flex flex-col items-center bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 md:mr-6 mr-3 md:mb-6 mb-3 rounded-2xl'>
            <div className='md:py-6 md:px-8 p-3'><img className='md:w-[13rem] w-[5rem] md:h-[13rem] h-[5rem] rounded-full' src="/kisaan.png" /></div>
            <div className='md:mb-10 mb-5 md:text-base text-xs'>
              <div>Name : Aditya Choudhary</div>
              <div>Phone : 6201010626</div>
              <div>Reward : ₹0/- </div>
            </div>
          </div> */}
          <div className='flex flex-wrap'>
            <button className='justify-around min-w-[9rem] flex flex-col items-center bg-green-700 text-white hover:bg-green-700/10 hover:text-black font-semibold text-2xl duration-200 active:scale-95 border-green-700 border-2 md:mr-6 mr-3 md:mb-6 mb-3 rounded-2xl'>
              <div className='md:py-6 md:px-8 p-3'><img className='md:w-[13rem] w-[5rem] md:h-[13rem] h-[5rem] rounded-full' src="/soilcard.png" /></div>
              <div className='md:mb-12 mb-7 md:text-2xl text-sm'>Soil Card</div>
            </button>
            <button onClick={handleLogout} className='justify-around md:min-w-[17rem] min-w-[9rem] flex flex-col items-center bg-red-600 text-white hover:bg-red-700 font-semibold text-2xl duration-200 active:scale-95 md:mr-6 mr-3 md:mb-6 mb-3 rounded-2xl'>
              <div className='m-4'>
                <div className='flex md:p-4 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                  <div className='flex md:p-4 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                    <FontAwesomeIcon className='text-black md:w-16 w-8 h-8 md:h-16 md:p-4 p-2 rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' icon={faRightFromBracket} />
                  </div>
                </div>
              </div>
              <div className='mb-8 md:text-2xl text-sm'>Log out</div>
            </button>
          </div>
        </div>
        <div className='border-2 border-green-700 rounded-2xl mb-6 flex flex-col'>
          <div className='px-6 pt-6 pb-2'>
            <button onClick={updateName} className={'border-green-700 border-2 duration-200 px-5 py-3 rounded-3xl mr-4 mb-4' + ((updateOption == 'Name') ? ' bg-white hover:bg-white text-black ' : ' hover:bg-green-50 hover:text-black bg-green-700 text-white ')}>Update name</button>
            <button onClick={updatePhone} className={'border-green-700 border-2 duration-200 px-5 py-3 rounded-3xl mr-4 mb-4' + ((updateOption == 'Phone') ? ' bg-white hover:bg-white text-black ' : ' hover:bg-green-50 hover:text-black bg-green-700 text-white ')}>Update phone no.</button>
            <button onClick={updatePassword} className={'border-green-700 border-2 duration-200 px-5 py-3 rounded-3xl mr-4 mb-4' + ((updateOption == 'Password') ? ' bg-white hover:bg-white text-black ' : ' hover:bg-green-50 hover:text-black bg-green-700 text-white ')}>Update password</button>
          </div>
          {(updateOption == 'Name') &&
            <form onSubmit={(e) => handleupdateName(e)} className='m-6 mt-0 p-6 bg-gray-200 rounded-xl'>
              <div>Enter new name : </div>
              <div className='mt-2 mb-4'>
                <input required className='bg-gray-50 outline-none rounded-xl px-3 py-2' type="text" name='Name' placeholder='Name' value={nameinput} onChange={changeName}/>
              </div>
              <div>Enter password : </div>
              <div className='mt-2 mb-6'>
                <input required className='bg-gray-50 outline-none rounded-xl px-3 py-2' type="password" name='Old password' placeholder='Password' value={passwordinput} onChange={changePassword} />
              </div>
              <input className='bg-green-700 text-white px-3 py-2 rounded-xl cursor-pointer active:scale-95 hover:bg-green-50 hover:text-black duration-200 border-2 border-green-700' type="submit" value="Update name" />
            </form>
          }
          {(updateOption == 'Phone') &&
            <form onSubmit={(e) => handleupdatePhone(e)} className='m-6 mt-0 p-6 bg-gray-200 rounded-xl'>
              <div>Enter new phone number : </div>
              <div className='mt-2 mb-4'>
                <input required className='bg-gray-50 outline-none rounded-xl px-3 py-2' type="number" name='Phone' placeholder='Phone number' value={phoneinput} onChange={changePhone} />
              </div>
              <div>Enter password : </div>
              <div className='mt-2 mb-6'>
                <input required className='bg-gray-50 outline-none rounded-xl px-3 py-2' type="password" name='Old password' placeholder='Password' value={passwordinput} onChange={changePassword} />
              </div>
              <input className='bg-green-700 text-white px-3 py-2 rounded-xl cursor-pointer active:scale-95 hover:bg-green-50 hover:text-black duration-200 border-2 border-green-700' type="submit" value="Update phone no." />
            </form>
          }
          {(updateOption == "Password") &&
            <form onSubmit={(e) => handleupdatePassword(e)} className='m-6 mt-0 p-6 bg-gray-200 rounded-xl'>
              <div>Enter new password : </div>
              <div className='mt-2 mb-4'>
                <input required className='bg-gray-50 outline-none rounded-xl px-3 py-2' type="password" name='new password' placeholder='New password' value={newpasswordinput} onChange={changeNewpassword} />
              </div>
              <div>Confirm new password : </div>
              <div className='mt-2 mb-4'>
                <input required className={((newpasswordinput === confirmpasswordinput) ? ' bg-gray-50 ' : ' bg-red-200 ') + ' outline-none rounded-xl px-3 py-2 '} type="password" name='confirm new password' placeholder='Confirm new password' value={confirmpasswordinput} onChange={changeConfirmpassword} />
              </div>
              <div>Enter current password : </div>
              <div className='mt-2 mb-6'>
                <input required className='bg-gray-50 outline-none rounded-xl px-3 py-2' type="password" name='Old password' placeholder='Current Password' value={passwordinput} onChange={changePassword} />
              </div>
              <input className='bg-green-700 text-white px-3 py-2 rounded-xl cursor-pointer active:scale-95 hover:bg-green-50 hover:text-black duration-200 border-2 border-green-700' type="submit" value="Update password" />
            </form>
          }
        </div>
        <div className='text-3xl font-semibold my-6'>My Orders :</div>
        <div className='border-2 border-green-700 rounded-2xl mb-6 flex md:p-6 p-4 overflow-x-auto'>
          <div className='md:p-6 p-3 bg-gray-200 rounded-xl md:mr-6 mr-4 md:w-[14rem] w-[8.7rem]'>
            <div className=''><img className='rounded-xl md:w-[11rem] w-[8rem] md:h-[13rem] h-[8rem] object-cover' src="/fertilizer.jpg" /></div>
            <div className='my-2'>
              <div className='text-gray-600 md:text-sm text-xs'>Government</div>
              <div title='Nitrogen fertilizer 3kg with pesticides' className='font-semibold text-ellipsis overflow-hidden whitespace-nowrap md:text-base text-sm'>Nitrogen fertilizer 3kg with pesticides</div>
              <div className='text-sm'>₹500/-</div>
            </div>
            <div className='font-bold md:text-base text-sm'>On the way</div>
          </div>
          <Link to='/orders' className='p-6 active:scale-95 bg-gray-200 rounded-xl md:w-[14rem] w-[8.7rem] cursor-pointer flex flex-col items-center justify-around bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 duration-200 '>
            <div className='mt-4'>
              <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                  <FontAwesomeIcon className=' md:w-16 w-10 h-10 md:h-16 md:p-4 p-3 rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' icon={faBoxOpen} />
                </div>
              </div>
            </div>
            <div className='md:mb-8 mb-4 text-white font-semibold md:text-lg text-sm text-center md:px-4'>See all orders</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
