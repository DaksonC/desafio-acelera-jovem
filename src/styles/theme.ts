import { extendTheme } from "@chakra-ui/react";

const customTheme = {
  styles: {
    global: {
      'html, body': {
        color: 'gray.900',
        lineHeight: 'tall',
        bgGradient:'linear(to-l, #7928CA, gray.900)',
      },
      a: {
        color: 'teal.500',
      },
    },
  },
}

const theme = extendTheme(customTheme);

export default theme;