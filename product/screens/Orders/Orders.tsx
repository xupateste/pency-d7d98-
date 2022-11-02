import React from "react";
import {Box, Flex, Modal, 
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure} from "@chakra-ui/core";

import {useOrders} from "~/product/hooks";

import Content from "~/ui/structure/Content";

const OrdersScreen: React.FC = () => {
  const orders = useOrders();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [message, setMessage] = React.useState()

  return (
    <>
      <Flex direction="column" height="100%" marginTop={4}>
        <Box flex={1}>
          <Content padding={4}>
            <Box as="table" borderTopWidth={1} width="100%">
              <Box as="tbody">
                {orders.map((order) => (
                  <Box as="tr" key={order.id} onClick={() => {onOpen();setMessage(order.message)}}>
                    <Box as="td">
                      ORDER_ID: {order.orderId}
                    </Box>
                    <Box as="td">
                      CLIENT_ID: {order.fields ? order.fields[0].value : ''}
                    </Box>
                    <Box as="td">
                      ITEMS {order.items.length}
                    </Box>
                    <Box as="td">
                      VER DETALLE
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Content>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {String(message).split("%0A").map((line, index)=>{
              return <Box key={index}>{decodeURIComponent(line)}</Box>
            })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OrdersScreen;
