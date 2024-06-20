export interface IMovie {
  name: string;
  imageUrl: string;
  loadVideo: () => Promise<typeof import("*.mp4") | string>;
  seasons?: number;
  releaseDate: string;
  rating: string;
  genre: string;
  duration: string;
  type: string;
  featured: boolean;
}
export interface IMovieState {
  movies: IMovie[];
}
