import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faLock } from '@fortawesome/free-solid-svg-icons';

const LoginRegister = () => {
  //Login-register
  const [login, setlogin] = useState(true);

  const changeModes = (e) => {
    e.preventDefault();
    setlogin((prev) => !prev);
  };

  //input fields
  const [nameinput, setnameinput] = useState("");
  const changeName = (e) => {
    setnameinput(e.target.value);
  };

  const [phoneinput, setphoneinput] = useState("");
  const changePhone = (e) => {
    setphoneinput(e.target.value);
  };

  const [password, setpassword] = useState("");
  const changePassword = (e) => {
    setpassword(e.target.value);
  };

  //Login
//   const { isAuth, setisAuth, redirect } = useContext(AppContext);
//   const loginSubmit = async (e) => {
//     e.preventDefault();
//     if (phoneinput !== "" && password !== "") {
//       const data = {
//         phone: phoneinput,
//         password: password,
//       }
//       try {
//         const response = await fetch("/users/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         })
//           .then(res => res.json())
//           .then(result => {
//             if(result.status == 200){
//               setphoneinput("");
//               setnameinput("");
//               setpassword("");
//               console.log(result);
  
//               setisAuth(true);
  
//               localStorage.setItem("name", result.data.user.name);
//               localStorage.setItem("phone", result.data.user.phone);
//               localStorage.setItem("picture", result.data.user.profilePicture);
//               localStorage.setItem("wishlist", JSON.stringify(result.data.user.wishlist));
//             }
//             else{
//               throw new Error(result.message);
//             }
//           })
//           .catch(error => console.log(error));
  
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     else{
//       console.log("Please fill required fields");
//     }
//   };
  
//   //redirect
//   const navigate = useNavigate();
//   useEffect(() => {
//     if(isAuth == true){
//       navigate(redirect);
//     }
//   }, [isAuth]);

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='flex md:flex-row flex-col justify-center md:px-20 md:py-10 m-10 max-w-[1000px] rounded-2xl backdrop-blur-sm bg-white/40'>
        <div className='flex flex-col justify-center items-end md:border-b-0 border-b-2  md:border-r-4 p-4 mx-4 md:ml-20 border-gray-700'>
          <div>Welcome to </div>
          <div className="font-bold text-4xl text-right">Krishi Sahayak</div>
        </div>
        <form className='flex flex-col items-center m-4 mx-6 md:w-[100%]'>
          <div className='mb-3'>Please {login ? "Login" : "Register"} to continue</div>
          <div>
            {!login && <div className='flex items-center p-2 rounded-md bg-gray-200 text-gray-700 mb-3 text-base '>
              <FontAwesomeIcon icon={faUser} />
              <input className='outline-none bg-gray-200 ml-2 w-[12rem]' name='name' required value={nameinput} onChange={changeName} type="text" placeholder="Full name" />
            </div>}
            <div className='flex items-center p-2 rounded-md bg-gray-200 text-gray-700 mb-3 text-base '>
              <FontAwesomeIcon icon={faPhone} />
              <input className='outline-none bg-gray-200 ml-2 w-[12rem]' name='phone' required value={phoneinput} onChange={changePhone} type="number" placeholder="Phone" />
            </div>
            <div className='flex items-center p-2 rounded-md bg-gray-200 text-gray-700 mb-3 text-base '>
              <FontAwesomeIcon icon={faLock} />
              <input className='outline-none bg-gray-200 ml-2 w-[12rem]' name='password' required value={password} onChange={changePassword} type="password" placeholder="Password" />
            </div>
          </div>
          <div className='text-black mb-3'>{login ? "New user?" : "Existing user?"} <button type='button' onClick={changeModes} className='text-gray-600 hover:underline hover:text-black duration-200'>{login ? "Register here" : "Login here"}</button></div>
          {login ? <div className='flex justify-center'><button className='py-2 px-4 active:scale-95 duration-200 rounded-md text-white bg-orange-600/50 hover:bg-orange-700/50' type="submit">Login</button></div> :
            <div className='flex justify-center'><button className='py-2 px-4 active:scale-95 duration-200 rounded-md text-white bg-orange-600/50 hover:bg-orange-700/50' type="submit">Register</button></div>}
        </form>
      </div>
      <div className='w-screen h-screen fixed z-[-1] brightness-90'>
        <img className='min-w-[1400px]' src="/crop.jpg" alt="" />
      </div>
    </div>
  )
}

export default LoginRegister
