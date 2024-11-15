import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faSeedling, faShop } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-regular-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import Notification from '../../components/Notification'
import { AppContext } from '../../context/context'

const Home = () => {
        const { welcome, setwelcome } = useContext(AppContext);
        const [isPopup, setisPopup] = useState(true);
        const [popupMessage, setpopupMessage] = useState("jsdakdas;d");
        const name = localStorage.getItem("name");
        useEffect(() => {
            if(isPopup){
                setTimeout(() => {
                    setisPopup(false);
                }, 3000);
            }
        }, [isPopup]);
        useEffect(() => {
            if(welcome){
                setpopupMessage(`Hello, ${name}`);
                setisPopup(true);
                setwelcome(false);
            }
        }, [welcome]); 

        const exitPopup = () => {
            setisPopup(false);
        };
    return (
        <div className='mt-[4rem] sm:mb-0 mb-[4rem] flex flex-col items-center '>
            {isPopup && <Notification message={popupMessage} onexit={exitPopup} />}
            <div className='flex flex-col items-center'>
                <div className='font-bold text-4xl text-center mt-[6rem]'>Welcome to Krishi Sahayak</div>
                <div className='text-center w-2/3 mt-7 italic'>"Krishi-Sahayak is an all-in-one agricultural support platform designed to empower farmers with data-driven solutions for sustainable farming. It provides personalized fertilizer recommendations based on soil health, crop type, and local weather, ensuring optimal nutrient use and improved yields. The platform also offers smart crop selection guidance using Soil Health Card data, and advanced crop disease detection through machine learning, allowing farmers to diagnose and manage issues early. With an integrated marketplace, Krishi-Sahayak connects farmers directly with buyers and suppliers, reducing middlemen and ensuring fair prices for produce and agricultural inputs. Additionally, it features a multilingual educational library with video lessons and tutorials on best farming practices and innovative techniques. By combining these features, Krishi-Sahayak aims to transform the agricultural landscape, enhancing productivity, profitability, and sustainability for farmers."</div>
            </div>
            <div className=' flex flex-col items-center md:px-20 mt-8'>
                <div className='font-bold text-3xl'>Tools</div>
                <div className='mt-2 flex flex-wrap justify-center'>
                    <div className='cursor-pointer md:m-8 m-3 flex flex-col items-center justify-between md:w-[13rem] w-[10rem] md:h-[15rem] h-[12rem] bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 backdrop-blur-xl rounded-2xl hover:scale-105 duration-200 hover:shadow-[0px_0px_50px_-30px_rgba(0,0,0,1)]'>
                        <div className='mt-4'>
                            <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                                <div className='flex p-3 overflow-hidden items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                                    <img className=' w-[4.8rem] h-[4.8rem] object-contain rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' src='/compost.png' />
                                </div>
                            </div>
                        </div>
                        <div className='md:mb-8 mb-4 text-white font-semibold md:text-lg text-base text-center px-4'>Fertilizer recommendations</div>
                    </div>
                    <div className='cursor-pointer md:m-8 m-3 flex flex-col items-center justify-between md:w-[13rem] w-[10rem] md:h-[15rem] h-[12rem] bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 backdrop-blur-xl rounded-2xl hover:scale-105 duration-200 hover:shadow-[0px_0px_50px_-30px_rgba(0,0,0,1)]'>
                        <div className='mt-4'>
                            <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                                <div className='flex p-3 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                                    <FontAwesomeIcon className=' w-10 h-10 p-4 rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' icon={faSeedling} />
                                </div>
                            </div>
                        </div>
                        <div className='md:mb-8 mb-4 text-white font-semibold md:text-lg text-base text-center px-4'>Crop recommendations</div>
                    </div>
                    <div className='cursor-pointer md:m-8 m-3 flex flex-col items-center justify-between md:w-[13rem] w-[10rem] md:h-[15rem] h-[12rem] bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 backdrop-blur-xl rounded-2xl hover:scale-105 duration-200 hover:shadow-[0px_0px_50px_-30px_rgba(0,0,0,1)]'>
                        <div className='mt-4'>
                            <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                                <div className='flex p-3 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                                    <img className=' w-20 h-20 p-4 rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' src='/disease.png' />
                                </div>
                            </div>
                        </div>
                        <div className='md:mb-8 mb-4 text-white font-semibold md:text-lg text-base text-center px-4'>Disease detection</div>
                    </div>
                    <div className='cursor-pointer md:m-8 m-3 flex flex-col items-center justify-between md:w-[13rem] w-[10rem] md:h-[15rem] h-[12rem] bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 backdrop-blur-xl rounded-2xl hover:scale-105 duration-200 hover:shadow-[0px_0px_50px_-30px_rgba(0,0,0,1)]'>
                        <div className='mt-4'>
                            <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                                <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                                    <FontAwesomeIcon className=' w-10 h-10 p-4 rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' icon={faNewspaper} />
                                </div>
                            </div>
                        </div>
                        <div className='md:mb-8 mb-4 text-white font-semibold md:text-lg text-base text-center px-4'>Articles</div>
                    </div>
                    <div className='cursor-pointer md:m-8 m-3 flex flex-col items-center justify-between md:w-[13rem] w-[10rem] md:h-[15rem] h-[12rem] bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 backdrop-blur-xl rounded-2xl hover:scale-105 duration-200 hover:shadow-[0px_0px_50px_-30px_rgba(0,0,0,1)]'>
                        <div className='mt-4'>
                            <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                                <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                                    <FontAwesomeIcon className=' w-10 h-10 p-4 rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' icon={faYoutube} />
                                </div>
                            </div>
                        </div>
                        <div className='md:mb-8 mb-4 text-white font-semibold md:text-lg text-base text-center px-4'>Videos</div>
                    </div>
                    <div className='cursor-pointer md:m-8 m-3 flex flex-col items-center justify-between md:w-[13rem] w-[10rem] md:h-[15rem] h-[12rem] bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 backdrop-blur-xl rounded-2xl hover:scale-105 duration-200 hover:shadow-[0px_0px_50px_-30px_rgba(0,0,0,1)]'>
                        <div className='mt-4'>
                            <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                                <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                                    <FontAwesomeIcon className=' w-10 h-10 p-4 rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' icon={faShop} />
                                </div>
                            </div>
                        </div>
                        <div className='md:mb-8 mb-4 text-white font-semibold md:text-lg text-base text-center px-4'>Marketplace</div>
                    </div>
                    <div className='cursor-pointer md:m-8 m-3 flex flex-col items-center justify-between md:w-[13rem] w-[10rem] md:h-[15rem] h-[12rem] bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 backdrop-blur-xl rounded-2xl hover:scale-105 duration-200 hover:shadow-[0px_0px_50px_-30px_rgba(0,0,0,1)]'>
                        <div className='mt-4'>
                            <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                                <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                                    <FontAwesomeIcon className=' w-10 h-10 p-4 rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' icon={faCalculator} />
                                </div>
                            </div>
                        </div>
                        <div className='md:mb-8 mb-4 text-white font-semibold md:text-lg text-base text-center px-4'>Calculator</div>
                    </div>
                    <div className='cursor-pointer md:m-8 m-3 flex flex-col items-center justify-between md:w-[13rem] w-[10rem] md:h-[15rem] h-[12rem] bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 backdrop-blur-xl rounded-2xl hover:scale-105 duration-200 hover:shadow-[0px_0px_50px_-30px_rgba(0,0,0,1)]'>
                        <div className='mt-4'>
                            <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_15px_1px_rgba(255,255,255,0.2)] '>
                                <div className='flex md:p-3 p-2 items-center justify-center rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] '>
                                    <img className=' w-20 h-20 p-4 rounded-full bg-white/10 shadow-[0px_0px_5px_1px_rgba(255,255,255,0.2)] ' src='/up-and-down-arrow.png' />
                                </div>
                            </div>
                        </div>
                        <div className='md:mb-8 mb-4 text-white font-semibold md:text-lg text-base text-center px-4'>Unit Converter</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
