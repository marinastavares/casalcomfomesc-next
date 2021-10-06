import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@mui/material/styles'

import theme from '../styles/theme'
import { useApollo } from '../lib/apolloClient.ts'

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps)

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
