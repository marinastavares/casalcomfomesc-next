import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) =>  ({
  post: {
    borderRadius: 12,
    padding: 0,
    display: 'grid',
    gridTemplateColumns: '280px',
    gridTemplateRows: 'auto auto',
    textDecoration: 'none',
    width: 280,

    '&:hover': {
      borderColor: theme.palette.primary.main,
    }
  },
  image: {
    borderRadius: '0.4rem 0.4rem 0 0',
    objectFit: 'cover',
  },
  title: {
    gridArea: 'title',
  },
  header: {
    display: 'flex',
    gap: 4,
  },
  bottom: {
    marginTop: 12,
    display: 'flex',
    gap: 4,
  },
  content: {
    padding: 8,
    display: 'grid',
    gridTemplateRows: 'auto',
    textDecoration: 'none',
  },
  date: {
    lineHeight: 1,
    fontSize: 12,
    marginLeft: 8,
  },
  name: {
    margin: '4px 0',
    gap: 4,
  },
  icon: {
    height: 10,
    width: 10,
  },
}))


export default useStyles
