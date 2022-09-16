import { Box, Flex, Text } from "@chakra-ui/react";

export default function Details() {
  return (
    <Flex
      w='100vw'
      h='100vh'
      align='center'
      justify='center'
    >
      <Box
        w='100%'
        h='100%'
        bg='gray.100'
      >
        <Text
          fontSize={['2xl', '4xl']}
          fontWeight='bold'
        >
          Details
        </Text>
      </Box>
    </Flex>
  )
}