import { makeStyles, DefaultTheme } from '@mui/styles'

const useStyles = makeStyles((theme: DefaultTheme) => ({
  main: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '24px 1fr 24px',
    gridTemplateRows: 'auto',
    gridTemplateAreas: "'header header header' '. search . ' '. filter .' '. post .'",
  },
  header: {
    gridArea: 'header',
    backgroundColor: theme.palette.primary.main,
    padding: 32,
    marginBottom: 32,
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  titleHeader: {
    color: theme.palette.primary.contrastText,
  },
  search: {
    gridArea: 'search',
  },
  filter: {
    gridArea: 'filter',
    display: 'flex',
    marginTop: 8,
    flexWrap:  'wrap',
    gap: 8,
    alignItems: 'center'
  },
  filterButton: {
    textTransform: 'capitalize',
    borderRadius: 16,
  },
  post: {
    gridArea: 'post',
  },
  list: {
    padding: 24,
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap:  'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  image: {
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid #fff',
  },
  icon: {
    color: 'white',
  }
}))


export default useStyles
