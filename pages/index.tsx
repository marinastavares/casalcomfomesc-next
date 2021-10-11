import type { NextPage } from 'next'
import { ChangeEvent, useCallback, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useQuery, useLazyQuery, useReactiveVar } from '@apollo/client'
import { Grid, TextField, Typography, Button } from '@mui/material'
import { useDebouncedCallback } from 'use-debounce'
import SearchIcon from '@mui/icons-material/Search'
import InstagramIcon from '@mui/icons-material/Instagram'

import { GET_ALL_FILTERS_OPTIONS, getFilterPost } from '../lib/queries/filter'
import Post from '../components/post'
import { PostProps } from '../models/post'
import { filterVar } from '../lib/cache'
import Loading from '../components/loading'
import ProfilePicture from '../assets/foto1.png'
import useMobileDetect from '../hooks/useMobileAgent'
import Dialog from '../components/dialog'
import Chip from '../components/chip'

import useStyles from '../styles/styles'
import useBoolean from '../hooks/useBoolean'

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
  const { isMobile } = useMobileDetect()

  // Load initial posts
  const { loading, data: noFilterData } = useQuery(GET_ALL_FILTERS_OPTIONS)
  console.log('🚀 ~ file: index.tsx ~ line 42 ~ noFilterData', noFilterData)

  // Load posts according to filters
  const filter = useReactiveVar(filterVar)
  const variables = removeEmptyValues(filter ?? {})
  const [getNewPosts, { data: filterData, loading: isSearchLoading }] =
    useLazyQuery(getFilterPost(variables), {
      variables,
    })

  const handleRemoveFilter = useCallback(
    (name: string, value: string) => {
      filterVar({
        ...filter,
        [name]: filter[name].filter((slug) => slug !== value),
      })
    },
    [filter]
  )

  // Handle filter modal
  const [isModalOpen, handleModal] = useBoolean(false)

  // Handle search input
  const [search, setSearch] = useState<string>()
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
    return <Loading />
  }

  return (
    <>
      <Head>
        <title>@casalcomfomesc</title>
        <meta
          name="description"
          content="O site que você pode visualizar e filtrar todos os posts feito pelo casal Tavazetta 🍔🍟🍕🌯🍝🍣"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <Header className={styles.header} /> */}
        <Grid className={styles.header}>
          <Image
            className={styles.image}
            height={isMobile ? 120 : 48}
            width={isMobile ? 120 : 48}
            src={ProfilePicture}
            alt="Profile"
          />
          <a
            href="https://www.instagram.com/casalcomfomesc"
            alt="Nosso instagram"
            className={styles.icon}
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon />
          </a>
          <Typography component="h1" className={styles.titleHeader}>
            Bem vindo ao portal @casalcomfomesc
          </Typography>
        </Grid>
        <TextField
          placeholder="Busque o restaurante"
          className={styles.search}
          size="small"
          onChange={handleChange}
          value={search}
          type="search"
        />

        <Grid className={styles.filter}>
          <Button
            startIcon={<SearchIcon />}
            className={styles.filterButton}
            variant="outlined"
            onClick={handleModal}
          >
            Mais filtros
          </Button>
          {Object.entries(variables).map(([key, typeOfFilter]) =>
            typeOfFilter.map((value: string) => (
              <Chip
                key={value}
                slug={value}
                label={
                  noFilterData[key].find((type) => type.slug === value).name
                }
                name={key}
                handleChange={handleRemoveFilter}
              />
            ))
          )}
        </Grid>

        <Grid className={styles.post}>
          {isSearchLoading ? (
            <Loading />
          ) : (
            <Grid className={styles.list}>
              {posts?.length ? (
                posts?.map((post: PostProps) => (
                  <Post post={post} key={post.id} />
                ))
              ) : (
                <Typography color="primary" component="h1" variant="body1">
                  Ainda não visitamos essas opções
                </Typography>
              )}
            </Grid>
          )}
        </Grid>
      </main>
      {isModalOpen && (
        <Dialog getNewPosts={getNewPosts} onClose={handleModal} />
      )}
    </>
  )
}

export default Home
