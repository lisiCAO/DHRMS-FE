import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${'/background.jpg'})`,
    [theme.breakpoints.down('sm')]: {
      backgroundImage: `url(${'/background.jpg'})`,
    },
  },
}));

export default function PropertyCreate() {
  const classes = useStyles();

  return <div className={classes.root}>Your content here</div>;
}