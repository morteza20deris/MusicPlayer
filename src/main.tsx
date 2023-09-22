import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import theme from './Theme.ts'
import 'bootstrap/dist/css/bootstrap.css'
// import React from 'react'
const client = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(

  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </ChakraProvider>

)
