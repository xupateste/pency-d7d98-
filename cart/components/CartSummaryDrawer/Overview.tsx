import React from "react";
import {Stack, Flex, Text} from "@chakra-ui/core";

import {CartItem} from "../../types";

import CheckoutButton from "./CheckoutButton";

import {DrawerTitle, DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import Button from "~/ui/controls/Button";
import {useTranslation, usePrice} from "~/i18n/hooks";
import {getCount, getTotal, getFormattedPrice} from "~/cart/selectors";
import Stepper from "~/ui/inputs/Stepper";
import {getVariantsString} from "~/product/selectors";
import CrossIcon from "~/ui/icons/Cross";

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
}

const Overview: React.FC<Props> = ({
  items,
  onIncrease,
  onDecrease,
  onSubmit,
  onClose,
  hasNextStep,
  products, //added
}) => {
  const [isLoading, toggleLoading] = React.useState(false);
  const t = useTranslation();
  const p = usePrice();
  const count = getCount(items);
  const total = getTotal(items);  
  //const {image, title, price, originalPrice, description, type} = product; //added

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
        <Stack marginTop={20} spacing={6}>
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
                      src={products.find((_product) => _product.id === item.product.id).image || "/assets/fallback.jpg"}
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
          <Flex alignItems="center" fontSize="lg" fontWeight={500} justifyContent="space-between">
            <Text>{t("cart.estimatedTotal")}</Text>
            <Text>{p(total)}</Text>
          </Flex>
          {hasNextStep ? (
            <Button boxShadow="lg" size="lg" variantColor="primary" onClick={handleNext}>
              ➡ {t("common.next")} ➡
            </Button>
          ) : (
            <CheckoutButton isLoading={isLoading} onClick={handleSubmit} />
          )}
        </Stack>
      </DrawerFooter>
    </>
  );
};

export default Overview;
