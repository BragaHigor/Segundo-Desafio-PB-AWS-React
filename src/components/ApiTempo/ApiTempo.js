//CSS
import styles from '../ApiTempo/ApiTempo.module.css'

//hook
import { useState, useEffect } from 'react'

//image
import iconTemperature from '../../assets/img/icon-temperatura.svg'

const ApiTempo = () => {

    //KEY API
    const apiKey = '52244db5a4014378a38153132232001'

    //Dados LocalStorage
    const userCity = localStorage.getItem('city_API')
    const city = JSON.parse(userCity)
    
    const userCountry = localStorage.getItem('country_API')
    const country = JSON.parse(userCountry)
   

    //PARAMETROS API
    const [weatherForecast, setWeatherForecast] = useState(null)

    //STATE DE ERROR
    const [error, setError] = useState('');

    //API
    const getWeatherData = () => {

        fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=pt`)

            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else if (res.status === 404) {
                    return setError('Location not found!');
                }
            })
            .then((data) => {
                setWeatherForecast(data)
            })
    }

    useEffect(() => {
        getWeatherData()
    },[userCity, userCountry])

    return (

        <div className={styles.container}>
            <span className={styles.cityCountry}>
                {city} - {country}
            </span>

            {weatherForecast ? (
                <div className={styles.imgTemperatura}>
                    <div className={styles.img}>
                        <img src={iconTemperature} />
                    </div>
                    <div>
                        <p className={styles.temperatura}>{parseInt(weatherForecast.current.temp_c)}°</p>
                        <label className={styles.labelError}>{error}</label>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default ApiTempo