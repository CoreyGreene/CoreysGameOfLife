import RunGame from './components/RunGame';
import { Home } from './components/Home';

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: '/RunGame',
    element: <RunGame />,
  },
];

export default AppRoutes;
