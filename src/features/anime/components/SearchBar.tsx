import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setQuery, setHasSearched, selectQuery } from '../animeSlice'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export const SearchBar = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectQuery)
  const [localQuery, setLocalQuery] = useState(query)
  const [isSearching, setIsSearching] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

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
          setIsSearching(true)
          // Reset searching state after a short delay for visual feedback
          setTimeout(() => { setIsSearching(false); }, 500)
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
      setIsSearching(true)
      setTimeout(() => { setIsSearching(false); }, 500)
    }
  }

  const handleClear = () => {
    setLocalQuery('')
    dispatch(setQuery(''))
    dispatch(setHasSearched(false))
  }

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
            disabled={isSearching || !localQuery.trim()}
            className="h-6 w-6 p-0"
            aria-label="Submit search"
          >
            <Search className="h-3 w-3" />
          </Button>
        </div>
      </div>
      {isSearching && (
        <div className="absolute top-full mt-1 left-0 right-0 text-sm text-muted-foreground">
          Searching...
        </div>
      )}
    </form>
  )
}
