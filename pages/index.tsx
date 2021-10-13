import type { NextPage } from 'next'
import { ChangeEvent, useCallback, useState } from 'react'
import { useQuery, useLazyQuery, useReactiveVar } from '@apollo/client'
import { Grid, TextField, Typography, Button } from '@mui/material'
import { useDebouncedCallback } from 'use-debounce'
import SearchIcon from '@mui/icons-material/Search'
import RecommendIcon from '@mui/icons-material/Recommend'
import Link from 'next/link'

import { GET_ALL_FILTERS_OPTIONS, getFilterPost } from '../lib/queries/filter'
import Post from '../components/post'
import { PostProps } from '../models/post'
import { filterVar } from '../lib/cache'
import Loading from '../components/loading'
import Dialog from '../components/dialog/filter'
import RecommendationDialog from '../components/dialog/recommendation'
import Chip from '../components/chip'
import AppLayout from '../layout/app'

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

  // Load initial posts
  const { loading, data: noFilterData } = useQuery(GET_ALL_FILTERS_OPTIONS)

  // Handle filter modal
  const [isModalOpen, handleModal] = useBoolean(false)
  const [isRecommendationModalOpen, handleRecommendationModal] =
    useBoolean(false)

  // Load posts according to filters
  const filter = useReactiveVar(filterVar)
  const variables = removeEmptyValues(filter ?? {})
  const [getNewPosts, { data: filterData, loading: isSearchLoading }] =
    useLazyQuery(getFilterPost(variables), {
      variables,
      onCompleted: () => {
        if (isModalOpen) {
          handleModal()
        }
      },
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
    <AppLayout>
      <TextField
        placeholder="Busque o restaurante"
        className={styles.search}
        size="small"
        onChange={handleChange}
        value={search}
        type="search"
        fullWidth
      />
      <Grid className={styles.filter}>
        <Button
          variant="outlined"
          color="secondary"
          className={styles.filterButton}
          onClick={handleRecommendationModal}
          startIcon={<RecommendIcon />}
        >
          Recomendar
        </Button>
        <Button
          startIcon={<SearchIcon />}
          className={styles.filterButton}
          variant="outlined"
          onClick={handleModal}
        >
          Filtros
        </Button>
        {Object.entries(variables).map(
          ([key, typeOfFilter]) =>
            Array.isArray(typeOfFilter) &&
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
                Ainda não visitamos essas opções, já deu uma olhada na nossa
                lista de{' '}
                <Link href="/recomendacoes">
                  <a>recomendações?</a>
                </Link>{' '}
                ?
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
      {isModalOpen && (
        <Dialog
          isLoading={isSearchLoading}
          getNewPosts={getNewPosts}
          onClose={handleModal}
        />
      )}
      {isRecommendationModalOpen && (
        <RecommendationDialog onClose={handleRecommendationModal} />
      )}
    </AppLayout>
  )
}

export default Home
