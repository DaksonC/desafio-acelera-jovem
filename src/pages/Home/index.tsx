import { SearchIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Input, Stack, Text } from '@chakra-ui/react'

export default function Home() {
  return (
    <Stack
      w='100vw'
      h='100vh'
      align='center'
      p={['8', '12']}
      bg='black'
    >
      <Text 
        fontSize={["xl", "3xl", "6xl"]} 
        fontWeight='bold'
      >
        Previsão do tempo para sua cidade
      </Text>
      <Flex display='flex' p={['2', '4']}
      >
        <Input
          w={["70vw", "60vw", "50vw"]}
          focusBorderColor='blue.500'
          errorBorderColor='crimson'
          placeholder='Sua cidade é...'
          _placeholder={{ opacity: 0.9, fontSize:{ 'xs': 'sm', 'sm': 'md' } }}
          mx='2'
        />
        <IconButton
          colorScheme='blue'
          aria-label='Search database'
          icon={<SearchIcon />}
        />
      </Flex>
    </Stack>
  )
}