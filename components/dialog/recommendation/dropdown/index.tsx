import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const Dropdown = ({
  options,
  onChange,
  label,
  name,
  value,
  error,
  helperText,
  onBlur,
}: {
  options: { name: string; slug: string }[]
  onChange: (event: SelectChangeEvent) => void
  name: string
  label: string
  value: string
  error: boolean
  helperText: string
  onBlur: any
}) => {
  return (
    <FormControl error={error} fullWidth>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        value={value}
        name={name}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option.slug} value={option.slug}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export default Dropdown
