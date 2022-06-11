import React from "react";
import {Stack, Text, Box, SimpleGrid} from "@chakra-ui/core";

import FieldsForm from "../../forms/FieldsForm";

import CheckoutButton from "./CheckoutButton";

import {DrawerTitle, DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Field} from "~/tenant/types";
import {usePrice} from "~/i18n/hooks";
import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import CrossIcon from "~/ui/icons/Cross";

//import QrCode from "~/ui/feedback/QrCode2"; //added

//import {getMessage} from "../../selectors"; // added
import {CartItem} from "../../types";
import {getCount, getTotal} from "~/cart/selectors";


interface Props {
  fields: Field[];
  items: CartItem[];
  onSubmit: (fields: Field[]) => void;
  onClose: VoidFunction;
  onPrevious: VoidFunction;
}

const Fields: React.FC<Props> = ({fields, items, onSubmit, onClose, onPrevious}) => {
  const [isLoading, toggleLoading] = React.useState(false);

  const p = usePrice();
  const total = getTotal(items);  
  const count = getCount(items);

  function handleSubmit(event: React.MouseEvent, submit: () => Promise<void>) {
    event.stopPropagation();

    toggleLoading(true);

    submit().finally(() => toggleLoading(false));
  }

  return (
    <FieldsForm defaultValues={fields} onSubmit={onSubmit}>
      {({form, submit}) => (
        <>
          <DrawerBody overflowY="auto">
            <ArrowLeftIcon
              background="white"
              boxShadow="md"
              cursor="pointer"
              left={0}
              marginTop={4}
              paddingX={4}
              paddingY={3}
              position="absolute"
              roundedRight="lg"
              top={0}
              onClick={onPrevious}
            />
            <CrossIcon
              background="white"
              boxShadow="md"
              cursor="pointer"
              marginTop={4}
              paddingX={4}
              paddingY={3}
              position="absolute"
              right={0}
              roundedLeft="lg"
              top={0}
              onClick={onClose}
            />
            <Stack marginTop={20} spacing={6}>
              <DrawerTitle>Listo!<br/>Completa tu Pedido<br/>Y Envíalo por WhatsApp 🚀</DrawerTitle>
              {form}
              <SimpleGrid columns={2} marginTop={6}>
                <Box>
                  <Text fontWeight={900}>Subotal</Text>
                  <Text>{p(total)} ({count} Items) </Text>
                </Box>
                <Box>
                  <Text fontWeight={900}>Envío</Text>
                  <Text>Pago en Destino</Text>
                </Box>
              </SimpleGrid>
              <Box>
                <Text fontWeight={900}>Bonificaciones y Descuentos</Text>
                <Text>[...] Consultar en el siguiente paso</Text>
              </Box>
              <Box>
                <Text>Desde la primera compra nuestros clientes reciben nuestro agradecimiento mediante bonificaciones y descuentos de acuerdo a su antigüedad con nosotros y estos beneficios crecen :)</Text>
              </Box>
              <Box>
                <Text>Dale click 👇 y coordinemos tu pedido 🤜🤛</Text>
              </Box> 
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Stack spacing={4} width="100%">
              <CheckoutButton
                isLoading={isLoading}
                onClick={(event) => handleSubmit(event, submit)}
              />
            </Stack>
          </DrawerFooter>
        </>
      )}
    </FieldsForm>
  );
};

export default Fields;
