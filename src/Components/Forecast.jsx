import {useState} from 'react';
import {BiSearchAlt} from 'react-icons/bi'

const Forecast = () => {
    const apiKey= "02681645dfc191507b77651b2c13ac51"
    const [city, setCity] = useState("TEHRAN");
    const [data, setData] = useState({
        name: "...",
        main: {
            humidity: "...",
            temp: "...",
        },
        sys: {
            country: "...",
        },
        weather: {
            0: {
                description: "...",
                icon: "04d"
            }
        },
        wind: {
            speed: "..."
        }

    });
    const [icon, setIcon] = useState("04d")
    const imageSRC = `https://openweathermap.org/img/wn/${icon}@2x.png`

    function handleTextChange(e) {
        let upperCaseCity = e.target.value.toUpperCase()
        setCity(upperCaseCity);
    };

    function fetchData() {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(res => res.json())
        .then(info => {setData(info); setIcon(info.weather[0].icon);});

    };


  return (
    <section className='flex justify-center items-center h-screen w-screen'>
        <div className='flex flex-col h-[600px] w-[600px] bg-gray-300 my-auto rounded-[70px]'>
            <div className='flex w-[80%] h-[50px] mt-10 mx-auto justify-between items-center'>
                <input type="text" onChange={handleTextChange} placeholder='Search the city...' className='text-[20px] p-3 rounded-xl w-[70%]' />
                <div className='w-[60px] h-[60px] bg-gray-700 p-2 rounded-full text-white hover:bg-gray-300 hover:text-black'>
                    <BiSearchAlt className='text-[45px] flex' onClick={fetchData} />
                </div>
            </div>

            <div className='flex flex-row w-[85%] h-[75%] p-3 mx-auto mt-10 relative'>
                <div className='w-[100%] h-[100%] flex flex-col'>
                    <h1 className='text-3xl'>WEATHER IN <span className='text-cyan-800'>{data.name.toUpperCase()},{data.sys.country}</span></h1>
                    <h1 className='text-3xl mt-8 underline'>{data.main.temp}°C</h1>
                    <h1 className='text-xl mt-10 flex flex-row'>{data.weather[0].description}</h1>
                    <h1 className='text-xl'>Humidity: {data.main.humidity}%</h1>
                    <h1 className='text-xl'>Wind speed: {data.wind.speed}KM/H</h1>
                </div>


                <div className='flex h-[250px] w-[250px] flex-col absolute bottom-10 right-10'>
                    <img src={imageSRC} className="h-[250px] w-[250px] " alt="icon"/>
                    
                </div>
            </div>
        </div>


    </section>
  )
}

export default Forecast