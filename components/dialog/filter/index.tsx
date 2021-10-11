import { useState, useCallback } from 'react'
import Button from '@mui/material/Button'
import Dialog from '../index'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CircularProgress from '@mui/material/CircularProgress'
import Select from '../../select'
import { useQuery, useReactiveVar } from '@apollo/client'
import { GET_ALL_FILTERS_OPTIONS } from '../../../lib/queries/filter'

import { filterVar } from '../../../lib/cache'
import Loading from '../../loading'
import { DialogProps } from '../types'

interface FilterDialogProps extends DialogProps {
  getNewPosts: () => void
  isLoading: boolean
}

const CustomizedDialogs = ({
  onClose,
  getNewPosts,
  isLoading,
}: FilterDialogProps) => {
  const initialState = useReactiveVar(filterVar)
  const { data, loading } = useQuery(GET_ALL_FILTERS_OPTIONS)
  const [filter, setFilter] = useState(initialState)

  const handleChange = useCallback(
    (name: string, value: string) => {
      const selected = filter[name]
      if (!selected?.includes(value)) {
        const newSelected = selected?.length ? [...selected, value] : [value]
        setFilter((prevState) => ({ ...prevState, [name]: newSelected }))
        return
      }
      const newSelected = selected?.filter((option: string) => option !== value)
      setFilter((prevState) => ({ ...prevState, [name]: newSelected }))
    },
    [filter]
  )

  const handleFilter = useCallback(() => {
    filterVar(filter)
    getNewPosts()
  }, [filter, getNewPosts])

  return (
    <Dialog onClose={onClose}>
      {loading ? (
        <Loading imageOnly />
      ) : (
        <>
          <DialogContent dividers>
            <Select
              name="categories"
              options={data?.categories}
              label="Categorias"
              selected={filter.categories}
              handleChange={handleChange}
            />
            <Select
              name="cities"
              options={data?.cities}
              label="Cidades"
              selected={filter.cities}
              handleChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFilter}>
              {isLoading ? <CircularProgress /> : 'Filtrar'}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default CustomizedDialogs
