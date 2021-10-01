import { makeStyles, Theme } from '@mui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '24px 1fr 24px',
    gridTemplateRows: 'auto',
    gridTemplateAreas: "'header header header' '. search . ' '. post .'"
  },
  header: {
    gridArea: 'header',
  },
  search: {
    gridArea: 'search',
  },
  post: {
    gridArea: 'post',
    display: 'grid',
    gridTemplateColumns: '1fr 250px',
    gridTemplateRows: '1fr',
  },
  list: {
    padding: 24,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 280px)',
    gridTemplateRows: 'auto',
    alignItems: 'flex-start',
    gap: 16,
  }
}))


export default useStyles
