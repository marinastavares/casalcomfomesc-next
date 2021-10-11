import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  loading: {
    margin: '64px auto',

    [theme.breakpoints.down('sm')]: {
      margin: '12px auto',
    },
  },
}));


export default useStyles
