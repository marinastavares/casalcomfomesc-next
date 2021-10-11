import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import Select from '../select'
import { useQuery, useReactiveVar } from '@apollo/client'
import {
  GET_ALL_FILTERS_OPTIONS,
  getFilterPost,
} from '../../lib/queries/filter'

import { filterVar } from '../../lib/cache'
import Loading from '../loading'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: boolean | Dispatch<SetStateAction<boolean>>
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <CustomDialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </CustomDialogTitle>
  )
}

const CustomizedDialogs = ({
  onClose,
  getNewPosts,
}: {
  onClose: () => void
  getNewPosts: () => void
}) => {
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
    onClose()
  }, [filter, getNewPosts, onClose])

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="filtros-disponiveis"
      open
    >
      <BootstrapDialogTitle id="filtros-disponiveis" onClose={onClose}>
        Filtros
      </BootstrapDialogTitle>
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
            <Button onClick={handleFilter}>Filtrar</Button>
          </DialogActions>
        </>
      )}
    </BootstrapDialog>
  )
}

export default CustomizedDialogs
