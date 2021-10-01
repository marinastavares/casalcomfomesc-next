import { RestaurantProps } from './restaurant'

export interface ThumbnailProps {
  url: string
}

export interface PostProps {
  id: string
  data: string
  url: string
  thumbnail: ThumbnailProps
  restaurant: RestaurantProps
  notaVinicius: number
  notaMarina: number
  tags: string[]
}

export type Post = PostProps
