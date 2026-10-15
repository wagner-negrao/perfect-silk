import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'
import Contato from './pages/Contato'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Privacy from './pages/Privacy'
import Producao from './pages/Producao'
import Projetos from './pages/Projetos'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'producao', element: <Producao /> },
      { path: 'projetos', element: <Projetos /> },
      { path: 'contato', element: <Contato /> },
      { path: 'privacidade', element: <Privacy /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
