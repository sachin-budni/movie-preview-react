import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme, createStyles } from '@material-ui/core/styles';
import PopularMovie from './components/popularmovie';
import NowPlayingMovie from './components/now-playingmovies';
import LatestMovie from './components/latestmovies';
import TopRatedMovie from './components/top-ratedmovies';
import TrendingChart from './components/trendingcharts';
import UpCommingMovie from './components/upcommingmovies';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { MovieDeails } from './components/movie-details';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const routerLinks = [
    { path: '/trendingchart', name: 'Trending Charts' },
    { path: '/popularmovies', name: 'Popular Movies' },
    { path: '/latestmovies', name: 'Latest Movies' },
    { path: '/upcommingmovies', name: 'Upcomming Movies' },
    { path: '/topratedmovies', name: 'Top-Rated Movies' },
    { path: '/nowplayingmovies', name: 'Now-Playing Movies' },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
        {routerLinks.map((obj, index) => (
            <Link to={obj.path} key={obj.name}>
                <Button style={{ width: 'calc(100% - 40px)', margin: '10px 20px',  fontFamily: "'Poppins', sans-serif", }}>
                    {obj.name}
                </Button>
            </Link>
        ))}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <Router>
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
            <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                paper: classes.drawerPaper,
                }}
                ModalProps={{
                keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {drawer}
            </Drawer>
            </Hidden>
        </nav>
        <main className={classes.content}>
            <Switch>
                <Route path="/popularmovies" exact component={PopularMovie} />
                <Route path="/upcommingmovies" exact component={UpCommingMovie} />
                <Route path="/latestmovies" exact component={LatestMovie} />
                <Route path="/topratedmovies" exact component={TopRatedMovie} />
                <Route path="/nowplayingmovies" exact component={NowPlayingMovie} />
                <Route path="/trendingchart" exact component={TrendingChart} />
                <Route path="/popularmovies/:id" exact component={MovieDeails} />
                <Route path="/upcommingmovies/:id" exact component={MovieDeails} />
                <Route path="/topratedmovies/:id" exact component={MovieDeails} />
                <Route path="/nowplayingmovies/:id" exact component={MovieDeails} />
                <Route path="/**" component={PopularMovie} />
            </Switch>
        </main>
      </Router>
    </div>
  );
}