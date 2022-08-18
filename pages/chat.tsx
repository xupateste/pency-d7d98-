import {useState} from 'react';
import QrCode from "~/ui/feedback/QrCode2";
import {
  Box,
  Text,
  Input,
  Stack
} from "@chakra-ui/core";


const chat = ({}) => {
  
  const [message, setMessage] = useState('');

  function formatWP(code) {
    return 'https://wa.me/51930240108?text=Hola🤐 me acaban de registrar con código: '+code+'.';
  }

  const handleChange = event => {
    setMessage(event.target.value.toUpperCase());
  };

  return (
    <Box
      p={4}
      display={{ md: "flex" }}
      maxWidth="30rem"
      borderWidth={1}
      margin={2}
    >
      <Stack
        align={{ base: "center", md: "stretch" }}
        textAlign={{ base: "center", md: "center" }}
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
      >
        <Text
          fontWeight="bold"
          textTransform="uppercase"
          fontSize="lg"
          letterSpacing="wide"
          color="teal.600"
        >
          Lizeth Tellez
        </Text>
        <Text
          my={1}
          display="block"
          fontSize="md"
          lineHeight="normal"
          fontWeight="semibold"
        >
          Administradora
        </Text>
        <QrCode text={formatWP(message)}></QrCode>
        <Input size="lg" placeholder='Código' onChange={handleChange} value={message} type="text" maxLength={4}/>
      </Stack>
    </Box>
  );
};

export default chat;

