import { createBrowserRouter } from 'react-router-dom'
import { SearchPage } from '@/features/anime/pages/SearchPage'
import { DetailPage } from '@/features/anime/pages/DetailPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
  },
  {
    path: '/anime/:id',
    element: <DetailPage />,
  },
])
