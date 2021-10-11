import { memo } from 'react'
import { Chip as MUIChip } from '@mui/material'

import useFilter from '../../hooks/useFilter'
import { optionsProps } from '../../models/options'

import useStyles from './styles'

interface ChipProps {
  label: string
  name: string
  slug: string
  className?: string
  handleChange: (name: string, value: string) => void
}

const Chip = ({ label, name, slug, handleChange, className }: ChipProps) => {
  const styles = useStyles()

  const handleChip = () => {
    handleChange(name, slug)
  }

  return (
    <MUIChip
      color="primary"
      onDelete={handleChip}
      label={label}
      className={className}
    />
  )
}

export default memo(Chip)
