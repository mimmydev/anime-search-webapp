import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useSearchAnimeQuery } from '../animeApi'
import { selectSearchParams, setPage, selectHasSearched } from '../animeSlice'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Pagination = () => {
  const dispatch = useAppDispatch()
  const searchParams = useAppSelector(selectSearchParams)
  const hasSearched = useAppSelector(selectHasSearched)
  
  const { data: searchResponse } = useSearchAnimeQuery(searchParams, {
    skip: !searchParams.q || !hasSearched,
  })

  // Don't show pagination if no search has been performed or no results
  if (!hasSearched || !searchResponse?.data.length) {
    return null
  }

  const { pagination } = searchResponse
  const { current_page, last_visible_page, has_next_page } = pagination

  const handlePageChange = (page: number) => {
    dispatch(setPage(page))
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrevious = () => {
    if (current_page > 1) {
      handlePageChange(current_page - 1)
    }
  }

  const handleNext = () => {
    if (has_next_page) {
      handlePageChange(current_page + 1)
    }
  }

  // Generate page numbers to show
  const getVisiblePages = () => {
    const pages: number[] = []
    const maxVisible = 5
    
    if (last_visible_page <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= last_visible_page; i++) {
        pages.push(i)
      }
    } else {
      // Show current page and surrounding pages
      const start = Math.max(1, current_page - 2)
      const end = Math.min(last_visible_page, current_page + 2)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Add ellipsis and first/last page if needed
      if (start > 1) {
        if (start > 2) {
          pages.unshift(-1) // Ellipsis indicator
        }
        pages.unshift(1)
      }
      
      if (end < last_visible_page) {
        if (end < last_visible_page - 1) {
          pages.push(-1) // Ellipsis indicator
        }
        pages.push(last_visible_page)
      }
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()

  return (
      <div className="flex flex-col items-center space-y-4">
        <div className="text-sm text-muted-foreground">
          Page {String(current_page)} of {String(last_visible_page)} ({String(pagination.items.total)} total results)
        </div>
      
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={current_page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => (
            page === -1 ? (
              <span key={`ellipsis-${String(index)}`} className="px-2">
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={page === current_page ? "default" : "outline"}
                size="sm"
                onClick={() => { handlePageChange(page); }}
                className="min-w-10"
                aria-label={"Go to page " + String(page)}
                aria-current={page === current_page ? "page" : undefined}
              >
                {page}
              </Button>
            )
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={!has_next_page}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
