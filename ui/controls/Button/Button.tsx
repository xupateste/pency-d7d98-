import React from "react";
import {Button as ChakraButton, ButtonProps as ChakraButtonProps} from "@chakra-ui/core";

const Button: React.FC<ChakraButtonProps> = (props) => (
  <ChakraButton fontSize="md" fontWeight={600} {...props} />
);

export default Button;
