import { SearchBar } from '../components/SearchBar'
import { AnimeGrid } from '@/features/anime/components/AnimeGrid'
import { Pagination } from '@/features/anime/components/Pagination'
import { Component as Background } from '@/components/ui/background-components'

export const SearchPage = () => {
  return (
    <Background>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <header className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Anime Search</h1>
            <p className="text-gray-700 text-lg">
              Discover your next favorite anime
            </p>
          </header>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
          
          <AnimeGrid />
          
          <Pagination />
        </div>
      </main>
    </Background>
  )
}
