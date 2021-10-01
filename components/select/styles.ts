import { makeStyles } from '@mui/styles'


const useStyles = makeStyles(() => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 250,
    gridTemplateRows: 'auto',
    marginTop: 24,
    rowGap: 8,
  },
  select: {
    borderRadius: 30,
  },
  chips: {
    width: 250,
    flexWrap: 'wrap',
    display: 'flex',
    gap: 4,
  },
  selectAll: {
    marginTop: 12,
    alignSelf: 'flex-start'
  }
}))


export default useStyles
