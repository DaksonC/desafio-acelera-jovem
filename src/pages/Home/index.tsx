import { SearchIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Input, Stack, Text, Image } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { IWeather } from '../../services/interfaces';

export default function Home() {
  const [ city, setCity] = useState<string>('');
  const [ weatherForecast, setWeatherForecast] = useState<IWeather>( );

  async function handleSearchCitys() {
    const response = await fetch(` http://api.weatherapi.com/v1/current.json?key=95d050496d8449caaa2134744221609&q=${city}&lang=pt`)
    .then(( response ) => {
      if ( response.status === 200 ) {
        return response.json();
      }
    })
    .then(( data ) => {
      setWeatherForecast(data);
    })
  }
 
  function handleClick(e: React.FormEvent<HTMLButtonElement>){
    e.preventDefault();
    handleSearchCitys();
    console.log(city);
  }
    
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    setCity(e.target.value);
  }

  return (
    <Stack
      w='100vw'
      h='100vh'
      align='center'
      p={['8', '12']}
      bg='gray.900'
    >
      <Text 
        fontSize={["xl", "3xl", "6xl"]} 
        fontWeight='bold'
      >
        Previsão do tempo 🌂
        {/* ☔☂️☀️🌤️⛅☁️🌦️🌧️ */}
      </Text>
      <Flex display='flex' p={['2', '4']} as='form'>
        <Input
          w={["70vw", "60vw", "50vw"]}
          color='white'
          fontSize={["xl",  "2xl"]}
          focusBorderColor='blue.500'
          errorBorderColor='crimson'
          placeholder='Sua cidade é...'
          _placeholder={{ opacity: 0.9, fontSize:{ 'xs': 'sm', 'sm': 'md' } }}
          mx='2'
          onChange={handleChange}
          value={city}
        />
        <IconButton
          colorScheme='blue'
          aria-label='Search database'
          icon={<SearchIcon />}
          onClick={handleClick}
          type='submit'
        />
      </Flex>
        { weatherForecast ? (
          <Box
            p={['2', '4']}
          >
            <Text fontSize={["xl", "2xl", "5xl"]} fontWeight='bold' color='white'>
              {weatherForecast.location.name}, {weatherForecast.location.region}
            </Text>
            <Box 
              display='flex' 
              flexDirection='row'
              justifyContent='center'
            >
              <Image src={weatherForecast.current.condition.icon} />
              <Text fontSize={["xl", "2xl", "4xl"]} fontWeight='bold' color='white'>
                {weatherForecast.current.temp_c}°C
              </Text>
            </Box>
              <Text 
                fontSize={["xl", "2xl", "4xl"]} 
                fontWeight='bold' color='gray.600' 
                align='center'
              >
                Ventos {weatherForecast.current.wind_kph} km/h
              </Text>
          </Box>
          
        ) : null}
    </Stack>
  )
}