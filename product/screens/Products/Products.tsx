import React from "react";
import {Stack, Box, PseudoBox, Flex, useDisclosure, Text, SimpleGrid, IconButton as ChakraIconButton, InputGroup, InputLeftAddon, Input, IconButtonProps } from "@chakra-ui/core";
import BTT from "~/ui/icons/BTT";
import {useRouter} from "next/router";

import ProductCard from "../../components/ProductCard";
import {useFilteredProducts, useProducts} from "../../hooks";
import ProductsGrid from "../../components/ProductsGrid";
//import ProductsCarousel from "../../components/ProductsCarousel";

import Onboarding from "./Onboarding";

//import Logo from "~/ui/static/Logo";
import Image from "~/ui/feedback/Image";
import {useCart} from "~/cart/hooks";
import {groupBy} from "~/selectors/group";
import CartSummaryDrawer from "~/cart/components/CartSummaryDrawer";
//import {filterBy} from "~/selectors/filter";
import {useTenant} from "~/tenant/hooks";
import {useTranslation} from "~/i18n/hooks";
import TenantHeader from "~/tenant/components/TenantHeader";
import NoResults from "~/ui/feedback/NoResults";
import Content from "~/ui/structure/Content";
import SummaryButton from "~/cart/components/SummaryButton";
import CartItemDrawer from "~/cart/components/CartItemDrawer";
import {Product, Variant} from "~/product/types";
import Link from "~/ui/controls/Link";
import styled from "@emotion/styled";


