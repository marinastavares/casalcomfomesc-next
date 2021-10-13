import { makeStyles, DefaultTheme } from '@mui/styles'

const useStyles = makeStyles((theme: DefaultTheme) => ({
  filterButton: {
    textTransform: 'capitalize',
    borderRadius: 16,
  },
  post: {
    padding: 24,
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap:  'wrap',
    justifyContent: 'flex-start',
    gap: 16,
  },
  paper: {
    padding: 16,

    '&:hover': {
      borderColor: theme.palette.primary.main,
    }
  }
}))


export default useStyles
