import Home from '../pages/home';
import About from '../pages/about';
import App from '../pages/app';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/test',
    component: About
  },
  {
    path: '/client',
    component: App
  }
];

export default routes;