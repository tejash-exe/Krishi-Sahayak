import { faLocation, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

const FertilizerCalculator = () => {
    //https://open-meteo.com/en/docs#hourly=temperature_2m,relative_humidity_2m,soil_temperature_0cm,soil_moisture_0_to_1cm,direct_normal_irradiance

    // useEffect(() => {
    //     const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,soil_temperature_0cm,soil_moisture_0_to_1cm,direct_normal_irradiance';
    //     const options = {
    //         method: 'GET',
    //         headers: {

    //         }
    //     };
    //     const call = async () => {
    //         try {
    //             const response = await fetch(url, options);
    //             const result = await response.json();
    //             console.log(result);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     call();

    // }, []);

    return (
        <div className='mt-[4rem] w-5/6 mx-auto py-10'>
            <div className='mx-auto text-3xl font-bold mb-10'>Fertilizer & Crop Recommendations</div>
            <div className='border-2 border-green-700 rounded-2xl p-4 mb-10'>
                <div className='text-2xl font-bold mb-4 '>From the Soil Health Card</div>
                <div className='flex flex-wrap'>
                    <div className='w-[16rem] mb-2'>Nitrogen (N) = 305 kg/ha</div>
                    <div className='w-[16rem] mb-2'>Phosphorus (P) = 36 kg/ha</div>
                    <div className='w-[16rem] mb-2'>Potassium (K) = 69 kg/ha</div>
                    <div className='w-[16rem] mb-2'>Organic Carbon (OC) = 0.40 %</div>
                    <div className='w-[16rem] mb-2'>pH = 6.39</div>
                    <div className='w-[16rem] mb-2'>Soil type = Black soil</div>
                    <div className='w-[16rem] mb-2'>Farm size = 1.19 Acre</div>
                </div>
            </div>
            <div className='border-2 border-green-700 rounded-2xl p-4'>
                <div className='text-2xl font-bold mb-4 flex items-center'><div className='mr-4'>Adityapur, Jharkhand</div> <button className='flex items-center font-normal px-3 py-2 border-2 border-green-700 rounded-3xl text-base'><FontAwesomeIcon className='text-red-500 pr-2 w-5 h-5' icon={faLocation} /><div>Fetch location</div></button></div>
                <div className='flex flex-wrap'>
                    <div className='w-[16rem] mb-2'>Temperature = 29°C</div>
                    <div className='w-[16rem] mb-2'>Annual rainfall = 1,132.9 mm</div>
                </div>
            </div>
            <div className='flex justify-center my-8'>
                <button className='bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 text-white px-6 py-4 text-3xl font-semibold rounded-3xl'>Analyse<FontAwesomeIcon className='pl-4' icon={faSearch} /></button>
            </div>
            <div className='bg-gradient-to-br from-red-400 via-pink-400 to-pink-200 rounded-2xl p-1 flex justify-center items-center'>
                <div className='flex-grow bg-white p-3 rounded-2xl'>
                    
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Fertilizer Recommendations</h2>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Nitrogen (N)</h3>
                                <p className="text-gray-600">Your nitrogen level is relatively high (305 kg/ha). This suggests that you do not need additional nitrogen-based fertilizers.</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Phosphorus (P)</h3>
                                <p className="text-gray-600">The phosphorus level is moderately adequate (36 kg/ha). Consider applying a phosphorus-rich fertilizer like <strong>Single Super Phosphate (SSP)</strong> to maintain levels.</p>
                                <p className="text-gray-600"><strong>Recommended Quantity:</strong> 50-75 kg/ha.</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Potassium (K)</h3>
                                <p className="text-gray-600">The potassium level is moderate (69 kg/ha). Use a potassium-rich fertilizer like <strong>Muriate of Potash (MOP)</strong> if needed, especially if growing crops with high potassium requirements.</p>
                                <p className="text-gray-600"><strong>Recommended Quantity:</strong> 30-40 kg/ha.</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Organic Carbon (OC)</h3>
                                <p className="text-gray-600">Organic carbon is low (0.40%). Consider incorporating organic matter such as <strong>farmyard manure (FYM)</strong> or compost to improve soil health.</p>
                                <p className="text-gray-600"><strong>Recommended Quantity:</strong> 5-6 tons/ha.</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Fertilizer Summary:</h3>
                            <ul className="list-disc list-inside text-gray-600">
                                <li><strong>SSP:</strong> 50-75 kg/ha</li>
                                <li><strong>MOP:</strong> 30-40 kg/ha</li>
                                <li><strong>FYM or Compost:</strong> 5-6 tons/ha</li>
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Crop Recommendations for Black Soil</h2>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Cotton</h3>
                                <p className="text-gray-600">Black soil is ideal for cotton due to its moisture-retaining properties and depth. Cotton requires a warm climate and moderate rainfall, making it a suitable choice.</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Soybean</h3>
                                <p className="text-gray-600">This crop thrives in black soil with good moisture retention and can be grown as a rotation crop with cotton.</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">Sorghum (Jowar)</h3>
                                <p className="text-gray-600">Suitable for black soil, especially in regions with moderate rainfall. It’s drought-tolerant and requires minimal inputs.</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Additional Tips:</h3>
                            <p className="text-gray-600">Regularly monitor soil pH, as slightly acidic conditions (pH 6.39) are generally good, but avoid drastic pH changes.</p>
                            <p className="text-gray-600">Ensure balanced watering, especially during dry spells, as black soil can crack in extreme dry conditions.</p>
                        </div>
                    

                </div>
            </div>
        </div>
    )
}

export default FertilizerCalculator
