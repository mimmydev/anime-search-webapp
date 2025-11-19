// Jikan API v4 Types

export type AnimeImage = {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export type AnimeImages = {
  jpg: AnimeImage
  webp: AnimeImage
}

export type AnimeGenre = {
  mal_id: number
  name: string
}

export type AnimeAired = {
  from?: string
  to?: string
  string: string
}

export type Anime = {
  mal_id: number
  title: string
  title_english?: string
  title_japanese: string
  images: AnimeImages
  synopsis: string
  type: string
  episodes?: number
  status: string
  score?: number
  scored_by?: number
  rank?: number
  popularity: number
  members: number
  favorites: number
  genres: AnimeGenre[]
  aired: AnimeAired
}

export type AnimeTrailer = {
  youtube_id: string
  url: string
  embed_url: string
}

export type AnimeBroadcast = {
  day: string
  time: string
  timezone: string
  string: string
}

export type AnimeRelated = Record<string, {
  mal_id: number
  type: string
  name: string
  url: string
}[]>

export type AnimeDetail = Anime & {
  url: string
  background?: string
  premiered?: string
  broadcast?: AnimeBroadcast
  related: AnimeRelated
  trailer?: AnimeTrailer
}

export type Pagination = {
  last_visible_page: number
  has_next_page: boolean
  current_page: number
  items: {
    count: number
    total: number
    per_page: number
  }
}

export type SearchResponse = {
  pagination: Pagination
  data: Anime[]
}

export type SearchParams = {
  q: string
  page?: number
  limit?: number
}

export type DetailResponse = {
  data: AnimeDetail
}
