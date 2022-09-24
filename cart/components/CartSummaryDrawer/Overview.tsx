import React from "react";
import {Stack, Flex, Text, useDisclosure, 
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogOverlay} from "@chakra-ui/core";

import {CartItem} from "../../types";

import CheckoutButton from "./CheckoutButton";

import {DrawerTitle, DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import Button from "~/ui/controls/Button";
import {useTranslation, usePrice} from "~/i18n/hooks";
import {getCount, getTotal, getFormattedPrice} from "~/cart/selectors";

import {formatPrice} from "~/i18n/selectors";
import Stepper from "~/ui/inputs/Stepper";
import {getVariantsString} from "~/product/selectors";
import CrossIcon from "~/ui/icons/Cross";
import TrashIcon from "~/ui/icons/Trash";

//added
import {Product} from "~/product/types";
import Image from "~/ui/feedback/Image";

interface Props {
  products: Product[];  //added
  items: CartItem[];
  onDecrease: (id: CartItem["id"]) => void;
  onIncrease: (id: CartItem["id"]) => void;
  onSubmit: () => Promise<void>;
  onClose: VoidFunction;
  hasNextStep: boolean;
  onRemoveAll: () => Promise<void>;
}

const Overview: React.FC<Props> = ({
  items,
  onIncrease,
  onDecrease,
  onSubmit,
  onClose,
  hasNextStep,
  products, //added
  onRemoveAll, //added
}) => {
  const [isLoading, toggleLoading] = React.useState(false);
  const t = useTranslation();
  const p = usePrice();
  const count = getCount(items);
  const total = getTotal(items);  
  //const {image, title, price, originalPrice, description, type} = product; //added
  const { isOpen, onOpen, onClose: onCloseReportModal } = useDisclosure()
  const cancelRef = React.useRef();

  function formattedImg(image) {
    const position = image.indexOf('/upload/') + 8;
    const format = "w_90,f_auto,q_auto/";
    return [image.slice(0,position),format,image.slice(position)].join('');
  }
  
  function handleSubmit() {
    toggleLoading(true);

    onSubmit().finally(() => toggleLoading(false));
  }

  function handleNext() {
    onSubmit();
  }

  function handleDecrease(id: CartItem["id"]) {
    onDecrease(id);
  }

  function handleIncrease(id: CartItem["id"]) {
    onIncrease(id);
  }
  function handleOnOpenDialog() {
    onOpen()
  }

  function handleOnRemoveAll() {
    onRemoveAll();
    onCloseReportModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <DrawerBody>
        <CrossIcon
          background="white"
          boxShadow="md"
          cursor="pointer"
          marginTop={4}
          paddingX={4}
          paddingY={3}
          pos="fixed"
          right={0}
          roundedLeft="lg"
          top={0}
          onClick={onClose}
        />
        <Stack marginTop={10} spacing={6}>
          <DrawerTitle>
            {t("cart.yourOrder")} ({count})
          </DrawerTitle>
          <Stack shouldWrapChildren spacing={6}>
            {items.map((item) => (
              <Flex key={item.id} alignItems="flex-start" justifyContent="space-between">
                {(
                  <Flex alignItems="center">
                    <Image
                      fadeIn
                      height={{base: 24, sm: 24}}
                      rounded="md"
                      src={formattedImg(products.find((_product) => _product.id === item.product.id).image) || "/assets/fallback.jpg"}
                      width={{base: 24, sm: 24}}
                    />
                  </Flex>
                )}
                <Flex alignItems="center" mr={2} ml={2}  width={"100%"}>
                  <Stack spacing={0}>
                    <Text fontWeight={500} overflowWrap="break-word" fontSize="sm">
                      {item.product.title}
                    </Text>
                    {item.variants && (
                      <Text color="gray.600">{getVariantsString(item.variants)}</Text>
                    )}
                    {item.note && <Text color="gray.600">({item.note})</Text>}
                    <Stepper
                      marginTop={2}
                      value={item.count}
                      onDecrease={() => handleDecrease(item.id)}
                      onIncrease={() => handleIncrease(item.id)}
                    />
                  </Stack>
                </Flex>
                <Flex alignItems="center">
                  <Text fontWeight={500}>{getFormattedPrice(item)}</Text>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Stack>
      </DrawerBody>
      <DrawerFooter borderTopColor="gray.100" borderTopWidth={1} marginTop={2}>
        <Stack spacing={4} width="100%">
          <Flex alignItems="center" fontSize="lg" fontWeight={500} justifyContent="space-between" marginBottom="0">
            <Text>{t("cart.estimatedTotal")}</Text>
            <Text>{p(total)}</Text>
          </Flex>
          {(total < 500 &&
              <Flex alignItems="center" fontSize="sm" fontWeight={500} justifyContent="space-between" backgroundColor="#ffe164">
                <Text textAlign="center" m="auto">Tip: Invierte {formatPrice(500 - total)} más y obtén 2% Dcto.</Text>
              </Flex>)
          || (total < 1500 &&
              <Flex alignItems="center" fontSize="sm" fontWeight={500} justifyContent="space-between" backgroundColor="#ff9852">
                <Text textAlign="center" m="auto">¡Felicitaciones ya tienes 2% de Dcto. 🤝!<br/>2do Tip: Invierte {formatPrice(1500 - total)} más y obtén 3% Dcto.</Text>
              </Flex>)
          || (total < 3200 &&
              <Flex alignItems="center" fontSize="sm" fontWeight={500} justifyContent="space-between" backgroundColor="#ff9852">
                <Text textAlign="center" m="auto">¡Genial ya tienes 3% de Dcto. 💪!<br/>3er Tip: Invierte {formatPrice(3200 - total)} más y obtén 4% Dcto.</Text>
              </Flex>)
          || (total < 6000 &&
              <Flex alignItems="center" fontSize="sm" fontWeight={500} justifyContent="space-between" backgroundColor="#ff9852">
                <Text textAlign="center" m="auto">¡Vamos ya tienes 4% de Dcto. 🙌!<br/>4to Tip: Invierte {formatPrice(6000 - total)} más y obtén 5% Dcto.</Text>
              </Flex>)
          ||
              <Flex alignItems="center" fontSize="sm" fontWeight={500} justifyContent="space-between" backgroundColor="#ff9852">
                <Text textAlign="center" m="auto">Tienes 5% de Dcto. 🎁!<br/>¡Felicitaciones! ya tienes el mejor descuento posible</Text>
              </Flex>
          }
          {hasNextStep ? (
            <>
              <Button boxShadow="lg" size="lg" variantColor="primary" onClick={handleNext}>
                ➡ {t("common.next")} ➡
              </Button>
              <Button size='xs' marginTop={2} onClick={handleOnOpenDialog} fontSize="sm" color="gray.500"  backgroundColor="#fff">
                <TrashIcon
                  color="gray.500"
                  cursor="pointer"
                  marginRight={1}
                />
                Vaciar "Mi pedido ({count})"
              </Button>
          </>
          ) : (
            <CheckoutButton isLoading={isLoading} onClick={handleSubmit} />
          )}
        </Stack>
      </DrawerFooter>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        isCentered
        onClose={onCloseReportModal}
      >
        <AlertDialogOverlay zIndex={8000}/>

        <AlertDialogContent zIndex={8001}>
          <AlertDialogHeader>Vaciar "Mi pedido ({count})"?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Deseas quitar todos los productos?<br/>{count} productos serán eliminados
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onCloseReportModal}>
              Cancelar
            </Button>
            <Button background='#E53E3E' _hover={{ bg: '#E53E3E' }} color='white' onClick={handleOnRemoveAll} ml={3}>
              Vaciar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Overview;
