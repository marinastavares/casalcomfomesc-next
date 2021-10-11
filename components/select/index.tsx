import { memo } from 'react'
import { Chip, Grid, Typography } from '@mui/material'

import useFilter from '../../hooks/useFilter'
import { optionsProps } from '../../models/options'

import useStyles from './styles'

interface SelectProps {
  options: optionsProps[]
  label: string
  name: string
  selected: string[]
  handleChange: (name: string, value: string) => void
}

const BasicSelect = ({
  options,
  label,
  selected,
  name,
  handleChange,
}: SelectProps) => {
  const styles = useStyles()

  const handleChip = (value: string) => () => {
    handleChange(name, value)
  }

  if (!options?.length) {
    return null
  }

  return (
    <Grid className={styles.container}>
      <Typography component="h2" variant="body1" color="secondary">
        {label}
      </Typography>
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
    </Grid>
  )
}

export default memo(BasicSelect)
