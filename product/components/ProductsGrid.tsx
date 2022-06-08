import React from "react";
import {Grid, Stack, Text, StackProps} from "@chakra-ui/core";

interface Props extends StackProps {
  title?: string;
  layout: "landscape" | "portrait";
  products?: {
    length?: number,
  };
}

const ProductsGrid: React.FC<Props> = ({children, title, layout, products, ...props}) => (
  <Stack spacing={{base: 4, sm: 5}} {...props}>
    {title && (
      <Stack
          isInline
          alignItems="center"
          fontSize="lg"
          fontWeight={500}
          spacing={2}
        >
        <Text
          as="h2"
          data-test-id="title"
          fontSize={{base: "xl", sm: "2xl"}}
          fontWeight={500}
          textTransform="capitalize"  
        >
          {title}
        </Text>
        <Text fontSize="xl" color="gray.500">({products.length})</Text>
      </Stack>
    )} 
    {layout === "landscape" && (
      <Grid
        autoRows="auto"
        gridGap={{base: 0, sm: 8}}
        templateColumns={{
          base: "repeat(auto-fill, minmax(200px,1fr))",
          sm: "repeat(auto-fill, minmax(400px,1fr))",
        }}
      >
        {children}
      </Grid>
    )}
    {layout === "portrait" && (
      <Grid
        autoRows="auto"
        gridGap={{base: 4, sm: 6}}
        templateColumns={{
          base: "repeat(auto-fill, minmax(120px,1fr))",
          sm: "repeat(auto-fill, minmax(180px,1fr))",
        }}
      >
        {children}
      </Grid>
    )}
  </Stack>
);

export default ProductsGrid;
