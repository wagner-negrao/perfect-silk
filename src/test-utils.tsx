import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'

export function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>,
  )
}
