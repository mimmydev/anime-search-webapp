import { useAppSelector } from '@/app/hooks'
import { useSearchAnimeQuery } from '../animeApi'
import { selectSearchParams, selectHasSearched } from '../animeSlice'
import { AnimeCard } from './AnimeCard'
import { AnimeCardSkeleton } from './AnimeCardSkeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'

export const AnimeGrid = () => {
  const searchParams = useAppSelector(selectSearchParams)
  const hasSearched = useAppSelector(selectHasSearched)
  
  const {
    data: searchResponse,
    isLoading,
    isError,
  } = useSearchAnimeQuery(searchParams, {
    skip: !searchParams.q || !hasSearched,
  })

  // Don't show anything if no search has been performed
  if (!hasSearched) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          Enter a search term to find anime
        </p>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <AnimeCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  // Error state
  if (isError) {
    return (
      <Alert>
        <AlertDescription>
          Failed to load search results. Please try again.
        </AlertDescription>
      </Alert>
    )
  }

  // No results
  if (!searchResponse?.data.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No anime found for "{searchParams.q}"
        </p>
        <p className="text-muted-foreground text-sm mt-2">
          Try adjusting your search terms or browse different categories
        </p>
      </div>
    )
  }

  // Results found
  const animeList = searchResponse.data

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Search Results for "{searchParams.q}"
        </h2>
        <p className="text-muted-foreground text-sm">
          {searchResponse.pagination.items.count} results found
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </div>
  )
}
