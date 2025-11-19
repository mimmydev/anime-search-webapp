import { Link } from 'react-router-dom'
import type { Anime } from '../types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type AnimeCardProps = {
  anime: Anime
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Link to={`/anime/${anime.mal_id.toString()}`}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
        <CardContent className="p-0">
          <div className="relative">
            <img
              src={anime.images.jpg.image_url}
              alt={anime.title}
              className="w-full h-64 object-cover rounded-t-lg"
              loading="lazy"
            />
            {anime.score && (
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 bg-black/70 text-white"
              >
                ⭐ {anime.score}
              </Badge>
            )}
            {anime.type && (
              <Badge
                variant="outline"
                className="absolute top-2 left-2 bg-black/70 text-white border-white/20"
              >
                {anime.type}
              </Badge>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {anime.title}
            </h3>
            
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                {anime.title_english}
              </p>
            )}
            
            <div className="flex flex-wrap gap-1 mb-2">
              {anime.genres.slice(0, 3).map(genre => (
                <Badge
                  key={genre.mal_id.toString()}
                  variant="outline"
                  className="text-xs"
                >
                  {genre.name}
                </Badge>
              ))}
              {anime.genres.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{(anime.genres.length - 3).toString()}
                </Badge>
              )}
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{anime.episodes ? `${anime.episodes.toString()} eps` : 'Unknown eps'}</span>
              <span>{anime.aired.from ? new Date(anime.aired.from).getFullYear() : 'Unknown year'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
