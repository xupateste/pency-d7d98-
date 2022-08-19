import {useState} from 'react';
import Image from "~/ui/feedback/Image";
import QrCode from "~/ui/feedback/QrCode2";
import {
  Box,
  Text,
  Input,
  Stack,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/core";


const chat = ({}) => {
  
  const [message, setMessage] = useState('');

  function formatWP(code) {
    return 'https://wa.me/51930240108?text=Buen día🤩%0D%0AConfirmo mi registro ('+code+').';
  }

  const handleChange = event => {
    (""+event.target.value).length > 4 ? "" : setMessage(event.target.value.toUpperCase());
  };

  return (
    <Box
      p={4}
      borderWidth={2}
      margin={3}
      alignItems='center'
    > 
      <Stack
        align="stretch"
        textAlign="center"
        mt={{ base: 4, md: 0 }}
        ml={{ md: 6 }}
        alignItems='center'
      >
        <Box color='white' alignItems='center'>
          <Image
            height={150}
            width={150}
            src={"https://res.cloudinary.com/pency-d7d98/image/upload/v1654905088/CLOUDINARY_PRESET_LOW/a1kmqmcf3fdbebh2qlqo.png"}
          />
        </Box>
        <Stack mt={-6}>
          <Text as="h1" color="black" fontSize="4xl" fontWeight="bold" lineHeight="90%">
            {"Lizeth Tellez"}
          </Text>
          <Text color="gray.700" fontSize="lg" fontWeight="bold" lineHeight="80%" zIndex={2}>
            {"ADMINISTRACION"}
          </Text>

          <Text color="gray.700" fontSize="lg" fontWeight="bold" lineHeight="80%" zIndex={2}>
            {"ADMINISTRACION"}
          </Text>
          <QrCode mt={-5} text={formatWP(message)}></QrCode>
          <InputGroup zIndex={3} mt={-5} >
            <InputLeftAddon fontSize="4xl" children='#ID' />
            <Input fontSize="4xl" placeholder='D16G' onChange={handleChange} value={message} type="text" maxLength={5} maxWidth={200}/>
          </InputGroup>
        </Stack>
      </Stack>
    </Box>
  );
};

export default chat;

