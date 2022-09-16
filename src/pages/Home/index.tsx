import { 
  Box, 
  Flex, 
  IconButton, 
  Input, 
  Stack, 
  Text, 
  Image, 
  Button,
  Icon,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { BsWind } from 'react-icons/bs'
import { useState } from 'react';
import { api } from '../../services/api';
import { IWeather } from '../../services/interfaces';

export default function Home() {
  const [ city, setCity] = useState<string>('');
  const [ weatherForecast, setWeatherForecast] = useState<IWeather>( );
  const [ weekForecast, setWeekForecast] = useState<IWeather>( );

  const key = import.meta.env.VITE_SOME_KEY;

  async function handleSearchCitys() {
    await api.get(`current.json?key=${key}&q=${city}&lang=pt`)
    .then(( response ) => {
      if ( response.status === 200 ) {
        return response.data;
      }
    })
    .then(( data ) => {
      setWeatherForecast(data);
    })
  }

  async function handleSearchCitysWeek() {
    await api.get(`forecast.json?key=${key}&q=${city}&lang=pt&days=7`)
    .then(( response ) => {
      if ( response.status === 200 ) {
        return response.data;
      }
    })
    .then(( data ) => {
      setWeekForecast(data);
    })
  }
 
  function handleClick(e: React.FormEvent<HTMLButtonElement>){
    e.preventDefault();
    handleSearchCitys();
  }
    
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    setCity(e.target.value);
  }

  function handleClickWeek(e: React.FormEvent<HTMLButtonElement>){
    e.preventDefault();
    handleSearchCitysWeek();
  }
    
  return (
    <Stack
      w='100vw'
      h={['120vh', '']}
      align='center'
      p={['8', '12']}
      bg='gray.900'
    >
      <Text 
        fontSize={["xl", "3xl", "6xl"]} 
        fontWeight='bold'
        color='gray.50'
      >
        _Previsão do tempo 🌂
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
            <Text 
              fontSize={["xl", "2xl", "5xl"]} 
              fontWeight='bold' 
              color='white'
              mb={['4', '8']}
            >
              {weatherForecast.location.name}, {weatherForecast.location.region}
            </Text>
            <Text
              fontSize={["xl", "2xl", "4xl"]}
              fontWeight='bold'
              color='red.500'
              align='center'
            >
              Hoje
            </Text>
            <Box 
              display='flex' 
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
            >
              <Image src={weatherForecast.current.condition.icon} />
              <Text 
                fontSize={["xl", "2xl", "4xl"]}
                color='white' 
                ml='4'
                >
                {weatherForecast.current.temp_c}°C 
              </Text>
              <Text
                fontSize={["sm", "md", "2md"]} 
                color='white'
                ml='4'
              >{weatherForecast.current.condition.text}</Text>
            </Box>
            <Text 
              fontSize={["xl", "2xl", "4xl"]} 
              color='gray.500'
              align='center'
            >
              Umidade {weatherForecast.current.humidity}%
            </Text>
            <Text 
              fontSize={["xl", "2xl", "4xl"]} 
              color='gray.600' 
              align='center'
              display='flex'
            >
              Ventos {weatherForecast.current.wind_kph} km/h
              <Text>
                <Icon  as={BsWind} m='4' color='gray.100' w='8' h='8'/> 
              </Text>
            </Text>
              <Flex>
                <Button
                  colorScheme='blue'
                  size={['sm', 'md']}
                  mt='6'
                  type='submit'
                  onClick={handleClickWeek}
                >
                  Próximos dias
                </Button>
              </Flex>
              <Box p='6'>
                {weekForecast ? (
                  <Box
                    textAlign='center'
                    p='4'
                    bg='gray.800'
                    borderRadius='md'
                    mt='4'
                  >
                    <Flex direction={['column', 'row']}>
                      {weekForecast.forecast.forecastday.map((day, index) => {
                        return (
                          <Box 
                            key={index}
                            flexDirection='row'
                            justifyContent='center'
                            alignItems='center'
                            bg='gray.700'
                            borderRadius='md'
                            p='4'
                            m='4'
                          >
                            <Text
                              fontSize={["xl", "2xl", "4xl"]}
                              color='white'
                              mr='4'
                            >
                              {day.date}
                            </Text>
                          </Box>
                        )
                      })}
                    </Flex>
                  </Box>
                ) : null}
              </Box>
          </Box>
      ) : null}
    </Stack>
  )
}