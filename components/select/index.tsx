import { memo } from 'react'
import { Chip, Grid, Typography } from '@mui/material'

import useFilter from '../../hooks/useFilter'
import { optionsProps } from '../../models/options'

import useStyles from './styles'

interface SelectProps {
  options: optionsProps[]
  label: string
  name: string
  getNewPosts: any
}

const BasicSelect = ({ options, label, name, getNewPosts }: SelectProps) => {
  const styles = useStyles()
  const {
    filter: selected,
    handleChange,
    handleSelectAll,
  } = useFilter(name, getNewPosts)

  const handleChip = (value: string) => () => {
    handleChange(value)
  }

  const handleSelect = () => {
    handleSelectAll(options)
  }

  if (!options?.length) {
    return null
  }

  return (
    <Grid className={styles.container}>
      <Typography component="h2" variant="body1" color="secondary">
        Filtro por {label}
      </Typography>
      {!!selected.length && (
        <Typography component="h2" variant="body2" color="secondary">
          {selected.length} selecionados
        </Typography>
      )}
      <Grid className={styles.chips}>
        {options.map((option) => (
          <Chip
            color={selected.includes(option.slug) ? 'primary' : 'secondary'}
            variant="outlined"
            onClick={handleChip(option.slug)}
            key={option.slug}
            label={option.name}
          />
        ))}
      </Grid>
      <Chip
        className={styles.selectAll}
        color={selected.length === options.length ? 'primary' : 'secondary'}
        variant="outlined"
        onClick={handleSelect}
        label="Selecionar todos"
      />
    </Grid>
  )
}

export default memo(BasicSelect)
