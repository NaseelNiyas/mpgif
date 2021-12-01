import { Flex, Text, useColorMode, Button, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue
    ('gray.200', 'gray.700')


  return (
    <>
      {/* @ts-ignore */}
      <Flex justifyContent='center' alignItems='center' background={color} w='fit-content' px='10px' rounded='lg' mx='35vw'>
        <Text fontSize='3xl'>MPGif - A tool by Naseel Niyas </Text>
        <Button onClick={toggleColorMode} ml='10px'>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex ></>
  )
}

export default Footer
