import { useParams } from 'react-router-dom'
import { useGetAnimeByIdQuery } from '../animeApi'
import { DetailPageSkeleton } from '../components/DetailPageSkeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'

export const DetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const animeId = id ? Number(id) : null
  
  const {
    data: animeDetail,
    isLoading,
    isError,
    error,
  } = useGetAnimeByIdQuery(animeId ?? 0, {
    skip: !animeId,
  })

  if (!animeId) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              Invalid anime ID provided
            </AlertDescription>
          </Alert>
        </main>
      </div>
    )
  }

  if (isLoading) {
    return <DetailPageSkeleton />
  }

  if (isError || !animeDetail) {
    return (
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-8">
          <Alert>
            <AlertDescription>
              {error ? 'Error loading anime details' : 'Anime not found'}
            </AlertDescription>
          </Alert>
        </main>
      </div>
    )
  }

  const anime = animeDetail.data

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
            {anime.title_english && (
              <p className="text-xl text-muted-foreground mb-4">
                {anime.title_english}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mb-4">
              {anime.genres.map(genre => (
                <span
                  key={genre.mal_id}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Image */}
            <div className="md:col-span-1">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">Type:</span> {anime.type}
                </div>
                <div>
                  <span className="font-semibold">Episodes:</span>{' '}
                  {anime.episodes ?? 'Unknown'}
                </div>
                <div>
                  <span className="font-semibold">Status:</span> {anime.status}
                </div>
                <div>
                  <span className="font-semibold">Score:</span>{' '}
                  {anime.score ? `${anime.score.toString()}/10` : 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Rank:</span> #{anime.rank ?? 'N/A'}
                </div>
                <div>
                  <span className="font-semibold">Popularity:</span> #{anime.popularity}
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {anime.synopsis || 'No synopsis available.'}
                </p>
              </div>

              {/* Aired Dates */}
              {anime.aired.string && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Aired</h2>
                  <p className="text-muted-foreground">{anime.aired.string}</p>
                </div>
              )}

              {/* Background */}
              {anime.background && (
                <div>
                  <h2 className="text-xl font-semibold mb-3">Background</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {anime.background}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
