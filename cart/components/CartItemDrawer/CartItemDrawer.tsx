import React from "react";
import {IDrawer, Text, Stack, Flex} from "@chakra-ui/core";

import SummaryButton from "../SummaryButton";

import Drawer, {DrawerBody, DrawerFooter} from "~/ui/controls/Drawer";
import {Product, Variant} from "~/product/types";
import ProductVariantForm from "~/product/forms/ProductVariantForm";
import ArrowLeftIcon from "~/ui/icons/ArrowLeft";
import Stepper from "~/ui/inputs/Stepper";
import FormLabel from "~/ui/form/FormLabel";
import TruncatedText from "~/ui/feedback/ToggleableText";
import ToggleableImage from "~/ui/feedback/ToggleableImage";
import {useTranslation} from "~/i18n/hooks";
import {useToast} from "~/hooks/toast";
import ShareIcon from "~/ui/icons/Share";
import {useAnalytics} from "~/analytics/hooks";
import Textarea from "~/ui/inputs/Textarea";
import FormControl from "~/ui/form/FormControl";
import {useTenant} from "~/tenant/hooks";
import Button from "~/ui/controls/Button";

interface Props extends Omit<IDrawer, "children"> {
  onSubmit: (product: Product, options: Variant[], count: number, note: string) => void;
  product: Product;
}

const CartItemDrawer: React.FC<Props> = ({onClose, product, onSubmit, ...props}) => {
  const [count, setCount] = React.useState(1);
  const [note, setNote] = React.useState("");
  const t = useTranslation();
  const log = useAnalytics();
  const toast = useToast();
  const {flags} = useTenant();
  const canShare = {
    prompt: Boolean(navigator?.share),
    clipboard: Boolean(navigator?.clipboard),
  };

  function handleSubmit(options: Variant[]) {
    onSubmit(product, options, count, note);
  }

  function handleShare() {
    if (canShare.prompt) {
      navigator
        .share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
        .then(() => {
          toast({
            status: t("cartItemDrawer.share.prompt.status"),
            title: t("cartItemDrawer.share.prompt.title"),
            description: t("cartItemDrawer.share.prompt.description"),
          });

          log.share(product, "mobile");
        })
        .catch(() => {
          console.info("El dialogo de share fue cerrado");
        });
    } else if (canShare.clipboard) {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toast({
            status: t("cartItemDrawer.share.clipboard.status"),
            title: t("cartItemDrawer.share.clipboard.title"),
            description: t("cartItemDrawer.share.clipboard.description"),
          });

          log.share(product, "desktop");
        })
        .catch(() => {
          toast({
            status: t("cartItemDrawer.share.clipboard.error.status"),
            title: t("cartItemDrawer.share.clipboard.error.title"),
            description: t("cartItemDrawer.share.clipboard.error.description"),
          });
        });
    }
  }

  function handleNoteChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNote(event.target.value);
  }

  React.useLayoutEffect(() => {
    if (product) {
      log.viewProduct(product);
    }
  }, [product, log]);

  // If we get here by any point, return null
  if (product.type === "hidden") return null;

  return (
    <Drawer id="cart-item" placement="right" size="md" onClose={onClose} {...props}>
      <ProductVariantForm
        defaultValues={product.options}
        type={product.type}
        onSubmit={handleSubmit}
      >
        {({form, submit, isLoading, watch}) => {
          const variants = Object.values(watch());
          const items = [
            {
              id: "temp",
              note: "",
              product,
              variants,
              count,
            },
          ];

          return (
            <>
              <DrawerBody paddingX={0}>
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
                  onClick={onClose}
                />
                {(canShare.clipboard || canShare.prompt) && (
                  <ShareIcon
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
                    onClick={handleShare}
                  />
                )}
                {product.image && <ToggleableImage maxHeight="30vh" src={product.image} />}
                <Stack
                  shouldWrapChildren
                  direction="column"
                  flex={1}
                  marginTop={product.image ? 0 : 16}
                  paddingTop={4}
                  paddingX={{base: 4, sm: 12}}
                  spacing={6}
                >
                  <Stack spacing={2}>
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      lineHeight="normal"
                      overflowWrap="break-word"
                    >
                      {product.title}
                    </Text>
                    {product.description && (
                      <TruncatedText
                        color="gray.500"
                        fontSize="md"
                        limit={280}
                        whiteSpace="pre-line"
                      >
                        {product.description}
                      </TruncatedText>
                    )}
                  </Stack>
                  {product.options?.length ? form : null}
                  <Flex alignItems="center" justifyContent="space-between">
                    <FormLabel padding={0}>{t("common.count")}</FormLabel>
                    <Stepper min={1} value={count} onChange={setCount} />
                  </Flex>
                  {flags.includes("note") && (
                    <FormControl
                      help={t("cartItemDrawer.comments.placeholder")}
                      label={t("cartItemDrawer.comments.label")}
                    >
                      <Textarea
                        max={140}
                        placeholder={t("cartItemDrawer.comments.placeholder")}
                        value={note}
                        onChange={handleNoteChange}
                      />
                    </FormControl>
                  )}
                </Stack>
              </DrawerBody>
              <DrawerFooter>
                {["unavailable", "available", "promotional", "variant"].includes(product.type) && (
                  <SummaryButton
                    isDisabled={product.type === "unavailable"}
                    isLoading={isLoading}
                    items={items}
                    onClick={(event) => {
                      event.stopPropagation();

                      submit();
                    }}
                  >
                    {t("common.add")}
                  </SummaryButton>
                )}
                {product.type === "ask" && (
                  <Button
                    boxShadow="lg"
                    size="lg"
                    variantColor="primary"
                    width="100%"
                    onClick={(event) => {
                      event.stopPropagation();

                      submit();
                    }}
                  >
                    {t("common.add")}
                  </Button>
                )}
              </DrawerFooter>
            </>
          );
        }}
      </ProductVariantForm>
    </Drawer>
  );
};

export default CartItemDrawer;
