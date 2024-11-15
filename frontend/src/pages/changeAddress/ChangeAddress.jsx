import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/context';

const ChangeAddress = () => {
    //Input
    const [localAddress, setlocalAddress] = useState('');
    const [landmark, setlandmark] = useState('');
    const [pincode, setpincode] = useState(833215);
    const [state, setstate] = useState('');
    const [city, setcity] = useState('');

    const changeLocalAddress = (e) => {
        setlocalAddress(e.target.value);
    };

    const changeLandmark = (e) => {
        setlandmark(e.target.value);
    };

    const changepincode = (e) => {
        setpincode(e.target.value);
    };

    const changeCity = (e) => {
        setcity(e.target.value);
    };

    //Fetch state & city
    const [cities, setcities] = useState([]);
    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
                    method: "GET",
                })
                const result = await response.json();
                if (result[0].PostOffice != null) {
                    console.log(result[0].PostOffice);
                    setcities(result[0].PostOffice);
                    setstate(result[0].PostOffice[0].State);
                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchPlace();
    }, [pincode]);

    //Change address
    const { setaddress } = useContext(AppContext);
    const changeAddress = async (e) => {
        e.preventDefault();

        if (localAddress.trim() != "" && (pincode == cities[0].Pincode)) {
            const data = {
                localAddress: localAddress,
                landmark: landmark,
                city: city,
                state: state,
                pincode: pincode,
            };
            try {
                const response = await fetch("/api/users/change-address", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                const result = await response.json();
                console.log(result);
                setaddress(result.data.address);
                setcity('');
                setlocalAddress('');
                setlandmark('');
                setstate('');
                setpincode(833215);

            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log("Important fields are required!");
        }
    };

    return (
        <div className='mt-[8rem] flex justify-center items-center '>
            <div>
                <div className='text-2xl font-bold my-2'>Change address: </div>
                <form onSubmit={(e) => changeAddress(e)} className='flex flex-col border-2 border-green-700 p-4 rounded-xl'>
                    <div className='my-2'>Local Address:</div>
                    <input required className='bg-gray-100 p-3 rounded-lg outline-none' type="text" placeholder='localAddress' value={localAddress} onChange={(e) => changeLocalAddress(e)} />
                    <div className='my-2'>{"Landmark " + "(" + "optional" + ")"}:</div>
                    <input className='bg-gray-100 p-3 rounded-lg outline-none' type="text" placeholder='landmark' value={landmark} onChange={(e) => changeLandmark(e)} />
                    <div className='my-2'>Pincode:</div>
                    <input required className='bg-gray-100 p-3 rounded-lg outline-none' type="text" pattern="\d{6}" maxLength={6} placeholder='pincode' value={pincode} onChange={(e) => changepincode(e)} />
                    <div className='my-4 flex justify-between'>
                        <select required value={city} onChange={(e) => changeCity(e)} className='w-[10rem] mr-5 outline-none px-2 border-green-700 border-2 rounded-lg' name="city" id="city">
                            <option value="" >Select a city</option>
                            {cities && cities.map(((city, index) => {
                                return <option key={index} value={city.Name}>{city.Name}</option>
                            }))}
                        </select>
                        <input required className='w-[9rem] bg-gray-100 p-3 rounded-lg outline-none' type="text" placeholder='state' disabled value={state} readOnly />
                    </div>
                    <input className='bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 py-3 rounded-lg font-bold text-white active:scale-95 duration-200 cursor-pointer' type="submit" value="CHANGE ADDRESS" />
                </form>
            </div>
        </div>
    )
}

export default ChangeAddress
