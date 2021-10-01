import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'

import useStyles from './styles'

interface HeaderProps {
  className: string
}

const Header = ({ className }: HeaderProps) => {
  const styles = useStyles()
  return (
    <Grid className={clsx(styles.header, className)}>
      <Typography variant="h6" color="inherit" component="h1">
        @casalcomfomesc
      </Typography>
    </Grid>
  )
}

export default Header