const ProductsScreen: React.FC = () => {
  const {
    query: {product, category},
    push,
  } = useRouter();
  const {add, increase, decrease, items, checkout} = useCart();
  const t = useTranslation();
  const hasCode = true; //TO DO 
  const {isOpen: isCartOpen, onOpen: openCart, onClose: closeCart} = useDisclosure();
  const {products, filters} = useFilteredProducts((product) => product.type !== "hidden");
  const productsAll = useProducts();
  const {highlight, fields, layout, ...tenant} = useTenant();
  const selected = React.useMemo(() => products.find((_product) => _product.id === product), [
    products,
    product,
  ]);

  //const featuredProducts = filterBy(products, {featured: true});
  const productsByCategory = groupBy(products, (product) => product.category);

  // added
  setTimeout(() => {
    document.querySelector<HTMLElement>(`[id="btt"]`) ? document.querySelector<HTMLElement>(`[id="btt"]`).style.display='none' : ""
  }, 0)
  
  let scrollPosition = 0
  window.onscroll = () => {
    scrollPosition = document.body.scrollTop || document.documentElement.scrollTop
    if (scrollPosition > 500) {
      document.querySelector<HTMLElement>(`[id="btt"]`).style.display='none' ? document.querySelector<HTMLElement>(`[id="btt"]`).style.display='block' : ''
    } else {
      document.querySelector<HTMLElement>(`[id="btt"]`).style.display='block' ? document.querySelector<HTMLElement>(`[id="btt"]`).style.display='none' : ''
    }
  };

  function scrollToCategory() {
    if(category) {
      setTimeout(() => {
        document
          .querySelector(`[id="${category}"]`)
          ?.scrollIntoView()
        var scrolledY = window.scrollY;
        if(scrolledY){
          //window.scroll(0, scrolledY - 60);
          window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
        }
      }, 0)
    } 
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  //end added

  function handleAdd(product: Product, options: Variant[], count: number, note: string) {
    add(product, options, count, note);

   //push(`/`);
    push(`/`, `/`, {shallow: true});
  }

  function handleOpenCart() {
    openCart();
  }

  function handleCloseSelected() {
    //push(`/`);
   push(`/`, `/`, {shallow: true});
  }

  function handleSelect(product: Product) {
    push(
      {
        pathname: `/`,
        query: {
          product: product.id,
        },
      },
      {
        pathname: `/`,
        query: {
          product: product.id,
        },
      },
      {shallow: true},
    );
  }
  function handleAEClick() {
    setTimeout(() => {
      document
        .querySelector(`[id="ACCESORIOS ELECTRICOS"]`)
        ?.scrollIntoView()
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }, 0)
  }
  function handleHERRClick() {
    setTimeout(() => {
      document
        .querySelector(`[id="HERRAMIENTAS"]`)
        ?.scrollIntoView()
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }, 0)
  }
  function handleGATUClick() {
    setTimeout(() => {
      document
        .querySelector(`[id="GASFITERIA Y TUBERIA"]`)
        ?.scrollIntoView()
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }, 0)
  }
  function handleLIPGClick() {
    setTimeout(() => {
      document
        .querySelector(`[id="LIMPIEZA Y PLAGICIDAS"]`)
        ?.scrollIntoView()
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }, 0)
  }
  function handleCHAClick() {
    setTimeout(() => {
      document
        .querySelector(`[id="CHAPERIA"]`)
        ?.scrollIntoView()
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }, 0)
  }
  function handleHEPEClick() {
    setTimeout(() => {
      document
        .querySelector(`[id="HERRERIA Y PERNERIA"]`)
        ?.scrollIntoView()
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }, 0)
  }

  const WhatsAppIcon = () => {
  return (
    <Box>
      <svg fill="white" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          className="cls-1"
          d="M20.5 3.49a12 12 0 00-20.4 8.4 11.82 11.82 0 001.6 5.95L0 24l6.33-1.65A12 12 0 0012 23.79 11.94 11.94 0 0024 11.9a11.8 11.8 0 00-3.5-8.41zm-8.45 18.3A10 10 0 017 20.41l-.36-.21-3.76 1 1-3.65-.24-.37A9.88 9.88 0 0112.05 2a9.89 9.89 0 110 19.78zm5.45-7.4c-.3-.15-1.77-.87-2-1s-.47-.15-.67.15-.77 1-.95 1.17-.35.22-.65.07a8.17 8.17 0 01-2.4-1.47 9 9 0 01-1.66-2.06c-.17-.3 0-.46.13-.61s.3-.35.45-.52a2 2 0 00.3-.5.55.55 0 000-.52c-.14-.1-.74-1.58-.99-2.18s-.49-.5-.67-.51h-.57a1.1 1.1 0 00-.8.37A3.33 3.33 0 006 9.25a5.78 5.78 0 001.2 3.07 13.27 13.27 0 005.1 4.49 17.31 17.31 0 001.7.63 4.11 4.11 0 001.88.12 3.07 3.07 0 002-1.41 2.48 2.48 0 00.17-1.41c-.05-.13-.25-.21-.55-.36z"
        />
      </svg>
    </Box>
  );
};

const IconButton = styled(ChakraIconButton)`
  min-width: auto;
  min-height: auto;

  padding: 6px;

  svg {
    max-height: 20px;
    max-width: 20px;
  }
`;

const SocialIcon: React.FC<IconButtonProps> = (props) => (
  <IconButton
    isRound
    marginTop={-1}
    height="36"
    variantColor="green"
    width="36"
    {...props}
  />
);


  return (
    <>{(!hasCode &&
      <>
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
            <Box color='white' alignItems='center' marginTop={-4}>
              <Image
                height={150}
                width={150}
                src={"https://res.cloudinary.com/pency-d7d98/image/upload/v1654905088/CLOUDINARY_PRESET_LOW/a1kmqmcf3fdbebh2qlqo.png"}
              />
            </Box>
            <Stack mt={-6} alignItems="center" textAlign="center">
              <Text as="h1" color="black" fontSize="4xl" fontWeight="bold" lineHeight="90%">
                {"Lizeth Tellez"}
              </Text>
              <Text color="gray.700" fontSize="lg" fontWeight="bold" lineHeight="80%" zIndex={2}>
                {"ADMINISTRADORA"}
              </Text>
              <Text fontSize="3xl" fontWeight="bold" lineHeight="90%" marginTop={2} zIndex={2} alignItems="center" textAlign="center">
                <Link color="green" isExternal href={`https://wa.me/51935687208`}>
                  <SocialIcon aria-label="Enviar mensaje por WhatsApp" gridArea="links" icon={WhatsAppIcon} /> 935 687 208
                </Link>
              </Text>
              <Text display="none" color="white" backgroundColor="#ff0000" p={1} fontSize="4xl" fontWeight="bold" lineHeight="90%" marginTop={2} zIndex={2} alignItems="center" textAlign="center">
                {"2% Dcto. 🎁"}
              </Text>
              <InputGroup zIndex={3} mt={-5} fontWeight="bold"  >
                <InputLeftAddon color="gray.500" fontSize="4xl" fontWeight="bold"  children='#ID' />
                <Input size="lg" fontSize="4xl" fontWeight="bold"  placeholder='Ej.D16G' type="text" maxLength={5} maxWidth={150}/>
              </InputGroup>
            </Stack>
          </Stack>
        </Box>
      </> ) ||
      <>
        <Flex direction="column" height="100%">
          <Flex as="main" backgroundColor="white" direction="column" flex={1} height="100%">
            <Content height="100%" paddingX={{base: 0, sm: 4}}>
              <TenantHeader data-test-id="header" marginBottom={0} tenant={tenant} />
              <Box flex={1}>
                {highlight && (
                  <Box
                    fontSize={{base: "13px", sm: "xs"}}
                    fontWeight="500"
                    marginTop={0}
                    paddingX={4}
                    paddingY={3}
                    roundedTop={{base: 0, sm: "lg"}}
                    textAlign='center'
                  >
                    {/*highlight*/}
                    <SimpleGrid columns={[2, 3, 6]} spacing="20px" marginBottom={2}>
                      <Box h='140px' bg="#ebf8ff" borderWidth="1px" p={3} onClick={handleAEClick}>
                        <Image fadeIn src={"/assets/ae.png"} h='67%'/>
                        <Text
                          textTransform="uppercase"
                          fontWeight={500}
                          lineHeight="normal"
                          marginBottom={1}
                          marginTop={2}
                        >
                          ACCESORIOS ELECTRICOS
                        </Text>
                      </Box>
                      <Box h='140px' bg="#ebf8ff" borderWidth="1px" p={3} onClick={handleHERRClick}>
                        <Image fadeIn src={"/assets/herr.png"} h='67%'/>
                        <Text
                          textTransform="uppercase"
                          fontWeight={500}
                          lineHeight="normal"
                          marginBottom={1}
                          marginTop={2}
                        >
                          HERRAMIENTAS
                        </Text>
                      </Box>
                      <Box h='140px' bg="#ebf8ff" borderWidth="1px" p={3} onClick={handleGATUClick}>
                        <Image fadeIn src={"/assets/gatu.png"} h='67%'/>
                        <Text
                          textTransform="uppercase"
                          fontWeight={500}
                          lineHeight="normal"
                          marginBottom={1}
                          marginTop={2}
                        >
                          GASFITERIA Y TUBERIA
                        </Text>
                      </Box>
                      <Box h='140px' bg="#ebf8ff" borderWidth="1px" p={3} onClick={handleLIPGClick}>
                        <Image fadeIn src={"/assets/lipg.png"} h='67%'/>
                        <Text
                          textTransform="uppercase"
                          fontWeight={500}
                          lineHeight="normal"
                          marginBottom={1}
                          marginTop={2}
                        >
                          LIMPIEZA Y PLAGICIDAS
                        </Text>
                      </Box>
                      <Box h='140px' bg="#ebf8ff" borderWidth="1px" p={3} onClick={handleCHAClick}>
                        <Image fadeIn src={"/assets/cha.png"} h='67%'/>
                        <Text
                          textTransform="uppercase"
                          fontWeight={500}
                          lineHeight="normal"
                          marginBottom={1}
                          marginTop={2}
                        >
                          CHAPERIA
                        </Text>
                      </Box>
                      <Box h='140px' bg="#ebf8ff" borderWidth="1px" p={3} onClick={handleHEPEClick }>
                        <Image fadeIn src={"/assets/hepe.png"} h='67%'/>
                        <Text
                          textTransform="uppercase"
                          fontWeight={500}
                          lineHeight="normal"
                          marginBottom={1}
                          marginTop={2}
                        >
                          HERRERIA Y PERNERIA
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                )}
                <Box
                  backgroundColor="#ebf8ff"
                  borderWidth={{base: "0px", sm: "1px"}}
                  data-test-id="filters"
                  marginBottom={{base: 5, sm: 10}}
                  paddingX={4}
                  paddingY={1}
                  position="sticky"
                  roundedBottom="lg"
                  roundedTop={highlight ? "none" : "lg"}
                  top={0}
                  zIndex={3}
                >
                  {filters}
                </Box>
                <Box marginBottom={4} paddingX={{base: 4, sm: 0}}>
                  <Stack margin="auto" spacing={5} width="100%">
                    {Boolean(products.length) ? (
                      <Stack spacing={{base: 5, sm: 10}} width="100%">
                        {/*Boolean(featuredProducts.length) && (
                          <ProductsCarousel title={t("ITEMS POR AGOTARSE")} zIndex={0}>
                            //{featuredProducts.map((product) => (
                              <ProductCard
                                key={product.id}
                                isRaised
                                layout="portrait"
                                minWidth={280}
                                product={product}
                                onClick={() => handleSelect(product)}
                              />
                            ))}
                          </ProductsCarousel>
                        )*/}
                        {productsByCategory.map(([category, products]) => {
                          return (
                            <PseudoBox key={category} as="section" id={category}>
                              <ProductsGrid data-test-id="category" layout={layout} title={category} products={products}>
                                {products.map((product) => (
                                  <ProductCard
                                    key={product.id}
                                    layout={layout}
                                    product={product}
                                    onClick={() => handleSelect(product)}
                                  />
                                ))}
                              </ProductsGrid>
                            </PseudoBox>
                          );
                        })}
                      </Stack>
                    ) : (
                      <NoResults data-test-id="empty">{t("products.empty")}</NoResults>
                    )}
                  </Stack>
                </Box>
              </Box>
            </Content>
          </Flex>
          <Link id="btt" onClick={scrollToTop}>
              <Box position='fixed'
                  bottom='70px'
                  color="primary"
                  right={['16px', '84px']}
                  zIndex={1}
              >
                  <BTT w={10} h={10} />
              </Box>
          </Link>
        </Flex>
        {Boolean(items.length) && (
          <Flex
            as="nav"
            bottom={0}
            justifyContent="center"
            margin={{base: 0, sm: "auto"}}
            paddingBottom={4}
            paddingX={4}
            position="sticky"
            width="100%"
            zIndex={4}
          >
            <Box
              display="block"
              margin={{base: 0, sm: "auto"}}
              minWidth={{base: "100%", sm: 64}}
              rounded={4}
              width={{base: "100%", sm: "auto"}}
            >
              <SummaryButton items={items} onClick={handleOpenCart}>
                {t("products.review")}
              </SummaryButton>
            </Box>
          </Flex>
        )}
        <Content>
          <Flex
            alignItems={{base: "center", sm: "flex-end"}}
            direction={{base: "column", sm: "row"}}
            justifyContent="flex-end"
            padding={4}
          >  
            <Stack w="100%" alignItems="center" spacing={1}>
              <Text fontSize="sm">{'Desde 2016, FERRISUR IMPORT SAC'}</Text>
              <Text fontSize="sm">{'\n'}{'Hecho en Juliaca, Perú por '} Chris {' & '} Liz</Text>
            </Stack>
          </Flex>
        </Content>
        {isCartOpen && (
          <CartSummaryDrawer
            fields={fields}
            items={items}
            onCheckout={checkout}
            onClose={closeCart}
            onDecrease={decrease}
            onIncrease={increase}
            products={productsAll}
          />
        )}
        {Boolean(selected) && (
          <CartItemDrawer product={selected} onClose={handleCloseSelected} onSubmit={handleAdd} />
        )}

        {scrollToCategory()}
        <Onboarding />
      </>
      }
    </>
  );
};

export default ProductsScreen;