import React, { useEffect } from 'react';

const FertilizerCalculator = () => {
    //https://open-meteo.com/en/docs#hourly=temperature_2m,relative_humidity_2m,soil_temperature_0cm,soil_moisture_0_to_1cm,direct_normal_irradiance

    useEffect(() => {
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,soil_temperature_0cm,soil_moisture_0_to_1cm,direct_normal_irradiance';
        const options = {
            method: 'GET',
            headers: {
                
            }
        };
        const call = async () => {
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
        call();
        
    }, []);

    return (
        <div>

        </div>
    )
}

export default FertilizerCalculator
