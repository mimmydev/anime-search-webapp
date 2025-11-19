import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const AnimeCardSkeleton = () => {
  return (
    <Card className="h-full">
      <CardContent className="p-0">
        <div className="relative">
          <Skeleton className="w-full h-64 rounded-t-lg" />
          <div className="absolute top-2 right-2">
            <Skeleton className="h-6 w-12 rounded" />
          </div>
          <div className="absolute top-2 left-2">
            <Skeleton className="h-6 w-16 rounded" />
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          
          <Skeleton className="h-4 w-full" />
          
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-5 w-16 rounded" />
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-5 w-14 rounded" />
          </div>
          
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
