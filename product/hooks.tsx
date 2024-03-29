import React from "react";
import {Icon, Text, Flex, InputGroup, InputLeftElement, Divider} from "@chakra-ui/core";

import ProductContext from "./context";
import {Product} from "./types";

import Input from "~/ui/inputs/Input";
import Select from "~/ui/inputs/Select";
import {extractUniqueBy, filterBy} from "~/selectors/filter";
import {sort} from "~/selectors/sort";
import {groupBy} from "~/selectors/group";
import {useTranslation} from "~/i18n/hooks";

export function useProducts() {
  const {
    state: {products},
  } = React.useContext(ProductContext);

  return products;
}

export function useOrders() {
  const {
    state: {orders},
  } = React.useContext(ProductContext);

  return orders;
}

export function useProductActions() {
  const {
    actions: {create, update, remove, remorder, upsert, updateorder},
  } = React.useContext(ProductContext);

  return {create, update, remove, remorder, upsert, updateorder};
}

export function useProductCategories() {
  const products = useProducts();

  return sort(extractUniqueBy(products, (product) => product.category));
}

export function useFilteredProducts(selector?: (product: Product) => boolean) {
  const products = useProducts();
  const t = useTranslation();
  const [query, setQuery] = React.useState("");
  const filtered = selector ? products.filter(selector) : products;
  const productsBySearch = React.useMemo(() => filterBy(filtered, {title:query, description:query}), [
    query,
    filtered,
  ]);
  const categories = groupBy(filtered, (product) => product.category).map(([category, products]): [
    Product["category"],
    number,
  ] => [category, products.length]);

  function handleCategoryChange(category: Product["category"]) {
    setQuery("");

    if (category) {
      document
        .querySelector(`[id="${category}"]`)
        ?.scrollIntoView(true)
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }
  }

  return {
    products: productsBySearch,
    filters: (
      <>
        <Flex alignItems="center">
          <Select
            flex={{base: 1, sm: "inherit"}}
            fontWeight="500"
            height="100%"
            maxWidth={{base: "100%", sm: "140px"}}
            paddingLeft={0}
            placeholder={t("common.categories")}
            value=""
            variant="unstyled"
            width="auto"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleCategoryChange(e.target.value)
            }
          >
            {categories.map(([category, count]) => (
              <option key={category} value={category}>
                {category} ({count})
              </option>
            ))}
          </Select>
          <Divider height={4} orientation="vertical" />
          <InputGroup alignItems="center" flex={{base: 1, sm: "inherit"}} height={10} w="100%">
            <InputLeftElement
              children={<Icon color="gray.300" name="search" />}
              color="gray.300"
              fontSize="1.2em"
              top="inherit"
            />
            <Input
              fontSize="md"
              paddingLeft={10}
              placeholder={t("filters.search")}
              value={query}
              variant="unstyled"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            />
          </InputGroup>
        </Flex>
        {query && (
            <Text fontWeight="900" fontStyle="italic" textAlign="center">Resultados de la busqueda: "{query}"</Text>
          )
        }
      </>
    ),
  };
}

export function useFilteredProductsWithCode(selector?: (product: Product) => boolean) {
  const products = useProducts();
  const t = useTranslation();
  const [query, setQuery] = React.useState("");
  const filtered = selector ? products.filter(selector) : products;
  const productsBySearch = React.useMemo(() => filterBy(filtered, {code: query, title:query, description:query}), [
    query,
    filtered,
  ]);
  const categories = groupBy(filtered, (product) => product.category).map(([category, products]): [
    Product["category"],
    number,
  ] => [category, products.length]);

  function handleCategoryChange(category: Product["category"]) {
    setQuery("");

    if (category) {
      document
        .querySelector(`[id="${category}"]`)
        ?.scrollIntoView(true)
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }
  }

  return {
    products: productsBySearch,
    filters: (
      <Flex alignItems="center">
        <Select
          flex={{base: 1, sm: "inherit"}}
          fontWeight="500"
          height="100%"
          maxWidth={{base: "100%", sm: "140px"}}
          paddingLeft={0}
          placeholder={t("common.categories")}
          value=""
          variant="unstyled"
          width="auto"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleCategoryChange(e.target.value)
          }
        >
          {categories.map(([category, count]) => (
            <option key={category} value={category}>
              {category} ({count})
            </option>
          ))}
        </Select>
        <Divider height={4} orientation="vertical" />
        <InputGroup alignItems="center" flex={{base: 1, sm: "inherit"}} height={10} w="100%">
          <InputLeftElement
            children={<Icon color="gray.300" name="search" />}
            color="gray.300"
            fontSize="1.2em"
            top="inherit"
          />
          <Input
            fontSize="md"
            paddingLeft={10}
            placeholder={t("filters.search")}
            value={query}
            variant="unstyled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Flex>
    ),
  };
}

export function useFilteredProductsOriginal(selector?: (product: Product) => boolean) {
  const products = useProducts();
  const t = useTranslation();
  const [query, setQuery] = React.useState("");
  const filtered = selector ? products.filter(selector) : products;
  const productsBySearch = React.useMemo(() => filterBy(filtered, {title:query}), [
    query,
    filtered,
  ]);
  const categories = groupBy(filtered, (product) => product.category).map(([category, products]): [
    Product["category"],
    number,
  ] => [category, products.length]);

  function handleCategoryChange(category: Product["category"]) {
    setQuery("");

    if (category) {
      document
        .querySelector(`[id="${category}"]`)
        ?.scrollIntoView(true)
      var scrolledY = window.scrollY;
      if(scrolledY){
        //window.scroll(0, scrolledY - 60);
        window.scrollTo({ top: scrolledY - 60, behavior: 'smooth' });
      }
    }
  }

  return {
    products: productsBySearch,
    filters: (
      <Flex alignItems="center">
        <Select
          flex={{base: 1, sm: "inherit"}}
          fontWeight="500"
          height="100%"
          maxWidth={{base: "100%", sm: "140px"}}
          paddingLeft={0}
          placeholder={t("common.categories")}
          value=""
          variant="unstyled"
          width="auto"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleCategoryChange(e.target.value)
          }
        >
          {categories.map(([category, count]) => (
            <option key={category} value={category}>
              {category} ({count})
            </option>
          ))}
        </Select>
        <Divider height={4} orientation="vertical" />
        <InputGroup alignItems="center" flex={{base: 1, sm: "inherit"}} height={10} w="100%">
          <InputLeftElement
            children={<Icon color="gray.300" name="search" />}
            color="gray.300"
            fontSize="1.2em"
            top="inherit"
          />
          <Input
            fontSize="md"
            paddingLeft={10}
            placeholder={t("filters.search")}
            value={query}
            variant="unstyled"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Flex>
    ),
  };
}
