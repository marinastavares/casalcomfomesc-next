import {
  ApolloClient,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client'
import { onError } from '@apollo/link-error'
import { createUploadLink } from 'apollo-upload-client'
import merge from 'deepmerge'
import { IncomingHttpHeaders } from 'http'
import fetch from 'isomorphic-unfetch'
import isEqual from 'lodash/isEqual'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import {cache} from './cache'

const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
  // isomorphic fetch for passing the cookies along with each GraphQL request
  const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        'Access-Control-Allow-Origin': '*',
        // 'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzI1MDA0OTcsImF1ZCI6WyJodHRwczovL2FwaS11cy1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NrdHlnMHc3cjJuenIwMXl1ZXBydDg2dmYvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOGIzM2FiNmQtYjk4MS00YjNkLWE2OWMtZjIxM2ZiYWZmODI5IiwianRpIjoiY2t0eWtuOXduMzB1ZDAxeG1na3B4ZTJxaCJ9.SStphVG2ExKuVIRPj-Mcp2UIdu9YkrnXVlvcsZL-ulSapU32dLrTdRQgkESjlBK4-POblGcLIf9Z36bMoNsqFEZTo2tET6DeAkhSfT0x3tA5p8SLu6hwUGdFyPTanJwj8M38QC_fH3l4duB2cqYuziMsm1ByPrBqiXmP0iUar5S75T-XJ9YVq5-N7iGFZ2-yEq-v4rzj9O2AO9kBMWsT2yIkh-ZtFfUntDBOV20cFtFtP8bGQzEbjumlC-_zGjzQIMcELFYGXMCVhOY97YkMY3mZAyFe6dsch581-tvYou9i6GN1FS-FOFHHVPEesgnH43Yv2RY5rL8Zcu6fQek7tyUWPQ_L5p4Y-As_DQgLM1bB9ePoq46e6cliBe315aomXw2W6HryX7Y38tDKUkjkTn5z1BztfEXGD7Zxm0vhqUnOKl7p12XfUBmx-gbfv2CVMn-9deJyDXE7hF3Th8EFT7yq68jxXVWV0cYiWXNRskkG8bs8UQ3g1TTqYacENG-s77ORdVykZZAb9WduN9H1a8CjPPIuQu-wsCI-XMGyT1XtrBQ9HYbofHKCXx1SEwb4szXaL7-daJ_nSSjOTvBsLLy1dWJ820O7_d57NyuDDHDNAB1Zf764_pdP5aVfMIFnrAJc2I0wJjuD3BpA7jcX-EeZPzSFL44djyrnsTC_ESk`,
        // here we pass the cookie along for each request
        Cookie: headers?.cookie ?? '',
      },
    }).then((response) => response)
  }

  return new ApolloClient({
    // SSR only for Node.js
    ssrMode: typeof window === 'undefined',
    // link: httpLink,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable. Is it running?`
          )
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: 'https://api-us-east-1.graphcms.com/v2/cktyg0w7r2nzr01yueprt86vf/master',
        // Make sure that CORS and cookies work
        // fetchOptions: {
        //   mode: 'cors',
        // },
        // credentials: 'include',
        fetch: enhancedFetch,
      }),
    ]),
    connectToDevTools: true,
    cache,
  })
}

type InitialState = NormalizedCacheObject | undefined

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null
  initialState?: InitialState | null
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  }
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) => {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo({ initialState: state }), [
    state,
  ])
  return store
}
