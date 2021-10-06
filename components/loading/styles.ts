import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    margin: '64px auto',

    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
    },
  },
}));


export default useStyles
