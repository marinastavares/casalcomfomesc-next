import type { NextPage } from 'next'
import { ChangeEvent, useCallback, useState } from 'react'
import Head from 'next/head'
import { useQuery, useLazyQuery } from '@apollo/client'
import { Grid, TextField } from '@mui/material'
import { useDebouncedCallback } from 'use-debounce'

import { GET_ALL_FILTERS_OPTIONS, getFilterPost } from '../lib/queries/filter'
import Select from '../components/select'
import Post from '../components/post'
import { PostProps } from '../models/post'
import { filterVar } from '../lib/cache'

import useStyles from './styles'

const removeEmptyValues = (payload: any) => {
  const newValues = Object.entries(payload).reduce(
    (acc: any, [key, value]: [string, any]) => {
      if (!value.length) {
        return acc
      }
      return { ...acc, [key]: value }
    },
    {}
  )
  return newValues
}

const Home: NextPage = () => {
  const styles = useStyles()
  const { loading, data: noFilterData } = useQuery(GET_ALL_FILTERS_OPTIONS)
  const [search, setSearch] = useState<string>()

  const variables = removeEmptyValues(noFilterData?.filter ?? {})
  const [getNewPosts, { data: filterData }] = useLazyQuery(
    getFilterPost(variables),
    {
      variables,
    }
  )

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      filterVar({ ...noFilterData.filter, search: value })
      getNewPosts()
    },
    // delay in ms
    1000
  )
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setSearch(value)
      debounced(value)
    },
    [debounced]
  )

  const posts =
    Object.keys(variables).length > 0 ? filterData?.posts : noFilterData?.posts

  if (loading) {
    return null
  }

  return (
    <>
      <Head>
        <title>@casalcomfomesc</title>
        <meta name="description" content="Rota do casal tavazetta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <Header className={styles.header} /> */}
        <TextField
          placeholder="Busque o restaurante"
          className={styles.search}
          size="small"
          onChange={handleChange}
          value={search}
        />
        <Grid className={styles.post}>
          <Grid className={styles.list}>
            {/* <Typography variant="h3" color="primary">
              Posts encontrados
            </Typography> */}
            {posts?.map((post: PostProps) => (
              <Post post={post} key={post.id} />
            ))}
          </Grid>
          <Grid>
            <Select
              name="categories"
              options={noFilterData?.categories}
              label="Categorias"
              getNewPosts={getNewPosts}
            />
            <Select
              name="cities"
              options={noFilterData?.cities}
              label="Cidades"
              getNewPosts={getNewPosts}
            />
          </Grid>
        </Grid>
      </main>
    </>
  )
}

export default Home
