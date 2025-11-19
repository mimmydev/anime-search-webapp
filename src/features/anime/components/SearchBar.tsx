import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setQuery, setHasSearched, selectQuery, selectHasSearched } from '../animeSlice'
import { useSearchAnimeQuery } from '../animeApi'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Loader2 } from 'lucide-react'

export const SearchBar = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectQuery)
  const hasSearched = useAppSelector(selectHasSearched)
  const [localQuery, setLocalQuery] = useState(query)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Get actual API loading state
  const { isLoading: isApiLoading } = useSearchAnimeQuery(
    { q: query, page: 1 },
    { skip: !query || !hasSearched }
  )

  // Update local query when Redux query changes (e.g., from navigation)
  useEffect(() => {
    setLocalQuery(query)
  }, [query])

  // Debounced search effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (localQuery.trim() !== query.trim()) {
        dispatch(setQuery(localQuery.trim()))
        if (localQuery.trim()) {
          dispatch(setHasSearched(true))
        }
      }
    }, 300) // 300ms debounce delay

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [localQuery, query, dispatch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localQuery.trim()) {
      dispatch(setQuery(localQuery.trim()))
      dispatch(setHasSearched(true))
    }
  }

  const handleClear = () => {
    setLocalQuery('')
    dispatch(setQuery(''))
    dispatch(setHasSearched(false))
  }

  const isLoading = isApiLoading

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search for anime..."
          value={localQuery}
          onChange={(e) => { setLocalQuery(e.target.value); }}
          className="pl-10 pr-20"
          aria-label="Search anime"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {localQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0"
              aria-label="Clear search"
            >
              ×
            </Button>
          )}
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            disabled={isLoading || !localQuery.trim()}
            className="h-6 w-6 p-0"
            aria-label="Submit search"
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Search className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
      {isLoading && (
        <div className="absolute top-full mt-1 left-0 right-0 text-sm text-muted-foreground flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin" />
          Searching...
        </div>
      )}
    </form>
  )
}
